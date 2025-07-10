import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@stores/AuthStore';
import DashboardSales from '@screens/Dashboard/Sales';
import DashboardSupervisor from '@screens/Dashboard/Supervisor';
import EmployeeListScreen from '@screens/Employee/List';
import { useSessionStore } from '@stores/useSessionStore';
import {UserRole} from "@constants/User.ts";

const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
    const { user } = useAuthStore();
    const role = user?.role;

    if (role === UserRole.SUPERVISOR) {
        return (
            <Tab.Navigator>
                <Tab.Screen name="SupervisorDashboard" component={DashboardSupervisor} options={{ title: 'Beranda' }} />
                <Tab.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'Data Pegawai' }} />
            </Tab.Navigator>
        );
    }

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="SalesDashboard" component={DashboardSales} />
        </Tab.Navigator>
    );
}
