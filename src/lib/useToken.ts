import { gql, useQuery } from '@apollo/client';

const CURRENT_TOKEN_QUERY = gql`
  query {
    currentToken {
      access_token
      user {
        userId
        email
        firstName
        lastName
        role {
          id
          name
          description
          permissions {
            id
            name
            description
          }
        }
        isEmailVerified
        deletionRequested
        createdAt
        updatedAt
      }
    }
  }
`;

export function useCurrentToken() {
  const { data, loading, error } = useQuery(CURRENT_TOKEN_QUERY, {
    fetchPolicy: 'no-cache',
  });

  return { data, loading, error };
}