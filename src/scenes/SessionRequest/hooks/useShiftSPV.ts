import { parseOrderRequestId } from '@utils/sales.utils.ts';
import {
    approveCheckInSession,
    approveCheckOutSession,
} from '@networks/request/sessionSPV.ts';
import { goBack } from '@navigations/Navigation.service.ts';
import {getProfileByEmployeeId} from "@networks/request/profile.ts";
import {useToast} from "@components/molecules/Toast/ToastProvider.tsx";
import LoggingUtils from "@utils/logging.utils.ts";
import {BaseErrorResponse} from "@type/networks.ts";

const useShiftSPV = () => {
    const toastRef = useToast();
    const approveRequestCheckin = (id: string) => {
        const _id = parseOrderRequestId(id);
        approveCheckInSession(_id).then(result => {
            if (result) {
                toastRef.showToast({message: 'Request telah disetujui'})
                goBack();
            }
        }).catch((error: BaseErrorResponse) => {
            toastRef.showToast({
                message: error?.error?.message ?? '',
            });
        })
    };

    const approveRequestCheckout = (id: string) => {
        const _id = parseOrderRequestId(id);
        approveCheckOutSession(_id)
            .then(result => {
                if (result) {
                    toastRef.showToast({ message: 'Request telah disetujui' });
                    goBack();
                }
            })
            .catch((error: BaseErrorResponse) => {
                toastRef.showToast({
                    message: error?.error?.message ?? '',
                });
            });
    };

    const validateEmployeeId = async (employeeId: string) => {
        const response = await getProfileByEmployeeId(employeeId);
        return response?.full_name;
    }

    return {
        approveRequestCheckin,
        approveRequestCheckout,
        validateEmployeeId,
    };
};

export default useShiftSPV;
