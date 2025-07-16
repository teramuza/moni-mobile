import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import SplashScreenScene from '@scenes/SplashScreen/SplashScreen.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';
import routeName from '@navigations/routeName.ts';
import ShiftEndScene from '@scenes/SessionRequest/ShiftEnd.scene.tsx';
import ShiftStartScene from '@scenes/SessionRequest/ShiftStart.scene.tsx';
import ShiftStartAddItemScene from '@scenes/SessionRequest/ShiftStartAddItem.scene.tsx';
import CheckpointScene from '@scenes/SessionRequest/Checkpoint.scene.tsx';
import ShiftStartApprovalScene from '@scenes/SessionRequest/ShiftStartApproval.scene.tsx';
import ShiftEndApprovalScene from '@scenes/SessionRequest/ShiftEndApproval.scene.tsx';

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
            name={routeName.CheckInItemForm}
            component={ShiftStartAddItemScene}
        />
        <Stack.Screen
            name={routeName.CheckPointForm}
            component={CheckpointScene}
        />
        <Stack.Screen
            name={routeName.CheckInForm}
            component={ShiftStartScene}
        />
        <Stack.Screen name={routeName.CheckOutForm} component={ShiftEndScene} />

        <Stack.Screen
            name={routeName.CheckInVerification}
            component={ShiftStartApprovalScene}
        />

        <Stack.Screen
            name={routeName.CheckOutVerification}
            component={ShiftEndApprovalScene}
        />
    </Stack.Navigator>
);

export default MainStack;
