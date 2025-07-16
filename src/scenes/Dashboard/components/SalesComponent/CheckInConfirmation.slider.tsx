import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DefaultRefType } from '@type/base.ts';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetViewContainer from '@components/molecules/BottomSheet';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '@themes/colors.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import useShiftSessionEmployee from '@hooks/useShiftSessionEmployee.ts';

interface Props {
    onClose?: () => void;
}

const CheckInConfirmationSlider = forwardRef<DefaultRefType, Props>(
    ({ onClose }, ref) => {
        const bottomSheetRef = useRef<BottomSheet | null>(null);

        const { prepareCheckInSession } = useShiftSessionEmployee();

        useImperativeHandle(ref, () => ({
            open: () => {
                bottomSheetRef?.current?.snapToIndex(0);
            },
            close: () => close,
        }));

        function close() {
            bottomSheetRef?.current?.close();
        }

        function handleOnClose() {
            onClose?.();
        }

        function onPressContinue() {
            close();
            prepareCheckInSession();
        }

        return (
            <BottomSheetViewContainer
                ref={bottomSheetRef}
                onClose={handleOnClose}
                bottomInset={18}
            >
                <View style={{ alignItems: 'center' }}>
                    <IconOutline name="send" size={50} />
                    <Text style={styles.labelText}>
                        Anda sudah siap? aksi ini tidak bisa dibatalkan
                    </Text>
                </View>
                <View style={styles.actionContainer}>
                    <Pressable
                        onPress={onPressContinue}
                        style={[
                            styles.buttonAction,
                            { backgroundColor: Colors.bluePurpleMin1 },
                        ]}
                    >
                        <Text style={styles.labelButtonAction}>Mulai!</Text>
                    </Pressable>
                    <Pressable
                        onPress={close}
                        style={[
                            styles.buttonAction,
                            { backgroundColor: Colors.greyMin1 },
                        ]}
                    >
                        <Text style={styles.labelButtonAction}>Batal</Text>
                    </Pressable>
                </View>
            </BottomSheetViewContainer>
        );
    },
);

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    labelText: {
        fontSize: 18,
        marginVertical: 12,
        fontWeight: '300',
        textAlign: 'center',
    },
    buttonAction: {
        width: 60,
        height: 50,
        borderRadius: 18,
        marginHorizontal: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelButtonAction: {
        color: Colors.neutralWhite,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CheckInConfirmationSlider;
