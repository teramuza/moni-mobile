import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import SplashScreenScene from '@scenes/SplashScreen/SplashScreen.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';
import routeName from "@navigations/routeName.ts";

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }} initialRouteName={routeName.SplashScreen}>
    <Stack.Screen name={routeName.SplashScreen} component={SplashScreenScene} />
    <Stack.Screen name={routeName.Login} component={LoginScene} />
    <Stack.Screen
      name={routeName.DashboardWrapper}
      component={DashboardNavigator}
    />
  </Stack.Navigator>
);

export default MainStack;
