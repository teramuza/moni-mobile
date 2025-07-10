import React from 'react';
import {Text, View} from 'react-native';
import StatusBar from 'components/molecules/StatusBar';

interface Props {}

const WelcomeScene: React.FC<Props> = () => {
  return (
    <View>
      <StatusBar />
      <Text>Welcome</Text>
    </View>
  );
};

export default WelcomeScene;
