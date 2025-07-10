import React from 'react';
import { View } from 'react-native';
import Colors from '@themes/colors';

interface Props {
  children: React.ReactNode;
}

const SceneContainer: React.FC<Props> = ({ children }) => (
  <View style={{ backgroundColor: Colors.neutralContainer, flex: 1 }}>
    {children}
  </View>
);

export default SceneContainer;
