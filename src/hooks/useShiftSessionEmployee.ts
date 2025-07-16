import { useSessionStore } from '@stores/SessionStore.ts';
import { useEffect } from 'react';
import {
    checkInSession,
    getActiveSessions,
} from '@networks/request/sessions.ts';
import {
    getCurrentRoute,
    navigate,
    reInitScreenApp,
} from '@navigations/Navigation.service.ts';
import routeName from '@navigations/routeName.ts';
import { SessionStatus } from '@models/Session.ts';
import { useAuthStore } from '@stores/AuthStore.ts';
import { UserRole } from '@constants/User.ts';

const useShiftSessionEmployee = () => {
    const session = useSessionStore(state => state.session);
    const setSession = useSessionStore(state => state.setSession);
    const clearSession = useSessionStore(state => state.clearSession);

    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.role === UserRole.EMPLOYEE) {
            if (!session) {
                getActiveSession();
            } else {
                checkActiveSession();
            }
        }
    }, [session, user]);

    const getActiveSession = () => {
        getActiveSessions().then(sessions => {
            if (sessions) {
                setSession(sessions);
            }
        });
    };

    const checkActiveSession = () => {
        if (session) {
            const currentRoute = getCurrentRoute();
            if (
                session.status > SessionStatus.VERIFY_IN &&
                session.status < SessionStatus.VERIFY_OUT
            ) {
                if (
                    currentRoute?.name !== routeName.Dashboard &&
                    currentRoute?.name !== routeName.CheckPointForm &&
                    currentRoute?.name !== routeName.CheckOutForm
                ) {
                    navigate(routeName.DashboardWrapper);
                }
            } else if (session.status === SessionStatus.FINISH) {
                clearSession();
                reInitScreenApp();
            } else if (
                session.status <= SessionStatus.VERIFY_IN &&
                session.status >= SessionStatus.PENDING
            ) {
                if (currentRoute?.name !== routeName.CheckInForm) {
                    navigate(routeName.CheckInForm);
                }
            } else if (session.status === SessionStatus.VERIFY_OUT) {
                if (currentRoute?.name !== routeName.CheckOutForm) {
                    navigate(routeName.CheckOutForm);
                }
            }
        }
    };

    const prepareCheckInSession = () => {
        if (!session) {
            checkInSession().then(data => {
                if (data.status === SessionStatus.PENDING) {
                    checkActiveSession();
                }
            });
        }
    };

    const prepareCheckOutSession = () => {
        if (session) {
            navigate(routeName.CheckOutForm);
        }
    };

    return {
        prepareCheckInSession,
        prepareCheckOutSession,
        checkActiveSession,
        getActiveSession,
        session,
    };
};

export default useShiftSessionEmployee;
