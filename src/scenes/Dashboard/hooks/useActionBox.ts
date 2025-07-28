import { OutlineGlyphMapType } from '@ant-design/icons-react-native/lib/outline';
import { useAuthStore } from '@stores/AuthStore.ts';
import { IColorSchemes } from '@themes/colors.ts';
import useShiftSessionEmployee from '@hooks/useShiftSessionEmployee.ts';
import { useBottomSheetRefs } from '@components/molecules/BottomSheet/BottomSheetProvider.tsx';
import {navigate} from "@navigations/Navigation.service.ts";
import routeName from "@navigations/routeName.ts";

export interface IActionBox {
    icon: OutlineGlyphMapType;
    title: string;
    label: string;
    onPress: () => void;
    color: IColorSchemes;
}

export default function useActionBox() {
    const { user } = useAuthStore();
    const { session, prepareCheckOutSession } = useShiftSessionEmployee();

    const { refs } = useBottomSheetRefs();

    const openConfirmationCheckIn = () => {
        refs?.checkInConfirmationSlider?.current?.open();
    };

    const generateActionBox = () => {
        let actionBox: IActionBox[] = [
            {
                icon: 'send',
                title: 'Apakah kamu siap check-in?',
                label: 'Siapkan helmu, angkat barangmu, kita mulai sesi petualangan!',
                color: 'bluePurple',
                onPress: openConfirmationCheckIn,
            },
        ];
        if (session) {
            actionBox = [
                {
                    icon: 'shop',
                    title: 'Checkpoint penjualan',
                    label: 'Laporkan progress penjualanmu disini',
                    color: 'bluePurple',
                    onPress: () => navigate(routeName.CheckPointForm),
                },
                {
                    icon: 'cluster',
                    title: 'Cukup untuk hari ini?',
                    label: 'Sudahi sesi, kembali ke markas. Kita laporkan hasil terbaikmu hari ini!',
                    color: 'brownSugar',
                    onPress: prepareCheckOutSession,
                },
            ];
        }
        if (user?.role !== 0) {
            actionBox = [
                {
                    icon: 'carry-out',
                    title: 'Approval Check-in Pegawai',
                    label: 'Lihat sesi check-in yang pending, verifikasi barang mereka disini',
                    color: 'bluePurple',
                    onPress: () => navigate(routeName.CheckInVerification),
                },
                {
                    icon: 'carry-out',
                    title: 'Approval Check-out Pegawai',
                    label: 'Verifikasi barang penjualan karyawan disini',
                    color: 'royalBlue',
                    onPress: () => navigate(routeName.CheckOutVerification),
                },
                {
                    icon: 'desktop',
                    title: 'Monitor Sesi berjalan',
                    label: 'Lihat status penjualan karyawan secara langsung',
                    color: 'mossGreen',
                    onPress: () => {},
                }
            ];
        }

        return actionBox;
    };

    const isNoSessionActive = !session && user?.role === 0;

    return {
        generateActionBox,
        isNoSessionActive,
    };
}
