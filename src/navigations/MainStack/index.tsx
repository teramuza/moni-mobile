import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import SplashScreenScene from '@scenes/SplashScreen/SplashScreen.scene.tsx';
import DashboardNavigator from '@scenes/Dashboard/Dashboard.navigator.tsx';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }} initialRouteName={SplashScreenScene.name}>
    <Stack.Screen name={SplashScreenScene.name} component={SplashScreenScene} />
    <Stack.Screen name={LoginScene.name} component={LoginScene} />
    <Stack.Screen
      name={DashboardNavigator.name}
      component={DashboardNavigator}
    />
  </Stack.Navigator>
);

export default MainStack;
