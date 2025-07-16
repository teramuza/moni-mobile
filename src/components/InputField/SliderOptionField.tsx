import { forwardRef, useImperativeHandle, useRef } from 'react';
import BottomSheetStyles from '../molecules/BottomSheet/styles.ts';
import Backdrop from '../molecules/BottomSheet/Backdrop.tsx';
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Colors from '@themes/colors.ts';
import { DefaultRefType } from '@type/base.ts';

interface IProps extends Omit<BottomSheetProps, 'children'> {
    label?: string;
    data?: any[];
    onSelectItem?: (data: any) => void;
}

const SliderOptionField = forwardRef<DefaultRefType, IProps>(
    ({ data, label, onClose, onSelectItem, ...props }, ref) => {
        const bottomSheetRef = useRef<BottomSheet | null>(null);

        useImperativeHandle(ref, () => ({
            open: () => {
                bottomSheetRef?.current?.snapToIndex(0);
            },
            close: () => close,
        }));

        function close() {
            bottomSheetRef?.current?.close();
        }

        function onPress(item: any) {
            close();
            onSelectItem?.(item);
        }

        function handleClose() {
            onClose?.();
        }

        const renderItem = ({ item, index }: { item: any; index: number }) => {
            const onPressedItem = () => {
                onPress?.(item);
            };

            return (
                <>
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={onPressedItem}
                    >
                        <View style={styles.itemContainer}>
                            <Text>
                                {item?.name ?? item?.label ?? item?.value}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </>
            );
        };

        const renderSeparator = () => <View style={styles.separator} />;

        const keyExtractor = (_: undefined, i: number) => i.toString();

        return (
            <BottomSheet
                containerStyle={BottomSheetStyles.containerStyle}
                handleIndicatorStyle={BottomSheetStyles.bottomSheetHandle}
                backdropComponent={Backdrop}
                index={-1}
                enableDynamicSizing
                onClose={handleClose}
                ref={bottomSheetRef}
                {...props}
            >
                <>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>{label}</Text>
                    </View>
                    <BottomSheetFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </>
            </BottomSheet>
        );
    },
);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    separator: {
        backgroundColor: Colors.neutralBorder,
        height: 1,
        marginHorizontal: 16,
    },
});

export default SliderOptionField;
