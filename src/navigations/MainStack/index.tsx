import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from '@scenes/Login/Login.scene.tsx';
import SplashScreenScene from '@scenes/SplashScreen/SplashScreen.scene.tsx';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SplashScreenScene.name} component={SplashScreenScene} />
    <Stack.Screen name={LoginScene.name} component={LoginScene} />
  </Stack.Navigator>
);

export default MainStack;
