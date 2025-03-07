import create from 'zustand';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $password, password: $password }) {
      access_token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  token: localStorage.getItem('token'),
  login: async (email, password) => {
    try {
      const [loginMutation] = useMutation(LOGIN_MUTATION);
      const { data } = await loginMutation({ variables: { email, password } });
      
      localStorage.setItem('token', data.login.access_token);
      set({ 
        isAuthenticated: true, 
        user: data.login.user,
        token: data.login.access_token 
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null, token: null });
  },
}));