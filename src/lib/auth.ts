import { gql, useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { client } from './apollo';
import {
  AuthResponse,
  LoginDto,
  LoginResponse,
  RefreshResponse,
  User,
} from '@/auth/auth.type';
import { use } from 'react';

export interface JwtAccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const validateAccessToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtAccessTokenPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtAccessTokenPayload>(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null;
  }
};

export const useRefreshAuth = () => {
  const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken {
      refreshToken {
        access_token
        user {
          userId
          email
        }
      }
    }
  `;
  return useMutation(REFRESH_TOKEN_MUTATION);
};

export const useLoginMutation = () => {
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
  return useMutation<{ login: LoginResponse }, { input: LoginDto }>(
    LOGIN_MUTATION,
  );
};

export const useSignOutMutation = () => {
  const SIGNOUT_MUTATION = gql`
    mutation SignOut {
      signOut {
        success
        message
      }
    }
  `;
  return useMutation<{ signOut: AuthResponse }>(SIGNOUT_MUTATION);
};