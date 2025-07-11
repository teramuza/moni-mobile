import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from '@models/AuthUser';

interface AuthState {
  token: string | null;
  user: Omit<AuthUser, 'access'> | null;
  setPartialUser: (data: Omit<AuthUser, 'access'> | null) => void;
  setAuth: (token: string, user: Omit<AuthUser, 'access'>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      setPartialUser: (data: AuthState['user']) => set({ user: data }),
      setAuth: (token: string, user: AuthState['user']) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      partialize: ({ actions, ...rest }: any) => rest,
    },
  ),
);
