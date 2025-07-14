import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DefaultRefType } from '@type/base.ts';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetViewContainer from '@components/molecules/BottomSheet';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import images from '@images';
import { useAuthStore } from '@stores/AuthStore.ts';
import { reInitScreenApp } from '@navigations/Navigation.service.ts';
import { useProfileStore } from '@stores/ProfileStore.ts';
import Colors from '@themes/colors.ts';

interface Props {
  onClose?: () => void;
}

const LogoutSlider = forwardRef<DefaultRefType, Props>(({ onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const { clearAuth } = useAuthStore();
  const { clearProfile } = useProfileStore();

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
    clearAuth();
    clearProfile();
    reInitScreenApp();
  }

  return (
    <BottomSheetViewContainer
      ref={bottomSheetRef}
      onClose={handleOnClose}
      bottomInset={18}
    >
      <View style={{ alignItems: 'center' }}>
        <Image
          source={images.Logout}
          style={{ resizeMode: 'contain', height: 200 }}
        />
        <Text style={styles.labelText}>
          Apakah anda yakin ingin keluar dari akun ini?
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <Pressable
          onPress={onPressContinue}
          style={[styles.buttonAction, { backgroundColor: Colors.redRuby }]}
        >
          <Text style={styles.labelButtonAction}>Ya</Text>
        </Pressable>
        <Pressable
          onPress={close}
          style={[styles.buttonAction, { backgroundColor: Colors.greyMin1 }]}
        >
          <Text style={styles.labelButtonAction}>Tidak</Text>
        </Pressable>
      </View>
    </BottomSheetViewContainer>
  );
});

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  labelText: { fontSize: 18, marginVertical: 12, fontWeight: '300' },
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

export default LogoutSlider;
