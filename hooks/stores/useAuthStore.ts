import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokenResponsePassword, Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  user: Session | null;
  isAuthenticated: boolean;
  login: (user: Session) => void;
  logout: () => void;
  init:() => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) =>{ 
    AsyncStorage.setItem('user', JSON.stringify(user));
    set({
      user,
      isAuthenticated: true,
    })
  },
  logout: () =>{
    AsyncStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
    })
  },
  init: async () => {
    const user = await  AsyncStorage.getItem('user')
    if (user) {
      set({ user: JSON.parse(user), isAuthenticated: true });
    } 
  }
}));

export default useAuthStore;