import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '@navigations/MainStack';
import { disableRTL } from '@utils/layout.utils';
import { navigationRef } from '@navigations/Navigation.service.ts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastProvider from '@components/molecules/Toast/ToastProvider.tsx';
import { GuardedToastRefType } from '@components/molecules/Toast/GuardedToast.tsx';

disableRTL();

function App(): React.JSX.Element {
    const toastRef = useRef<GuardedToastRefType>(null);

    return (
        <GestureHandlerRootView>
            <ToastProvider ref={toastRef}>
                <NavigationContainer ref={navigationRef}>
                    <MainStack />
                </NavigationContainer>
            </ToastProvider>
        </GestureHandlerRootView>
    );
}

export default App;
