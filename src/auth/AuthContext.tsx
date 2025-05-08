import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean; // ← new
  login: (token: string) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

interface User {
  userId: string;
  email: string;
  roles: string[];
  avatarUrl: string;
  // Add other user properties as needed
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ← new
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const validateToken = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('auth_token');
    if (stored && validateToken(stored)) {
      const decoded = jwtDecode<{
        sub: string;
        email: string;
        roles: string[];
      }>(stored);
      setToken(stored);
      setUser({
        userId: decoded.sub,
        email: decoded.email,
        roles: decoded.roles || [],
        avatarUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s',
      });
    } else {
      localStorage.removeItem('auth_token');
    }
    setLoading(false); // ← we now know auth state
  }, [validateToken]);

  const login = (newToken: string) => {
    if (!validateToken(newToken)) {
      throw new Error('Invalid token');
    }

    localStorage.setItem('auth_token', newToken);
    const decoded = jwtDecode<{ sub: string; email: string; roles: string[] }>(
      newToken,
    );

    setToken(newToken);
    setUser({
      userId: decoded.sub,
      email: decoded.email,
      roles: decoded.roles || [],
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s',
    });
    navigate('/', { replace: true });
  };

  const logout = () => {
    console.log('🛑 logout() called');
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    console.log('   token after logout:', token);
    navigate('/auth', { replace: true });
  };

  const refreshAuth = async () => {
    // Implement token refresh logic here
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        loading,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
