import { create } from 'zustand';

const TOKEN_KEY = 'token';

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  // 可扩展更多认证相关状态，如 userInfo
}

const getInitialToken = () => localStorage.getItem(TOKEN_KEY) || '';

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: '' });
  },
}));
