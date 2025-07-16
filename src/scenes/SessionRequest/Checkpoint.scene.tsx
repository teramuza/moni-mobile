import Header from '@scenes/SessionRequest/components/Header.tsx';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import SceneContainer, {
    shadowStyle,
} from '@components/molecules/SceneContainer.tsx';
import InputField from '@components/InputField/InputField.tsx';
import React, { useState } from 'react';
import colors from '@themes/colors.ts';
import Colors from '@themes/colors.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import { getAvailableCarriedProducts } from '@utils/sales.utils.ts';
import { CarriedItem } from '@models/CarriedItem.ts';
import LoggingUtils from '@utils/logging.utils.ts';
import { CheckPointPayload } from '@models/Session.ts';
import { checkpointSession } from '@networks/request/sessions.ts';
import useShiftSessionEmployee from '@hooks/useShiftSessionEmployee.ts';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';
import {goBack} from "@navigations/Navigation.service.ts";

const CheckpointScene = () => {
    const [merchantName, setMerchantName] = useState('');
    const [selectedItem, setSelectedItem] = useState<CarriedItem[]>([]);
    const { session } = useSessionStore();
    const toastRef = useToast();

    const { getActiveSession } = useShiftSessionEmployee();

    const isValid =
        !!merchantName && getAvailableCarriedProducts(selectedItem).length > 0;

    const items = getAvailableCarriedProducts(session?.carried_products);
    console.log(items);

    const handleIncrement = (item: CarriedItem) => {
        setSelectedItem(prev => {
            const exists = prev.find(p => p.id === item.id);
            const selectedQty = exists?.qty ?? 0;
            const availableQty = item.qty ?? 0;

            if (selectedQty >= availableQty) return prev;

            if (exists) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, qty: selectedQty + 1 } : p,
                );
            } else {
                return [
                    ...prev,
                    {
                        id: item.id,
                        id_inv: item.id_inv,
                        id_or: item.id_or,
                        qty: 1,
                        initial_qty: item.initial_qty,
                        name: item.name,
                        upc_code: item.upc_code,
                    },
                ];
            }
        });
    };

    const handleDecrement = (item: CarriedItem) => {
        setSelectedItem(prev => {
            const exists = prev.find(p => p.id === item.id);
            if (!exists) return prev;

            const newQty = (exists.qty ?? 0) - 1;

            if (newQty <= 0) {
                return prev.filter(p => p.id !== item.id);
            }

            return prev.map(p =>
                p.id === item.id ? { ...p, qty: newQty } : p,
            );
        });
    };


    const renderForm = () => {
        return (
            <>
                <View style={styles.itemSalesContainer}>
                    <Text style={styles.fieldLabel}>{'Pilih Barang:'}</Text>
                    {items?.length === 0 ? (
                        <Text style={styles.summaryText}>
                            {'tidak ada barang tersisa :('}
                        </Text>
                    ) : (
                        items?.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.itemContainer,
                                    styles.shadow,
                                    {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    },
                                ]}
                            >
                                {/* Left: Info Section */}
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            marginBottom: 12,
                                        }}
                                    >
                                        {item?.name}
                                    </Text>
                                    <Text>{`Qty: ${item.qty}`}</Text>
                                    <Text>{`UPC Code: ${item.upc_code}`}</Text>
                                </View>

                                <View style={styles.qtyControlContainer}>
                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        onPress={() => handleDecrement(item)}
                                    >
                                        <Text style={styles.qtyButtonText}>
                                            −
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyValue}>
                                        {selectedItem.find(
                                            p => p.id === item.id,
                                        )?.qty ?? 0}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        onPress={() => handleIncrement(item)}
                                    >
                                        <Text style={styles.qtyButtonText}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </>
        );
    };

    const handleSubmit = () => {
        if (session && isValid) {
            const payload: CheckPointPayload = {
                merchant_name: merchantName,
                location: '1020,1249 1231,12131', // akan diisi nanti
                photo_url: '', // akan diisi nanti
                items: selectedItem.map(item => ({
                    id: item.id_inv,
                    ciId: item.id,
                    qty: item.qty,
                })),
            };


            LoggingUtils.log(JSON.stringify(payload));

            checkpointSession(session.id, payload)
                .then(result => {
                    if (result?.success) {
                        getActiveSession();
                        goBack();
                        toastRef.showToast({
                            message: 'Data berhasil disimpan',
                        });
                    }
                })
                .catch(error => {
                    toastRef.showToast({
                        message:
                            error?.error?.message ??
                            'Terjadi kesalahan, coba lagi nanti',
                    });
                });
        }
    };

    return (
        <SceneContainer>
            <Header title={'Checkpoint Penjualan'} canBack />
            <ScrollView style={styles.container}>
                <InputField
                    label="Nama Merchant"
                    value={merchantName}
                    onChangeText={setMerchantName}
                />
                {renderForm()}
            </ScrollView>
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
                    <Text style={styles.continueText}>{'SIMPAN'}</Text>
                </TouchableOpacity>
            </View>
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
    qtyControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EAF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyButtonText: {
        color: '#3B82F6',
        fontSize: 20,
        fontWeight: 'bold',
    },
    qtyValue: {
        width: 24,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default CheckpointScene;
