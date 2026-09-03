import { create } from 'zustand';
import type { User , Session } from '../types/SessionTypes';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  logout: () => set({ user: null, session: null, isAuthenticated: false }),
})); 