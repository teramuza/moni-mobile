import React from 'react';
import { View } from 'react-native';
import Colors from '@themes/colors';
import {isAndroid} from "@utils/platform.utils.ts";

interface Props {
  children: React.ReactNode;
}

const SceneContainer: React.FC<Props> = ({ children }) => (
  <View style={{ backgroundColor: Colors.neutralContainer, flex: 1 }}>
    {children}
  </View>
);

export const shadowStyle = () => {
  return isAndroid()
      ? {
        shadowColor: '#bebebe',
        elevation: 24,
      }
      : {
        shadowColor: '#181818',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      };
};

export default SceneContainer;
