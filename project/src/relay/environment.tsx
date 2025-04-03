import { Environment, Observable, RecordSource, Store, SubscribeFunction, RequestParameters, GraphQLResponse } from 'relay-runtime';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import React, { Component, ReactNode } from 'react';
import { 
  commitLocalUpdate as CLU, 
  commitMutation as CM, 
  fetchQuery as FQ, 
  QueryRenderer as QR, 
  requestSubscription as RS,
  GraphQLTaggedNode,
  Disposable,
  UseMutationConfig
} from 'react-relay';
import * as PropTypes from 'prop-types';
import { urlMiddleware, RelayNetworkLayer } from 'react-relay-network-modern';
import * as R from 'ramda';
import { createClient, Client } from 'graphql-ws';

// Create a type declaration for the uploadMiddleware
declare module './uploadMiddleware' {
  import { Middleware } from 'react-relay-network-modern';
  const uploadMiddleware: () => Middleware;
  export default uploadMiddleware;
}

import uploadMiddleware from './uploadMiddleware';

declare global {
  interface Window {
    BASE_PATH?: string;
  }
}

interface ErrorMessage {
  type: 'error' | 'message';
  text: string;
}

interface RelayError {
  res: {
    errors?: Array<{
      message: string;
      data?: {
        type?: string;
        reason?: string;
        field?: string;
        message?: string;
      };
    }>;
  };
}

// Service bus
const MESSENGER$ = new Subject<ErrorMessage[]>();
export const MESSAGING$ = {
  messages: MESSENGER$.pipe(debounce(() => timer(500))),
  notifyError: (text: string) => MESSENGER$.next([{ type: 'error', text }]),
  notifyRelayError: (error: RelayError) => {
    const message = (error.res.errors ?? []).map((e) => e.message).join('\r\n');
    MESSENGER$.next([{ type: 'error', text: message }]);
  },
  notifySuccess: (text: string) => MESSENGER$.next([{ type: 'message', text }]),
  toggleNav: new Subject<void>(),
  redirect: new Subject<string>(),
};

// Default application exception.
export class ApplicationError extends Error {
  data: unknown;

  constructor(errors: unknown) {
    super();
    this.data = errors;
  }
}

// Network
const isEmptyPath = R.isNil(window.BASE_PATH) || R.isEmpty(window.BASE_PATH);
const contextPath = isEmptyPath || window.BASE_PATH === '/' ? '' : window.BASE_PATH;
export const APP_BASE_PATH = isEmptyPath || contextPath.startsWith('/') ? contextPath : `/${contextPath}`;

export const fileUri = (fileImport: string) => `${APP_BASE_PATH}${fileImport}`;

// Create Network
let subscriptionClient: Client;
const loc = window.location;
const isSecure = loc.protocol === 'https:' ? 's' : '';
const subscriptionUrl = `ws${isSecure}://${loc.host}${APP_BASE_PATH}/graphql`;

const subscribeFn: SubscribeFunction = (request: RequestParameters, variables: Record<string, unknown>) => {
  if (!subscriptionClient) {
    subscriptionClient = createClient({
      url: subscriptionUrl,
    });
  }
  
  return Observable.create<GraphQLResponse>((sink) => {
    if (!request.text) {
      sink.error(new Error('No query text provided'));
      return () => {};
    }

    const subscription = subscriptionClient.subscribe(
      {
        query: request.text,
        operationName: request.name,
        variables,
      },
      {
        next: (data: unknown) => sink.next(data as GraphQLResponse),
        error: (err: Error) => sink.error(err),
        complete: () => sink.complete(),
      }
    );

    return () => subscription.unsubscribe();
  });
};

const fetchMiddleware = urlMiddleware({
  url: `${APP_BASE_PATH}/graphql`,
  credentials: 'same-origin',
});

const network = new RelayNetworkLayer([fetchMiddleware, uploadMiddleware()], {
  subscribeFn,
});

const store = new Store(new RecordSource());
export const environment = new Environment({ network, store });

// Components
interface QueryRendererProps {
  variables?: Record<string, unknown>;
  query: GraphQLTaggedNode;
  render: (data: unknown) => ReactNode;
}

export class QueryRenderer extends Component<QueryRendererProps> {
  static propTypes = {
    variables: PropTypes.object,
    render: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
  };

  render() {
    const { variables, query, render } = this.props;
    return (
      <QR
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }: { error?: Error; props?: unknown }) => {
          if (error) {
            throw new ApplicationError(error);
          }
          return render(props);
        }}
      />
    );
  }
}

const buildErrorMessages = (error: RelayError): ErrorMessage[] => 
  (error.res.errors ?? []).map((e) => ({
    type: 'error',
    text: R.pathOr(e.message, ['data', 'reason'], e),
  }));

interface CommitMutationConfig<T extends { input?: unknown; response?: unknown }> {
  mutation: GraphQLTaggedNode;
  variables?: T['input'];
  updater?: (store: unknown) => void;
  optimisticUpdater?: (store: unknown) => void;
  optimisticResponse?: unknown;
  onCompleted?: (response: T['response']) => void;
  onError?: (error: Error) => void;
  setSubmitting?: (isSubmitting: boolean) => void;
}

export const defaultCommitMutation: CommitMutationConfig<{ input?: unknown; response?: unknown }> = {
  updater: undefined,
  optimisticUpdater: undefined,
  optimisticResponse: undefined,
  onCompleted: undefined,
  onError: undefined,
  setSubmitting: undefined,
};

export const relayErrorHandling = (
  error: RelayError, 
  setSubmitting?: (isSubmitting: boolean) => void,
  onError?: (error: RelayError, messages: ErrorMessage[]) => void
) => {
  if (setSubmitting) setSubmitting(false);
  if (error?.res?.errors) {
    const authRequired = R.filter(
      (e) => R.pathOr(e.message, ['data', 'type'], e) === 'authentication',
      error.res.errors,
    );
    if (!R.isEmpty(authRequired)) {
      MESSAGING$.notifyError('Unauthorized action, please refresh your browser');
    } else if (onError) {
      const messages = buildErrorMessages(error);
      MESSAGING$.messages.next(messages);
      onError(error, messages);
    } else {
      const messages = buildErrorMessages(error);
      MESSAGING$.messages.next(messages);
    }
  }
};

export const extractSimpleError = (error: RelayError): string => {
  if (error?.res?.errors) {
    const messages = buildErrorMessages(error);
    return messages[0]?.text || 'Unknown error';
  }
  return 'Unknown error';
};

// Relay functions
export const commitMutation = <T extends { input?: unknown; response?: unknown }>({
  mutation,
  variables,
  updater,
  optimisticUpdater,
  optimisticResponse,
  onCompleted,
  onError,
  setSubmitting,
}: CommitMutationConfig<T>): Disposable => {
  const config: MutationConfig<unknown> = {
    mutation,
    variables,
    onCompleted,
    onError: (error: Error) => {
      const relayError: RelayError = {
        res: {
          errors: [{
            message: error.message,
            data: {}
          }]
        }
      };
      relayErrorHandling(relayError, setSubmitting, onError);
    },
  };

  if (updater) config.updater = updater;
  if (optimisticUpdater) config.optimisticUpdater = optimisticUpdater;
  if (optimisticResponse) config.optimisticResponse = optimisticResponse;

  return CM(environment, config);
};

export const requestSubscription = (config: unknown): Disposable => {
  return RS(environment, config as any);
};

export const fetchQuery = (query: GraphQLTaggedNode, variables?: Record<string, unknown>): Promise<unknown> => {
  return FQ(environment, query, variables);
};

export const commitLocalUpdate = (updater: (store: unknown) => void): void => {
  CLU(environment, updater);
};

export const handleErrorInForm = (
  error: RelayError, 
  setErrors: (errors: Record<string, string>) => void
) => {
  const formattedError = R.head(error.res.errors ?? []);
  if (formattedError?.data?.field) {
    setErrors({
      [formattedError.data.field]:
      formattedError.data.message || formattedError.data.reason || 'Unknown error',
    });
  } else {
    const messages = buildErrorMessages(error);
    MESSAGING$.messages.next(messages);
  }
};

export const handleError = (error: RelayError) => {
  if (error?.res?.errors) {
    const messages = buildErrorMessages(error);
    MESSAGING$.messages.next(messages);
  }
};