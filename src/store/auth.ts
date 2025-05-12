import { create } from 'zustand';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface UserInfo {
  id: number;
  email: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  role: string;
}

interface AuthState {
  token: string;
  user: UserInfo | null;
  setToken: (token: string) => void;
  setUser: (user: UserInfo) => void;
  clearToken: () => void;
  clearUser: () => void;
}

const getInitialToken = () => localStorage.getItem(TOKEN_KEY) || '';
const getInitialUser = (): UserInfo | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: '' });
  },
  clearUser: () => {
    localStorage.removeItem(USER_KEY);
    set({ user: null });
  },
}));
