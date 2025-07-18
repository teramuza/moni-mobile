import Header from '@scenes/SessionRequest/components/Header.tsx';
import {
    ScrollView, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import useShiftStart from '@scenes/SessionRequest/hooks/useShiftStart.ts';
import SceneContainer, {
    shadowStyle,
} from '@components/molecules/SceneContainer.tsx';
import InputField from '@components/InputField/InputField.tsx';
import React, { useRef } from 'react';
import { useProfileStore } from '@stores/ProfileStore.ts';
import colors from '@themes/colors.ts';
import Colors from '@themes/colors.ts';
import CheckOutConfirmationSlider from '@scenes/SessionRequest/components/CheckoutConfirmation.slider.tsx';
import { DefaultRefType } from '@type/base.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import { navigate } from '@navigations/Navigation.service.ts';
import routeName from '@navigations/routeName.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import LoggingUtils from '@utils/logging.utils.ts';
import { formatOrderRequestId } from '@utils/sales.utils.ts';

const ShiftStartScene = () => {
    const sliderRef = useRef<DefaultRefType>(null);
    const {
        sceneTitle,
        isWaitingApproval,
        getProductData,
        requestStartSession,
    } = useShiftStart();
    const { session } = useSessionStore();
    const { profile } = useProfileStore();

    const handleContinue = () => {
        sliderRef?.current?.open();
    };

    const handleOnPressAddItem = () => {
        navigate(routeName.CheckInItemForm);
    };

    const renderForm = () => {
        if (isWaitingApproval) return;

        const carriedItems = session?.carried_products;

        return (
            <>
                <View style={styles.itemSalesContainer}>
                    <Text style={styles.fieldLabel}>{'Barang Bawaan:'}</Text>
                    {carriedItems?.length === 0 ? (
                        <Text style={styles.summaryText}>
                            {'anda belum menambahkan barang'}
                        </Text>
                    ) : (
                        carriedItems?.map((item, index) => {
                            LoggingUtils.log('carried item', item);
                            const product = getProductData(item.id_inv);
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.itemContainer,
                                        styles.shadow,
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 700,
                                            marginBottom: 12,
                                        }}
                                    >
                                        {item?.name ?? product?.name}
                                    </Text>
                                    <Text>{`Qty: ${item.qty}`}</Text>
                                    <Text>{`UPC Code: ${
                                        item?.upc_code ?? product?.upc_code
                                    }`}</Text>
                                </View>
                            );
                        })
                    )}
                    <TouchableOpacity
                        style={styles.addItemContainer}
                        onPress={handleOnPressAddItem}
                    >
                        <IconOutline
                            name="plus-circle"
                            color={Colors.neutralSecondaryText}
                            size={30}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                color: Colors.neutralSecondaryText,
                            }}
                        >
                            Tambah barang
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    const renderVerification = () => {
        if (!isWaitingApproval) return;
        return (
            <View
                style={{
                    flex: 1,
                    minHeight: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {!!session && (
                    <>
                        <Text style={{ textAlign: 'center', paddingHorizontal: 20,}}>
                            Tunjukkan Token ini kepada pengawas gudang untuk
                            memverifikasi data check-in mu
                        </Text>
                        <Text style={{ fontSize: 50, fontWeight: '700' }}>
                            {formatOrderRequestId(session?.id)}
                        </Text>
                    </>
                )}
            </View>
        );
    };

    return (
        <SceneContainer>
            <StatusBar barStyle={'light-content'} />
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
                onConfirm={requestStartSession}
            />
        </SceneContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        flex: 1,
    },
    itemSalesContainer: {
        paddingTop: 12,
    },
    fieldLabel: {
        paddingVertical: 12,
        fontSize: 14,
        color: colors.neutralMainText,
    },
    summaryText: {
        fontStyle: 'italic',
        color: Colors.neutralSecondaryText,
        fontSize: 12,
    },
    itemContainer: {
        borderRadius: 24,
        borderColor: colors.neutralBorder,
        backgroundColor: colors.neutralSecondaryBg,
        paddingHorizontal: 22,
        paddingVertical: 24,
        marginBottom: 8,
    },
    addItemContainer: {
        marginVertical: 22,
        flex: 1,
        height: 70,
        borderRadius: 50,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Colors.grey,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

export default ShiftStartScene;
