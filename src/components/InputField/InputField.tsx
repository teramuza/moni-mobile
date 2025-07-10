import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEvent,
  View,
} from 'react-native';
import {
  IconFill,
  IconOutline,
  OutlineGlyphMapType,
} from '@ant-design/icons-react-native';
import Colors from 'themes/colors';
import {TextInputProps} from 'react-native';
import colors from 'themes/colors';

interface Props extends TextInputProps {
  label?: string;
  leftIcon?: OutlineGlyphMapType;
  onClear?: () => void;
  onPressLeftIcon?: () => void;
  errorText?: string;
}

const InputField: React.FC<Props> = ({
  label,
  leftIcon,
  onClear,
  onPressLeftIcon,
  errorText,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(e: TextInputFocusEvent) {
    onFocus?.(e);
    setIsFocused(true);
  }

  function handleBlur(e: TextInputFocusEvent) {
    onBlur?.(e);
    setIsFocused(false);
  }

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={[
          styles.fieldTextInputContainer,
          errorText
            ? styles.textInputError
            : isFocused
            ? styles.textInputFocus
            : undefined,
        ]}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.fieldTextInput}
          {...textInputProps}
        />
        {isFocused && onClear && (
          <Pressable onPress={onClear}>
            <IconFill
              name="close-circle"
              color={colors.grey}
              size={18}
              style={styles.clearIcon}
            />
          </Pressable>
        )}
        {!!leftIcon && (
          <Pressable onPress={onPressLeftIcon}>
            <IconOutline
              name={leftIcon}
              size={24}
              color={colors.grey}
              style={styles.leftIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    paddingVertical: 4,
  },
  fieldLabel: {
    paddingVertical: 12,
    fontSize: 14,
    color: colors.neutralMainText,
  },
  fieldTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.greyMin2,
    borderWidth: 0.7,
    borderRadius: 10,
  },
  fieldTextInput: {
    flex: 1,
    height: 50,
    padding: 12,
  },
  textInputFocus: {
    borderColor: Colors.bluePurpleMin1,
    borderWidth: 1,
  },
  textInputError: {
    borderColor: Colors.redRubyPlus1,
    borderWidth: 1,
  },
  clearIcon: {
    marginHorizontal: 8,
  },
  leftIcon: {
    marginEnd: 12,
  },
});

export default InputField;
