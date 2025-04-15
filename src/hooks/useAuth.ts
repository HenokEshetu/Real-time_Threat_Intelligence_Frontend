// src/hooks/useAuth.ts

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  login: (email: string, password: string, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  token: localStorage.getItem('token'),
  login: (email, password, token) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, user: { email }, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null, token: null });
  },
}));
