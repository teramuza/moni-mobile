import {useEffect, useRef, useState} from 'react';
import { getInventories } from '@networks/request/inventories.ts';
import { Inventory } from '@models/Inventory.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import {
    addItemToSession, getSession,
    requestCheckInSession,
} from '@networks/request/sessions.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import { SessionStatus } from '@models/Session.ts';
import LoggingUtils from '@utils/logging.utils.ts';
import { BaseErrorResponse } from '@type/networks.ts';
import {reInitScreenApp} from "@navigations/Navigation.service.ts";

function useShiftStart() {
    const [isLoading, setIsLoading] = useState(true);
    const [inventories, setInventories] = useState<Inventory[]>();
    const toastRef = useToast();
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    const { session, setSession, updateStatus } = useSessionStore();

    useEffect(() => {
        if (!inventories) {
            setIsLoading(false);
            getInventories()
                .then((data: Inventory[]) => {
                    setInventories(data);
                })
                .finally(() => setIsLoading(false));
        }
    }, [inventories]);

    const addItem = (item: Inventory, qty: number, onSuccess?: () => void) => {
        setIsLoading(true);
        addItemToSession(session!.id, { id_inv: item.id, qty: qty })
            .then(response => {
                if (response) {
                    LoggingUtils.log(response);
                    const updatedCarriedItem = session?.carried_products ?? [];
                    updatedCarriedItem.push(response);
                    if (session) {
                        setSession({
                            ...session,
                            carried_products: updatedCarriedItem,
                        });
                    }
                    onSuccess?.();
                }
            })
            .catch(error => {
                toastRef.showToast({
                    message:
                        error?.error?.message ??
                        'Terjadi kesalahan, coba lagi nanti',
                });
            })
            .finally(() => setIsLoading(false));
    };

    const isWaitingApproval = session?.status === SessionStatus.VERIFY_IN;

    const sceneTitle = isWaitingApproval
        ? 'Menunggu verifikasi...'
        : 'Check-in Shift';

    const getProductData = (id: number) => {
        if (inventories) {
            LoggingUtils.log('inventories',inventories)
            return inventories.find(inventory => String(inventory.id) === String(id));
        }
    };

    const requestStartSession = () => {
        if (session) {
            setIsLoading(true);
            requestCheckInSession(session.id)
                .then(data => {
                    if (data?.success) {
                        updateStatus(SessionStatus.VERIFY_IN);
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
        }
    };

    useEffect(() => {
        if (!session || !isWaitingApproval) return;

        const poll = async () => {
            try {
                const updatedSession = await getSession(session.id);
                if (updatedSession?.status === SessionStatus.CHECKIN) {
                    setSession(updatedSession);
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

    return {
        sceneTitle,
        isLoading,
        isWaitingApproval,
        inventories,
        addItem,
        getProductData,
        requestStartSession,
    };
}

export default useShiftStart;
