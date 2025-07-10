import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Session} from '@models/Session';
import {getActiveSessions} from "@networks/apis/sessions.ts";

interface SessionState {
    session: Session | null;
    setSession: (session: Session | null) => void;
    fetchActiveSession: () => Promise<void>;
    clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            session: null,

            setSession: session => set({session}),

            clearSession: () => set({session: null}),

            fetchActiveSession: async () => {
                try {
                    const sessions = await getActiveSessions(); // assumed to return array
                    const firstSession = sessions?.[0] ?? null;
                    if (firstSession && !firstSession.return_time) {
                        set({session: firstSession});
                    } else {
                        set({session: null});
                    }
                } catch (e) {
                    console.warn('Failed to fetch session', e);
                    set({session: null});
                }
            },
        }),
        {
            name: 'session-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
