import { useState } from 'react';
import { Profile } from '@models/Profile.ts';
import { getProfile, getSAWScore } from '@networks/request/profile.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import LoggingUtils from '@utils/logging.utils.ts';
import { getSalesByEmployee } from '@networks/request/sales.ts';
import {generateSAWScore, shortNumber} from "@utils/number.utils.ts";
import Colors from "@themes/colors.ts";

const useEmployeeSlider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [employee, setEmployee] = useState<Profile>();
    const [sawScore, setSawScore] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalItemsSold, setTotalItemsSold] = useState(0);
    const toastRef = useToast();

    const fetchEmployeeData = (id?: number) => {
        if (id) {
            setIsLoading(true);
            getProfile(id)
                .then(profile => {
                    if (profile) {
                        setEmployee(profile);
                        getEmployeeSummary(profile.id);
                    }
                })
                .catch(e => {
                    toastRef.showToast({
                        message: 'Terjadi kesalahan, coba lagi nanti',
                    });
                    LoggingUtils.warn('fetchEmployeeData', e);
                }).finally(() => setIsLoading(false));
        }
    };

    const getEmployeeSummary = (id: number) => {
        getSAWScore(id).then(data => {
            setSawScore(data?.average_skor_saw ?? 0);
            setTotalSessions(data?.total_sessions ?? 0);
        });
        getSalesByEmployee(id).then(sales => {
            setTotalItemsSold(sales?.totalQty ?? 0);
        });
    };

    const onClose = () => {
        setIsLoading(false);
        setEmployee(undefined);
        setSawScore(0);
        setTotalSessions(0);
        setTotalItemsSold(0);
    };

    const employeeSummary =  [
        {
            label: 'Skor Performa',
            value: generateSAWScore(sawScore),
            color: Colors.bluePurpleMin2,
        },
        {
            label: 'Total Sesi Penjualan',
            value: shortNumber(totalSessions),
            color: Colors.royalBlueMin2,
        },
        {
            label: 'Barang terjual',
            value: shortNumber(totalItemsSold),
            color: Colors.mossGreenMin2,
        },
    ]

    return {
        isLoading,
        employee,
        employeeSummary,
        fetchEmployeeData,
        onClose,
    };
};

export default useEmployeeSlider;
