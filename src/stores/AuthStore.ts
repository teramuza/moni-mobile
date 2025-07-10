import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthUser} from '@models/AuthUser';

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
            setPartialUser: data => set({user: data}),
            setAuth: (token, user) => set({token, user}),
            clearAuth: () => set({token: null, user: null}),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
