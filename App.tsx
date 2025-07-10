import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from '@navigations/MainStack';
import {disableRTL} from '@utils/layout.utils';
import {navigationRef} from "@navigations/Navigation.service.ts";

disableRTL();

function App(): React.JSX.Element {
    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack />
        </NavigationContainer>
    );
}

export default App;
