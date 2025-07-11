import { forwardRef } from 'react';
import BottomSheetStyles from './styles.ts';
import Backdrop from './Backdrop.tsx';
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import styles from './styles.ts';

interface IProps extends BottomSheetProps {
  bottomInset?: number;
}

const BottomSheetViewContainer = forwardRef<BottomSheet, IProps>(
  ({ children, bottomInset, onClose, ...props }, ref) => {
    function handleClose() {
      onClose?.();
    }

    return (
      <BottomSheet
        containerStyle={BottomSheetStyles.containerStyle}
        handleIndicatorStyle={BottomSheetStyles.bottomSheetHandle}
        backdropComponent={Backdrop}
        index={-1}
        enableDynamicSizing
        onClose={handleClose}
        ref={ref}
        {...props}
      >
        <BottomSheetView
          style={[styles.bottomSheetView, { paddingBottom: bottomInset }]}
        >
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default BottomSheetViewContainer;
