import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from 'themes/colors';
import InputField from 'components/InputField/InputField';

interface IProps {}

const Form: React.FC<IProps> = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);

  const onPressSecurePass = () => {
    setIsHidePassword(!isHidePassword);
  };

  return (
    <View style={styles.formContainer}>
      <InputField
        label="Email"
        inputMode="email"
      />
      <InputField
        label="Password"
        secureTextEntry={isHidePassword}
        leftIcon={isHidePassword ? 'eye-invisible' : 'eye'}
        onPressLeftIcon={onPressSecurePass}
      />
      <View style={styles.forgotPassContainer}>
        <Text style={styles.forgotPassLabel}>Lupa Password?</Text>
      </View>
      <View style={styles.continueButtonContainer}>
        <Pressable style={styles.continueButtonPressable}>
          <Text style={styles.continueButtonText}>Masuk</Text>
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
