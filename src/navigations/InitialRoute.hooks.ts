import { useCallback, useState } from 'react';
import { useAuthStore } from '@stores/AuthStore';
import { useFocusEffect } from '@react-navigation/native';
import LoggingUtils from "@utils/logging.utils.ts";

type InitialRoute = 'Dashboard' | 'Loading' | 'Login';

export function useInitialRoute() {
  const { user } = useAuthStore();
  const [route, setRoute] = useState<InitialRoute>('Loading');

  useFocusEffect(
    useCallback(() => {
      if (!user?.id || user?.status !== 1) {
        setRoute('Login');
        return;
      }

      setRoute('Dashboard');
      return;
    }, [user?.id]),
  );

  return route;
}
