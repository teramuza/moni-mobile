import Header from '@scenes/SessionRequest/components/Header.tsx';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import InputField from '@components/InputField/InputField.tsx';
import SceneContainer, {
    shadowStyle,
} from '@components/molecules/SceneContainer.tsx';
import { useProfileStore } from '@stores/ProfileStore.ts';
import React, { useEffect, useRef } from 'react';
import colors from '@themes/colors.ts';
import Colors from '@themes/colors.ts';
import useShiftEnd from '@scenes/SessionRequest/hooks/useShiftEnd.ts';
import CheckOutConfirmationSlider from '@scenes/SessionRequest/components/CheckoutConfirmation.slider.tsx';
import { DefaultRefType } from '@type/base.ts';

const ShiftEndScene = () => {
    const sliderRef = useRef<DefaultRefType>(null);
    const {
        sceneTitle,
        isWaitingApproval,
        salesSummary,
        getSalesSummary,
        handleContinueVerify,
    } = useShiftEnd();
    const { profile } = useProfileStore();

    useEffect(() => {
        getSalesSummary();
    }, []);

    const handleContinue = () => {
        sliderRef?.current?.open();
    };

    const renderForm = () => {
        if (isWaitingApproval) return;
        return (
            <>
                <View style={styles.itemSalesContainer}>
                    <Text style={styles.fieldLabel}>{'Barang Terjual:'}</Text>
                    {salesSummary?.soldItems?.length === 0 ? (
                        <Text style={styles.summaryText}>
                            {'tidak ada barang terjual :('}
                        </Text>
                    ) : (
                        salesSummary?.soldItems?.map((soldItem, index) => (
                            <View
                                key={index}
                                style={[styles.itemContainer, styles.shadow]}
                            >
                                <Text
                                    style={{
                                        fontWeight: 700,
                                        marginBottom: 12,
                                    }}
                                >
                                    {soldItem?.name}
                                </Text>
                                <Text>{`Qty: ${soldItem.qty}`}</Text>
                                <Text>{`UPC Code: ${soldItem.upc_code}`}</Text>
                            </View>
                        ))
                    )}
                </View>
                <View style={styles.itemSalesContainer}>
                    <Text style={styles.fieldLabel}>{'Barang Tersisa:'}</Text>
                    {salesSummary?.remainingItems?.length === 0 ? (
                        <Text style={styles.summaryText}>
                            {'Yeay! tidak ada barang tersisa 🎉'}
                        </Text>
                    ) : (
                        salesSummary?.remainingItems?.map((soldItem, index) => (
                            <View
                                key={index}
                                style={[styles.itemContainer, styles.shadow]}
                            >
                                <Text
                                    style={{
                                        fontWeight: 700,
                                        marginBottom: 12,
                                    }}
                                >
                                    {soldItem?.name}
                                </Text>
                                <Text>{`Qty: ${soldItem.qty}`}</Text>
                                <Text>{`UPC Code: ${soldItem.upc_code}`}</Text>
                            </View>
                        ))
                    )}
                </View>
            </>
        );
    };

    const renderVerification = () => {
        if (!isWaitingApproval) return;
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 50}}>OR 1231</Text>
            </View>
        );
    };

    return (
            <SceneContainer>
                <Header title={sceneTitle} />
                <ScrollView style={styles.container}>
                    <InputField
                        label="ID Karyawan"
                        value={profile?.employee_id}
                        disabled
                    />
                    {renderForm()}
                    {renderVerification()}
                </ScrollView>
                {!isWaitingApproval && (
                    <View>
                        <TouchableOpacity
                            style={styles.bottomSection}
                            onPress={handleContinue}
                        >
                            <Text style={styles.continueText}>{'LANJUT'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <CheckOutConfirmationSlider
                    ref={sliderRef}
                    onConfirm={handleContinueVerify}
                />
            </SceneContainer>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default ShiftEndScene;
