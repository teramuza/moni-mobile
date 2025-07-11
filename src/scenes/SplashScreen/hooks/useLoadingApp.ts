import { useInitialRoute } from '@navigations/InitialRoute.hooks.ts';
import { useEffect } from 'react';
import { navigate } from '@navigations/Navigation.service.ts';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';

const useLoadingApp = () => {
  const route = useInitialRoute();

  useEffect(() => {
    let _navigate = () => {};
    if (route !== 'Loading') {
      if (route === 'Login') {
        _navigate = () => navigate(LoginScene.name);
      } else if (route === 'Dashboard') {
        _navigate = () => navigate(DashboardNavigator.name);
      }
    }
    let navigationTimer = setTimeout(_navigate, 3 * 1000);
    return () => {
      clearTimeout(navigationTimer);
    };
  }, [route]);
};

export default useLoadingApp;
