import { useInitialRoute } from '@navigations/InitialRoute.hooks.ts';
import { useCallback } from 'react';
import { navigate } from '@navigations/Navigation.service.ts';
import { useProfileStore } from '@stores/ProfileStore.ts';
import { getProfile } from '@networks/request/profile.ts';
import { useAuthStore } from '@stores/AuthStore.ts';
import { getActiveSessions } from '@networks/request/sessions.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import { useFocusEffect } from '@react-navigation/native';
import routeName from '@navigations/routeName.ts';

const useLoadingApp = () => {
    const route = useInitialRoute();
    const { profile, setProfile } = useProfileStore();
    const { setSession } = useSessionStore();
    const { user } = useAuthStore();

    useFocusEffect(
        useCallback(() => {
            let _navigate = () => {};
            if (route !== 'Loading') {
                if (route === 'Login') {
                    _navigate = () => navigate(routeName.Login);
                } else if (route === 'Dashboard') {
                    const profileId = user!.profile_id;
                    getProfile(profileId).then(data => {
                        setProfile(data);
                    });
                }
            }
            let navigationTimer = setTimeout(_navigate, 3 * 1000);
            return () => {
                clearTimeout(navigationTimer);
            };
        }, [route]),
    );

    useFocusEffect(
        useCallback(() => {
            let _navigate = () => {};
            let navigationTimer: any;
            if (profile?.id) {
                _navigate = () => navigate(routeName.DashboardWrapper);
                getActiveSessions()
                    .then(data => {
                        if (data) {
                            setSession(data);
                        }
                    })
                    .finally(() => {
                        navigationTimer = setTimeout(_navigate, 3 * 1000);
                    });
            }
            return () => {
                clearTimeout(navigationTimer);
            };
        }, [profile]),
    );
};

export default useLoadingApp;
