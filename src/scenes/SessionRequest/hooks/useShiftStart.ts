import { useEffect, useState } from 'react';
import { CarriedItem } from '@models/CarriedItem.ts';
import { getInventories } from '@networks/request/inventories.ts';
import { Inventory } from '@models/Inventory.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import { addItemToSession } from '@networks/request/sessions.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import { SessionStatus } from '@models/Session.ts';

function useShiftStart() {
    const [isLoading, setIsLoading] = useState(true);
    const [carriedItems, setCarriedItems] = useState<CarriedItem[]>([]);
    const [inventories, setInventories] = useState<Inventory[]>();
    const toastRef = useToast();

    const { session } = useSessionStore();

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
                    setCarriedItems(prevState => [...prevState, response]);
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
        carriedItems,
        inventories,
        addItem,
        getProductData,
    };
}

export default useShiftStart;
