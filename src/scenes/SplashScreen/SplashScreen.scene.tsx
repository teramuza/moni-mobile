import React from 'react';
import { Image, View, Text } from 'react-native';
import images from '@images';
import Colors from '@themes/colors.ts';
import useLoadingApp from '@scenes/SplashScreen/hooks/useLoadingApp.ts';
import LoadingSpinner from "@components/molecules/LoadingSpinner.tsx";

const SplashScreenScene = () => {
  useLoadingApp();
  return (
    <View
      style={{
        backgroundColor: Colors.bluePurplePlus1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={images.MoniAppLogo} />
        <Text
          style={{
            color: Colors.neutralBorder,
            fontStyle: 'italic',
            paddingVertical: 20,
          }}
        >
          employee monitoring app
        </Text>
          <View style={{marginTop: 30}}>
          <LoadingSpinner color={Colors.neutralWhite} />
          </View>
      </View>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginVertical: 50,
        }}
      >
        <Text style={{ color: Colors.neutralWhite, fontSize: 12 }}>
          by teuku raja
        </Text>
      </View>
    </View>
  );
};

export default SplashScreenScene;
