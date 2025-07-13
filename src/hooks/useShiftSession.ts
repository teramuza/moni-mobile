import { useSessionStore } from '@stores/SessionStore.ts';
import { useEffect } from 'react';
import { getActiveSessions } from '@networks/request/sessions.ts';
import { getCurrentRoute, navigate } from '@navigations/Navigation.service.ts';
import routeName from '@navigations/routeName.ts';
import {SessionStatus} from "@models/Session.ts";

const useShiftSession = () => {
    const { session, setSession, clearSession } = useSessionStore();

    useEffect(() => {
        if (!session) {
            getActiveSession();
        } else {
            checkActiveSession();
        }
    }, [session]);

    const getActiveSession = () => {
        getActiveSessions().then(sessions => {
            if (sessions && sessions.length > 0) {
                setSession(sessions[0]);
            }
        });
    };

    const checkActiveSession = () => {
        if (session) {
            const currentRoute = getCurrentRoute();
            if (session.status > SessionStatus.VERIFY_IN && session.status < SessionStatus.VERIFY_OUT) {
                if (currentRoute?.name !== routeName.Dashboard && currentRoute?.name !== routeName.CheckPointForm) {
                    navigate(routeName.Dashboard);
                }
            } else if (session.status === SessionStatus.FINISH) {
                clearSession();
                if (currentRoute?.name !== routeName.Dashboard) {
                    navigate(routeName.Dashboard);
                }
            } else if (session.pick_time === undefined) {
                if (currentRoute?.name === routeName.Dashboard) {
                    navigate(routeName.CheckInForm);
                }
            }
        }
    };

    const prepareCheckInSession = () => {

    }
};

export default useShiftSession;
