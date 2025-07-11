import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import { Profile } from '@models/Profile';
import { getProfile } from '@networks/apis/profile';
import {useAuthStore} from "@stores/AuthStore.ts";
import LoggingUtils from "@utils/logging.utils.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            setProfile: (profile: Profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
            fetchProfile: async () => {
                const profileId = useAuthStore.getState().user?.profile_id;
                if (!profileId) return;
                try {
                    getProfile(profileId).then((data) => {
                        set({ profile: data });
                    }).catch(LoggingUtils.error);
                } catch (error) {
                    set({ profile: null });
                }
            },
        }),
        {
            name: 'profile-storage',
            storage: createJSONStorage(() => AsyncStorage),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            partialize: ({ actions, ...rest }: any) => rest,
        },
    ),
);
