import { StyleSheet } from 'react-native';
import Colors from '@themes/colors.ts';

const BottomSheetStyles = StyleSheet.create({
  containerStyle: {
    zIndex: 0,
  },
  bottomSheetHandle: {
    height: 4,
    width: 55,
    backgroundColor: Colors.neutralContainer,
  },
  bottomSheetView: {
    width: '100%',
    /**
     * minHeight: 1 is needed to make the bottom sheet work, checkout:
     * https://github.com/gorhom/react-native-bottom-sheet/issues/1573#issuecomment-1758298048
     */
    minHeight: 1,
    paddingHorizontal: 16,
  },
});

export default BottomSheetStyles;
