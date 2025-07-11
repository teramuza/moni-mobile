import { useInitialRoute } from '@navigations/InitialRoute.hooks.ts';
import { useEffect } from 'react';
import { navigate } from '@navigations/Navigation.service.ts';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';
import {useProfileStore} from "@stores/ProfileStore.ts";
import {getProfile} from "@networks/apis/profile.ts";
import {useAuthStore} from "@stores/AuthStore.ts";
import {getActiveSessions} from "@networks/apis/sessions.ts";
import {useSessionStore} from "@stores/SessionStore.ts";

const useLoadingApp = () => {
  const route = useInitialRoute();
  const {profile, setProfile} = useProfileStore();
  const {setSession} = useSessionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    let _navigate = () => {};
    if (route !== 'Loading') {
      if (route === 'Login') {
        _navigate = () => navigate(LoginScene.name);
      } else if (route === 'Dashboard') {
        const profileId = user!.profile_id;
        getProfile(profileId).then(data => {
          setProfile(data);
        })
      }
    }
    let navigationTimer = setTimeout(_navigate, 3 * 1000);
    return () => {
      clearTimeout(navigationTimer);
    };
  }, [route]);

  useEffect(() => {
    let _navigate = () => {};
    let navigationTimer: number;
    if (profile?.id) {
      _navigate = () => navigate(DashboardNavigator.name);
      getActiveSessions().then(data => {
        if (data && data.length > 0) {
          setSession(data[0]);
        }
      }).finally(() => {
        navigationTimer = setTimeout(_navigate, 3 * 1000);
      });
    }
    return () => {
      clearTimeout(navigationTimer);
    };
  }, [profile]);
};

export default useLoadingApp;
