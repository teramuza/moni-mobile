import { useEffect, useRef, useState } from 'react';
import { getSalesItems } from '@networks/request/sales.ts';
import { BaseErrorResponse } from '@type/networks.ts';
import { SalesSummaryItem } from '@models/SalesLog.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import { SessionStatus } from '@models/Session.ts';
import {
    getSession,
    requestCheckoutSession,
} from '@networks/request/sessions.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import LoggingUtils from '@utils/logging.utils.ts';
import { reInitScreenApp } from '@navigations/Navigation.service.ts';

function useShiftEnd() {
    const [isLoading, setIsLoading] = useState(true);
    const [salesSummary, setSalesSummary] = useState<SalesSummaryItem>({
        soldItems: [],
        remainingItems: [],
    });

    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    const session = useSessionStore(state => state.session);
    const updateStatus = useSessionStore(state => state.updateStatus);
    const clearSession = useSessionStore(state => state.clearSession);

    const toastRef = useToast();

    const getSalesSummary = () => {
        if (session) {
            setIsLoading(true);
            getSalesItems(session.id)
                .then(data => {
                    setSalesSummary(data);
                })
                .catch((error: BaseErrorResponse) => {
                    toastRef.showToast({
                        message: error?.error?.message ?? '',
                    });
                })
                .finally(() => setIsLoading(false));
        }
    };

    const isWaitingApproval = session?.status === SessionStatus.VERIFY_OUT;

    const sceneTitle = isWaitingApproval
        ? 'Menunggu verifikasi..'
        : 'Check-out Shift';

    const handleContinueVerify = () => {
        setIsLoading(true);
        requestCheckoutSession(session!.id)
            .then(data => {
                if (data?.success) {
                    updateStatus(SessionStatus.VERIFY_OUT);
                }
            })
            .catch((error: BaseErrorResponse) => {
                toastRef.showToast({
                    message:
                        error?.error?.message ??
                        'Terjadi kesalahan, coba lagi nanti',
                });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!session || !isWaitingApproval) return;

        const poll = async () => {
            try {
                const updatedSession = await getSession(session.id);
                if (updatedSession?.status === SessionStatus.FINISH) {
                    clearSession();
                    reInitScreenApp();
                }
            } catch (error) {
                LoggingUtils.warn('Polling session error:', error);
            }
        };

        pollingRef.current = setInterval(poll, 7500); // every 5 seconds
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [session?.id, session?.status]);

    useEffect(() => {
        if (session)
            if (session.status === SessionStatus.FINISH) {
            }
    }, [session?.status]);

    return {
        sceneTitle,
        isLoading,
        salesSummary,
        isWaitingApproval,
        getSalesSummary,
        handleContinueVerify,
    };
}

export default useShiftEnd;
