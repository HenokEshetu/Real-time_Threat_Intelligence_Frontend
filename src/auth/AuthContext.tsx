// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import {
  setAccessToken,
  registerRefreshAuth,
  getAccessToken,
} from '../lib/auth';
import { LoginResponse, User } from './auth.type';
import {
  useLoginMutation,
  useRefreshTokenMutation,
  useSignOutMutation,
} from './AuthHook';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useLoginMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [signOutMutation] = useSignOutMutation();

  const updateAuthState = useCallback((response?: LoginResponse) => {
    if (response) {
      setAccessToken(response.access_token);
      setUser({
        userId: response.user.userId,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role,
      } as User);
    } else {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginMutation({
          variables: { input: { email, password } },
        });

        if (data?.login) {
          updateAuthState(data.login);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error(
          'Authentication failed. Please check your credentials.',
        );
      }
    },
    [loginMutation, navigate, updateAuthState],
  );

  const logout = useCallback(async () => {
    try {
      setAccessToken(null);
      setUser(null);
      await apolloClient.clearStore();

      try {
        await signOutMutation();
      } catch (error) {
        console.warn('Server-side logout failed:', error);
      }

      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.href = '/auth';
    }
  }, [apolloClient, navigate, signOutMutation]);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    try {
      const { data } = await refreshTokenMutation();

      if (!data?.refreshToken) {
        throw new Error('Invalid refresh response');
      }

      // Clear existing tokens before setting new ones
      setAccessToken(null);
      await apolloClient.clearStore();

      // Update auth state with new tokens
      setAccessToken(data.refreshToken.access_token);
      setUser(data.refreshToken.user);

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);

      // Force full cleanup
      setAccessToken(null);
      setUser(null);
      await apolloClient.clearStore();
      localStorage.clear();
      sessionStorage.clear();

      // Redirect without React Router state
      window.location.href = '/login';
      return false;
    }
  }, [apolloClient, refreshTokenMutation]);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for cookies
      try {
        if (document.cookie.includes('refresh_token')) {
          await refreshAuth();
        }
      } catch (error) {
        await logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout, refreshAuth]);

  // useEffect(() => {
  //   registerRefreshAuth(refreshAuth);
  // }, [refreshAuth]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (getAccessToken()) {
          if (document.cookie.includes('refresh_token')) {
            await refreshAuth();
          }
        }
      } catch (error) {
        await logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [logout, refreshAuth]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
