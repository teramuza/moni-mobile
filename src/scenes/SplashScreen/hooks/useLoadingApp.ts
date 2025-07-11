import { useInitialRoute } from '@navigations/InitialRoute.hooks.ts';
import { useEffect } from 'react';
import { navigate } from '@navigations/Navigation.service.ts';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';
import {useProfileStore} from "@stores/ProfileStore.ts";
import {getProfile} from "@networks/apis/profile.ts";
import {useAuthStore} from "@stores/AuthStore.ts";

const useLoadingApp = () => {
  const route = useInitialRoute();
  const {profile, setProfile} = useProfileStore();
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
    if (profile?.id) {
      _navigate = () => navigate(DashboardNavigator.name);
    }
    let navigationTimer = setTimeout(_navigate, 3 * 1000);
    return () => {
      clearTimeout(navigationTimer);
    };
  }, [profile]);
};

export default useLoadingApp;
