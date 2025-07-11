import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from '@navigations/MainStack';
import {disableRTL} from '@utils/layout.utils';
import {navigationRef} from "@navigations/Navigation.service.ts";
import {GestureHandlerRootView} from "react-native-gesture-handler";

disableRTL();

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
        <NavigationContainer ref={navigationRef}>
            <MainStack />
        </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;
