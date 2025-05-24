import { gql, useMutation } from '@apollo/client';
import { AuthResponse, LoginDto, LoginResponse } from './auth.type';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        userId
        email
        firstName
        lastName
        isEmailVerified
        deletionRequested
        createdAt
        updatedAt
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
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
      refresh_token
      user {
        userId
        email
        firstName
        lastName
        isEmailVerified
        deletionRequested
        createdAt
        updatedAt
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
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      userId
      email
      firstName
      lastName
      isEmailVerified
      deletionRequested
      createdAt
      updatedAt
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

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordDto!) {
    changePassword(input: $input) {
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