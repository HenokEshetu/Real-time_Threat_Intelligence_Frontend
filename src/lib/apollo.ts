import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

let accessToken: string | null = null;
export const setApolloAccessToken = (token: string | null) => {
  accessToken = token;
};

const authLink = setContext((operation: any, prevContext: any) => {
  const isCurrentTokenQuery =
    operation.operationName === 'currentToken' ||
    (operation.query &&
      operation.query.definitions.some(
        (def: any) =>
          def.kind === 'OperationDefinition' &&
          def.selectionSet.selections.some(
            (sel: any) => sel.name && sel.name.value === 'currentToken',
          ),
      ));
  if (isCurrentTokenQuery) {
    return { headers: { ...prevContext.headers } };
  }
  return {
    headers: {
      ...prevContext.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Unauthorized') {
        window.location.href = '/auth';
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      window.location.href = '/auth';
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: () => ({
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }),
  }),
);

const splitLink = split(
  ({ query }: { query: any }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink]),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
});
