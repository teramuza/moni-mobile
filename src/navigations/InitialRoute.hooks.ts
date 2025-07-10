import {useEffect, useState} from 'react';
import {useAuthStore} from '@stores/AuthStore';
import {useSessionStore} from '@stores/SessionStore';
import {UserRole} from "@constants/User.ts";

type InitialRoute =
    | 'DashboardSupervisor'
    | 'DashboardSalesWithSession'
    | 'DashboardSalesWithoutSession'
    | 'Loading'
    | 'Login';

export function useInitialRoute(): {} {
    const { user } = useAuthStore();
    const { session, fetchActiveSession } = useSessionStore();
    const [route, setRoute] = useState<InitialRoute>('Loading');

    useEffect(() => {
        if (!user?.id) {
            setRoute('Login');
            return;
        }

        if (user?.status !== 1) {
            setRoute('Login');
            return;
        }

        if (user.role === UserRole.SUPERVISOR) {
            setRoute('DashboardSupervisor');
            return;
        }

        if (user.role === UserRole.EMPLOYEE) {
            fetchActiveSession().then(() => {
                if (session) {
                    setRoute('DashboardSalesWithSession');
                } else {
                    setRoute('DashboardSalesWithoutSession');
                }
            });
        }
    }, [user?.id]);

    return route;
}
