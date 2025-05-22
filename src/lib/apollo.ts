import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
  ApolloLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, Observable } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { onError } from '@apollo/client/link/error';
import { getAccessToken, refreshAuth } from './auth';

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED')) {
      return new Observable((observer) => {
        refreshAuth()
          .then((success) => {
            if (success) {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${getAccessToken()}`,
                },
              });
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            } else {
              observer.error(new Error('Authentication failed'));
            }
          })
          .catch((error) => observer.error(error));
      });
    }

    if (networkError) console.error('Network error:', networkError);
  },
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
    },
  }));
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: 'http://10.161.173.234:4000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://10.161.173.234:4000/graphql',
    connectionParams: () => ({
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
      // credentials: 'include',
    }),
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink]),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
