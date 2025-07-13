import { getActiveSessions } from '@networks/request/sessions.ts';
import { useEffect, useState } from 'react';
import { Session } from '@models/Session.ts';
import { getSAWScore } from '@networks/request/profile.ts';
import { useAuthStore } from '@stores/AuthStore.ts';
import { getSalesByEmployee } from '@networks/request/sales.ts';
import Colors from '@themes/colors.ts';
import { shortNumber } from '@utils/number.utils.ts';
import {useSessionStore} from "@stores/SessionStore.ts";

export interface IDashboardSummarySection {
    label: string;
    value: string;
    color: string;
}

const useDashboardSession = () => {
    const [activeSession, setActiveSession] = useState<Session>();
    const [SAWScore, setSAWScore] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalSalesItem, setTotalSalesItem] = useState(0);
    const { user } = useAuthStore();
    const {setSession} = useSessionStore();

    useEffect(() => {
        if (!activeSession && user!.role === 0) {
            getActiveSession();
        }
    }, []);

    const getActiveSession = () => {
        getActiveSessions().then(sessions => {
            if (sessions && sessions.length > 0) {
                setActiveSession(sessions[0]);
                setSession(sessions[0]);
            } else {
                getSummaryDashboard();
            }
        });
    };

    const getSAWScoreEmployee = () => {
        getSAWScore(user!.profile_id).then(sawScore => {
            setSAWScore(sawScore?.average_skor_saw ?? 0);
            setTotalSessions(sawScore?.total_sessions ?? 0);
        });
    };

    const getTotalSaleItem = () => {
        getSalesByEmployee(user!.profile_id).then(sales => {
            setTotalSalesItem(sales?.totalQty ?? 0);
        });
    };

    const getSummaryDashboard = () => {
        getSAWScoreEmployee();
        getTotalSaleItem();
    };

    const generateDashboardSummary = () => {
        let summary: Array<IDashboardSummarySection> = [];
        if (!activeSession) {
            summary = [
                {
                    label: 'Skor Kinerjamu',
                    value: SAWScore.toString(),
                    color: Colors.bluePurpleMin2,
                },
                {
                    label: 'Sesi Penjualan',
                    value: shortNumber(totalSessions),
                    color: Colors.royalBlueMin2,
                },
                {
                    label: 'Barang terjual',
                    value: shortNumber(totalSalesItem),
                    color: Colors.mossGreenMin2,
                },
            ];
        }

        return summary;
    };

    return {
        activeSession,
        getActiveSession,
        generateDashboardSummary,
    };
};

export default useDashboardSession;
