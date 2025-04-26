import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// HTTP connection
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// WebSocket connection
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    retryAttempts: 3,
    shouldRetry: (errOrCloseEvent) => true,
    connectionParams: () => ({
      // Uncomment if you need authentication
      // headers: {
      //   authorization: localStorage.getItem('token') || '',
      // },
    }),
  }),
);

// Split links
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
