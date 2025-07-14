import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import SplashScreenScene from '@scenes/SplashScreen/SplashScreen.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';
import routeName from '@navigations/routeName.ts';
import ShiftEndScene from '@scenes/SessionRequest/ShiftEnd.scene.tsx';
import ShiftStartScene from '@scenes/SessionRequest/ShiftStart.scene.tsx';
import ShiftStartAddItemScene from '@scenes/SessionRequest/ShiftStartAddItem.scene.tsx';

const Stack = createNativeStackNavigator();

const MainStack = () => (
    <Stack.Navigator
        id={undefined}
        screenOptions={{ headerShown: false }}
        initialRouteName={routeName.SplashScreen}
    >
        <Stack.Screen
            name={routeName.SplashScreen}
            component={SplashScreenScene}
        />
        <Stack.Screen name={routeName.Login} component={LoginScene} />
        <Stack.Screen
            name={routeName.DashboardWrapper}
            component={DashboardNavigator}
        />
        <Stack.Screen
            name={routeName.CheckInForm}
            component={ShiftStartScene}
        />
        <Stack.Screen
            name={routeName.CheckInItemForm}
            component={ShiftStartAddItemScene}
        />
        <Stack.Screen name={routeName.CheckOutForm} component={ShiftEndScene} />
    </Stack.Navigator>
);

export default MainStack;
