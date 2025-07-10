import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScene from "@scenes/Login/Login.scene.tsx";

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={LoginScene.name} component={LoginScene} />
  </Stack.Navigator>
);

export default MainStack;
