import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@stores/AuthStore';
import { UserRole } from '@constants/User.ts';
import CustomTabBar from '@scenes/Dashboard/components/CustomTabBar.tsx';
import DashboardScene from '@scenes/Dashboard/Dashboard.scene.tsx';
import { DefaultRefType } from '@type/base.ts';
import LogoutSlider from '@scenes/Dashboard/components/Logout.slider.tsx';
import { BottomSheetProvider } from '@components/molecules/BottomSheet/BottomSheetProvider.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routeName from '@navigations/routeName.ts';
import CheckInConfirmationSlider from '@scenes/Dashboard/components/SalesComponent/CheckInConfirmation.slider.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardNavigatorWrapper = () => {
    const { user } = useAuthStore();
    const role = user?.role ?? 0;

    const SupervisorTabs = () => (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name={routeName.Dashboard} component={DashboardScene} />
            <Tab.Screen name={routeName.Employee} component={DashboardScene} />
        </Tab.Navigator>
    );

    const EmployeeStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={routeName.Dashboard}
                component={DashboardScene}
            />
        </Stack.Navigator>
    );

    return role > UserRole.EMPLOYEE ? <SupervisorTabs /> : <EmployeeStack />;
};

const DashboardNavigator = () => {
    const refs = {
        logoutSlider: useRef<DefaultRefType>(null),
        checkInConfirmationSlider: useRef<DefaultRefType>(null),
    };
    return (
        <BottomSheetProvider refs={refs}>
            <>
                <DashboardNavigatorWrapper />
                <LogoutSlider ref={refs.logoutSlider} />
                <CheckInConfirmationSlider
                    ref={refs.checkInConfirmationSlider}
                />
            </>
        </BottomSheetProvider>
    );
};

export default DashboardNavigator;
