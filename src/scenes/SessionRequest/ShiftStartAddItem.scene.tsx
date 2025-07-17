import Header from '@scenes/SessionRequest/components/Header.tsx';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropdownField from '@components/InputField/DropdownField.tsx';
import InputField from '@components/InputField/InputField.tsx';
import CounterField from '@components/InputField/CounterField.tsx';
import React, { useRef, useState } from 'react';
import colors from '@themes/colors.ts';
import Colors from '@themes/colors.ts';
import SceneContainer, {
    shadowStyle,
} from '@components/molecules/SceneContainer.tsx';
import useShiftStart from '@scenes/SessionRequest/hooks/useShiftStart.ts';
import { Inventory } from '@models/Inventory.ts';
import SliderOptionField from '@components/InputField/SliderOptionField.tsx';
import { DefaultRefType } from '@type/base.ts';
import {goBack} from "@navigations/Navigation.service.ts";

const ShiftStartAddItemScene = () => {
    const { inventories, addItem } = useShiftStart();
    const sliderOptionRef = useRef<DefaultRefType>(null);
    const [selectedItem, setSelectedItem] = useState<Inventory>();
    const [qty, setQty] = useState(0);

    const handleItemSelected = (item: Inventory) => {
        setSelectedItem(item);
    };

    const handleOpenSliderOption = () => {
        sliderOptionRef?.current?.open();
    };

    const handleSaveItem = () => {
        if (selectedItem && qty > 0) {
            addItem(selectedItem, qty, goBack)
        }
    }

    return (
        <SceneContainer>
            <StatusBar barStyle={'light-content'}/>
            <Header title={'Tambah barang'} canBack/>
            <View style={styles.container}>
                <DropdownField
                    label="Pilih barang"
                    value={selectedItem?.name}
                    placeholder={'pilih barang'}
                    onPress={handleOpenSliderOption}
                />
                <InputField
                    label="UPC"
                    value={selectedItem?.upc_code}
                    disabled
                    placeholder={'upc code barang'}
                />
                <CounterField
                    label="QTY"
                    value={qty}
                    min={0}
                    max={selectedItem?.stock ?? 0}
                    onChange={setQty}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={[styles.bottomSection, !(!!selectedItem && qty > 0) && {backgroundColor: Colors.neutralDisabledBg}]}
                    onPress={handleSaveItem}
                >
                    <Text style={styles.continueText}>{'SIMPAN'}</Text>
                </TouchableOpacity>
            </View>
            <SliderOptionField
                label="Pilih barang"
                ref={sliderOptionRef}
                data={inventories}
                onSelectItem={handleItemSelected}
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

export default ShiftStartAddItemScene;
