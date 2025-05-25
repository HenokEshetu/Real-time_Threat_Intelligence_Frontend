import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient, gql, useLazyQuery } from '@apollo/client';
import { useLoginMutation, useSignOutMutation } from '@/lib/auth';
import { setApolloAccessToken } from '@/lib/apollo';
import { LoginResponse, User } from './auth.type';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const [loginMutation] = useLoginMutation();
  const [signOutMutation] = useSignOutMutation();
  const [fetchCurrentToken] = useLazyQuery(CURRENT_TOKEN_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log('currentToken response:', data);
      if (data?.currentToken?.user) {
        setUser(data.currentToken.user);
        setAccessToken(data.currentToken.access_token || null);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    },
    onError: () => {
      setUser(null);
      setAccessToken(null);
    },
  });

  // Keep Apollo's singleton in sync
  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    setApolloAccessToken(token);
  };

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginMutation({
          variables: { input: { email, password } },
        });

        if (data?.login) {
          // After login, fetch current token to get user info
          await fetchCurrentToken();
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error(
          'Authentication failed. Please check your credentials.',
        );
      }
    },
    [loginMutation, navigate, fetchCurrentToken],
  );

  const logout = useCallback(async () => {
    try {
      setUser(null);
      setAccessToken(null);
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

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        await fetchCurrentToken();
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      accessToken,
      setAccessToken,
    }),
    [user, loading, login, logout, accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};