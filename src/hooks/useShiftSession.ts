import {getActiveSessions} from "@networks/request/sessions.ts";
import {useSessionStore} from "@stores/SessionStore.ts";
import {useEffect, useState} from "react";
import {Session} from "@models/Session.ts";

const useShiftSession = () => {
    const [activeSession, setActiveSession] = useState<Session>();

    useEffect(() => {
        if (!activeSession) {
            getActiveSession();
        }
    }, [])

    const getActiveSession = () => {
        getActiveSessions().then((sessions) => {
            if (sessions && sessions.length > 0) {
                setActiveSession(sessions[0]);
            }
        });
    }
    return {
        activeSession,
        getActiveSession,
    }
}

export default useSessionStore;
