import { useEffect, useState } from 'react';
import { getSAWScore } from '@networks/request/profile.ts';
import { useAuthStore } from '@stores/AuthStore.ts';
import {
    getAllSales,
    getSalesByEmployee,
    getSalesItemByToday,
} from '@networks/request/sales.ts';
import Colors from '@themes/colors.ts';
import { generateSAWScore, shortNumber } from '@utils/number.utils.ts';
import useShiftSessionEmployee from '@hooks/useShiftSessionEmployee.ts';
import { UserRole } from '@constants/User.ts';
import { getDurationString, getMinutesDuration } from '@utils/time.utils.ts';
import { getAllActiveSessions } from '@networks/request/sessionSPV.ts';

export interface IDashboardSummarySection {
    label: string;
    value: string;
    color: string;
}

const useDashboardSession = () => {
    const [SAWScore, setSAWScore] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalActiveSessions, setTotalActiveSessions] = useState(0);
    const [totalSalesItem, setTotalSalesItem] = useState(0);
    const { user } = useAuthStore();
    const { session } = useShiftSessionEmployee();

    const isEmployee = user?.role === UserRole.EMPLOYEE;

    useEffect(() => {
        if (user && user?.role > 0) {
            getSummaryDashboardSPV();
            return;
        }
        if (!session) {
            getSummaryDashboard();
        }
    }, [session, user]);

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

    const getAllActiveSessionsSPV = () => {
        getAllActiveSessions().then(sessions => {
            if (sessions && sessions.length > 0) {
                setTotalActiveSessions(setTotalSessions.length);
            }
        });
    };

    const getSoldItemToday = () => {
        getSalesItemByToday().then(sales => {
            setTotalSalesItem(sales?.totalQty);
        });
    };

    const getAllSaleItemsSPV = () => {
        getAllSales().then(sales => {
            if (sales.total) {
                setTotalSessions(sales.total);
            }
        });
    };

    const getSummaryDashboardSPV = () => {
        getAllActiveSessionsSPV();
        getAllSaleItemsSPV();
        getSoldItemToday();
    };

    const getSummaryDashboard = () => {
        getSAWScoreEmployee();
        getTotalSaleItem();
    };

    const generateDashboardSummary = () => {
        let summary: Array<IDashboardSummarySection> = [];
        if (isEmployee) {
            if (!session) {
                summary = [
                    {
                        label: 'Skor Kinerjamu',
                        value: generateSAWScore(SAWScore),
                        color: Colors.bluePurpleMin2,
                    },
                    {
                        label: 'Sesi Penjualan',
                        value: shortNumber(totalSessions),
                        color: Colors.royalBlueMin2,
                    },
                    {
                        label: 'Total Barang terjual',
                        value: shortNumber(totalSalesItem),
                        color: Colors.mossGreenMin2,
                    },
                ];
            } else {
                summary = [
                    {
                        label: 'Titik pemberhentian',
                        value: shortNumber(session?.total_logs ?? 0),
                        color: Colors.bluePurpleMin2,
                    },
                    {
                        label: 'Durasi sesi',
                        value: getDurationString(
                            getMinutesDuration(session.pick_time as string),
                        ),
                        color: Colors.royalBlueMin2,
                    },
                    {
                        label: 'Barang terjual',
                        value: shortNumber(session?.total_qty ?? 0),
                        color: Colors.mossGreenMin2,
                    },
                ];
            }
        } else {
            summary = [
                {
                    label: 'Titik merchant',
                    value: shortNumber(totalSessions),
                    color: Colors.bluePurpleMin2,
                },
                {
                    label: 'Sesi aktif',
                    value: shortNumber(totalActiveSessions),
                    color: Colors.royalBlueMin2,
                },
                {
                    label: 'Barang terjual hari ini',
                    value: shortNumber(totalSalesItem),
                    color: Colors.mossGreenMin2,
                },
            ];
        }

        return summary;
    };

    return {
        generateDashboardSummary,
    };
};

export default useDashboardSession;
