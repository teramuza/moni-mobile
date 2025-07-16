import useShiftSPV from '@scenes/SessionRequest/hooks/useShiftSPV.ts';
import SceneContainer, {
    shadowStyle,
} from '@components/molecules/SceneContainer.tsx';
import Header from '@scenes/SessionRequest/components/Header.tsx';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import InputField from '@components/InputField/InputField.tsx';
import React, { useState } from 'react';
import colors from '@themes/colors.ts';
import Colors from '@themes/colors.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import LoggingUtils from "@utils/logging.utils.ts";

const ShiftEndApprovalScene = () => {
    const [employeeId, setEmployeeId] = useState<string>();
    const [shiftId, setShiftId] = useState<string>();
    const [fullName, setFullName] = useState<string>();
    const { validateEmployeeId, approveRequestCheckout } = useShiftSPV();
    const toastRef = useToast();

    const handleValidateEmployeeId = () => {
        if (employeeId) {
            validateEmployeeId(employeeId)
                .then(data => {
                    setFullName(data);
                })
                .catch(() => {
                    toastRef?.showToast?.({
                        message: 'Gagal validasi data karyawan',
                    });
                });
        }
    };

    const handleSubmit = () => {
        if (fullName && shiftId) {
            approveRequestCheckout(shiftId);
        }
    };

    const isValid = !!fullName && !!shiftId;
    LoggingUtils.log('isValid', isValid, !!fullName, !!shiftId);

    return (
        <SceneContainer>
            <StatusBar barStyle={'light-content'} />
            <Header title={'Approval Shift Check-Out'} canBack />
            <View style={styles.container}>
                <InputField
                    label="ID Karyawan"
                    value={employeeId}
                    onChangeText={setEmployeeId}
                    onBlur={handleValidateEmployeeId}
                    placeholder={'ID Karyawan'}
                />
                <Text>{fullName}</Text>
                <InputField
                    label="ID Shift"
                    value={shiftId}
                    onChangeText={setShiftId}
                    placeholder={'OR00xx'}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={[
                        styles.bottomSection,
                        !isValid && {
                            backgroundColor: Colors.neutralDisabledBg,
                        },
                    ]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.continueText}>{'SETUJUI'}</Text>
                </TouchableOpacity>
            </View>
        </SceneContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
    itemSalesContainer: {
        paddingTop: 12,
    },
    fieldLabel: {
        paddingVertical: 12,
        fontSize: 14,
        color: colors.neutralMainText,
    },
    summaryText: { fontStyle: 'italic', color: Colors.neutralSecondaryText },
    itemContainer: {
        borderRadius: 24,
        borderColor: colors.neutralBorder,
        backgroundColor: colors.neutralSecondaryBg,
        paddingHorizontal: 22,
        paddingVertical: 24,
        marginBottom: 8,
    },
    shadow: {
        ...shadowStyle(),
    },
    bottomSection: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
        backgroundColor: Colors.royalBlue,
    },
    continueText: {
        color: Colors.neutralWhite,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ShiftEndApprovalScene;
