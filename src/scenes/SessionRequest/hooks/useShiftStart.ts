import { useEffect, useState } from 'react';
import { getInventories } from '@networks/request/inventories.ts';
import { Inventory } from '@models/Inventory.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import { addItemToSession } from '@networks/request/sessions.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import { SessionStatus } from '@models/Session.ts';
import LoggingUtils from "@utils/logging.utils.ts";

function useShiftStart() {
    const [isLoading, setIsLoading] = useState(true);
    const [inventories, setInventories] = useState<Inventory[]>();
    const toastRef = useToast();

    const { session, setSession } = useSessionStore();

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
                        setSession({...session, carried_products: updatedCarriedItem});
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
            return inventories.find((inventory) => inventory.id === id);
        }
    }

    return {
        sceneTitle,
        isLoading,
        isWaitingApproval,
        inventories,
        addItem,
        getProductData,
    };
}

export default useShiftStart;
