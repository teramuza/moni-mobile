import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '@models/Profile';
import { getProfile } from '@networks/apis/profile';
import {useAuthStore} from "@stores/AuthStore.ts";
import LoggingUtils from "@utils/logging.utils.ts";

interface ProfileState {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
    fetchProfile: () => Promise<void>;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
            fetchProfile: async () => {
                const profileId = useAuthStore.getState().user?.profile_id;
                if (!profileId) return;
                try {
                    const data = await getProfile(profileId);
                    set({ profile: data });
                } catch (error) {
                    LoggingUtils.warn('Failed to fetch profile:', error);
                    set({ profile: null });
                }
            },
        }),
        {
            name: 'profile-storage',
        },
    ),
);
