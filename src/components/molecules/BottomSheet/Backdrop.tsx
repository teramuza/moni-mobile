import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const Backdrop = (props: BottomSheetDefaultBackdropProps) => {
    return (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
        />
    );
};

export default Backdrop;
