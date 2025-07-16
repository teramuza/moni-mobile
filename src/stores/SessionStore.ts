import { create } from 'zustand';
import { Session, TSessionStatusCode } from '@models/Session';
import { getActiveSessions } from '@networks/request/sessions.ts';

interface SessionState {
    session: Session | null;
    setSession: (session: Session | null) => void;
    updateStatus: (status: TSessionStatusCode) => void;
    fetchActiveSession: () => Promise<void>;
    clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(set => ({
    session: null,
    setSession: session => set({ session }),
    updateStatus: (status: TSessionStatusCode) =>
        set(state => {
            if (!state.session) return {};

            return {
                session: {
                    ...state.session,
                    status,
                },
            };
        }),
    clearSession: () => set({ session: null }),
    fetchActiveSession: async () => {
        try {
            const sessions = await getActiveSessions(); // assumed to return array
            const firstSession = sessions ?? null;
            if (firstSession && !firstSession.return_time) {
                set({ session: firstSession });
            } else {
                set({ session: null });
            }
        } catch (e) {
            console.warn('Failed to fetch session', e);
            set({ session: null });
        }
    },
}));
