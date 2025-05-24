

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
          .then((token) => {
            if (token) {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${token}`,
                },
              }));
              forward(operation).subscribe(observer);
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
  return new Observable((observer) => {
    getAccessToken()
      .then((token) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
          },
        }));
        forward(operation).subscribe(observer);
      })
      .catch((error) => observer.error(error));
  });
});

const httpLink = createHttpLink({
  uri: 'http://10.161.173.234/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://10.161.173.234/graphql',
    connectionParams: async () => ({
      Authorization: `Bearer ${await getAccessToken()}`,
    }),
    shouldRetry: () => true,
    retryAttempts: 3,
    connectionAckWaitTimeout: 10000,
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
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});