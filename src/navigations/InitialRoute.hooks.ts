import { useEffect, useState } from 'react';
import { useAuthStore } from '@stores/AuthStore';

type InitialRoute =
  | 'Dashboard'
  | 'Loading'
  | 'Login';

export function useInitialRoute() {
  const { user } = useAuthStore();
  const [route, setRoute] = useState<InitialRoute>('Loading');

  useEffect(() => {
    if (!user?.id || user?.status !== 1) {
      setRoute('Login');
      return;
    }

    setRoute('Dashboard');
    return;
  }, [user?.id]);

  return route;
}
