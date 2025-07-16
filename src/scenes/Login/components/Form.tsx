import React, { useEffect, useState } from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import Colors from '@themes/colors';
import InputField from '@components/InputField/InputField';
import useLogin from '@scenes/Login/hooks/useLogin.ts';
import { reInitScreenApp } from '@navigations/Navigation.service.ts';
import {BaseErrorResponse} from "@type/networks.ts";

interface IProps {
  showToast?: (message?: string) => void;
}

const Form: React.FC<IProps> = ({showToast}) => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [dots, setDots] = useState('.');

  const {
    isLoading,
    username,
    password,
    errors,
    onChangeUsername,
    onChangePassword,
    handleSubmit,
  } = useLogin();

  const onPressSecurePass = () => {
    setIsHidePassword(!isHidePassword);
  };

  const onPressSubmit = () => {
    const onSuccess = () => {
      reInitScreenApp();
    };
    const onFailure = (error?: BaseErrorResponse) => {
      showToast?.(error?.error?.message);
    }
    if (!isLoading && !errors?.password && !errors?.username) {
      handleSubmit({ onSuccess, onFailure });
    }
  };

  useEffect(
    function handleLoadingDots() {
      if (isLoading) {
        const interval = setInterval(() => {
          setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);

        return () => clearInterval(interval);
      } else {
        setDots('');
      }
    },
    [isLoading],
  );

  return (
    <View style={styles.formContainer}>
      <StatusBar barStyle={'light-content'} />
      <InputField
        label="Email"
        inputMode="email"
        autoCapitalize="none"
        value={username}
        onChangeText={onChangeUsername}
        errorText={errors?.username}
      />
      <InputField
        label="Password"
        secureTextEntry={isHidePassword}
        leftIcon={isHidePassword ? 'eye-invisible' : 'eye'}
        onPressLeftIcon={onPressSecurePass}
        value={password}
        onChangeText={onChangePassword}
        errorText={errors?.password}
      />
      <View style={styles.continueButtonContainer}>
        <Pressable
          style={styles.continueButtonPressable}
          onPress={onPressSubmit}
        >
          <Text style={styles.continueButtonText}>
            {isLoading ? 'Masuk' + dots : 'Masuk'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  forgotPassContainer: {},
  forgotPassLabel: {
    fontSize: 12,
    color: Colors.bluePurplePlus1,
  },
  continueButtonContainer: {
    marginVertical: 24,
  },
  continueButtonPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.bluePurplePlus1,
  },
  continueButtonText: {
    color: Colors.neutralWhite,
  },
});

export default Form;
