// src/hooks/useAuth.ts

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => void;  // No async/side effects here
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  token: localStorage.getItem('token'),
  login: (email, password) => {
    set({
      isAuthenticated: true, 
      user: { email }, 
      token: 'mockToken' // Mock token for testing purposes
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null, token: null });
  },
}));
