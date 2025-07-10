import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from '@navigations/MainStack';
import {disableRTL} from '@utils/layout.utils';

disableRTL();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}

export default App;
