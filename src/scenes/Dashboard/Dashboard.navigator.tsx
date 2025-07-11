import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@stores/AuthStore';
import { UserRole } from '@constants/User.ts';
import CustomTabBar from '@scenes/Dashboard/components/CustomTabBar.tsx';
import DashboardScene from "@scenes/Dashboard/Dashboard.scene.tsx";

const Tab = createBottomTabNavigator();

const DashboardNavigator = () => {
  const { user } = useAuthStore();
  const role = user?.role ?? 0;

  if (role > UserRole.EMPLOYEE) {
    return (
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={DashboardScene.name}
          component={DashboardScene}
        />
        <Tab.Screen
          name="EmployeeList"
          component={DashboardScene}
        />
      </Tab.Navigator>
    );
  }

  return <Tab.Screen name="SalesDashboard" component={DashboardScene} />;
}

export default DashboardNavigator;
