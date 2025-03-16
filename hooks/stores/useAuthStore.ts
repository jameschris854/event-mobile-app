import { AuthTokenResponsePassword, Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  user: Session | null;
  isAuthenticated: boolean;
  login: (user: Session) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;