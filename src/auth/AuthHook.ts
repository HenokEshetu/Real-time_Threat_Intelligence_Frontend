import { gql, useMutation } from '@apollo/client';
import { AuthResponse, LoginDto, LoginResponse } from './auth.type';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        userId
        email
        firstName
        lastName
        role {
          name
          permissions {
            name
          }
        }
      }
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
      refresh_token
      user {
        userId
        email
        firstName
        lastName
      }
    }
  }
`;

const SIGNOUT_MUTATION = gql`
  mutation SignOut {
    signOut {
      success
      message
    }
  }
`;

// Then create your custom hooks
export function useLoginMutation() {
  return useMutation<{ login: LoginResponse }, { input: LoginDto }>(
    LOGIN_MUTATION,
  );
}

export function useRefreshTokenMutation() {
  return useMutation<{ refreshToken: LoginResponse }>(REFRESH_TOKEN_MUTATION);
}

export function useSignOutMutation() {
  return useMutation<{ signOut: AuthResponse }>(SIGNOUT_MUTATION);
}
