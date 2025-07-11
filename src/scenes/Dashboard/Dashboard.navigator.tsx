import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@stores/AuthStore';
import { UserRole } from '@constants/User.ts';
import CustomTabBar from '@scenes/Dashboard/components/CustomTabBar.tsx';
import DashboardScene from '@scenes/Dashboard/Dashboard.scene.tsx';
import { DefaultRefType } from '@type/base.ts';
import LogoutSlider from '@scenes/Dashboard/components/Logout.slider.tsx';
import { BottomSheetProvider } from '@components/molecules/BottomSheet/BottomSheetProvider.tsx';

const Tab = createBottomTabNavigator();

const DashboardNavigatorWrapper = () => {
  const { user } = useAuthStore();
  const role = user?.role ?? 0;

  if (role > UserRole.EMPLOYEE) {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name={DashboardScene.name} component={DashboardScene} />
        <Tab.Screen name="EmployeeList" component={DashboardScene} />
      </Tab.Navigator>
    );
  }

  return <Tab.Screen name="SalesDashboard" component={DashboardScene} />;
};

const DashboardNavigator = () => {
  const refs = {
    logoutSlider: useRef<DefaultRefType>(null),
  };
  return (
    <BottomSheetProvider refs={refs}>
      <>
        <DashboardNavigatorWrapper />
        <LogoutSlider ref={refs.logoutSlider} />
      </>
    </BottomSheetProvider>
  );
};

export default DashboardNavigator;
