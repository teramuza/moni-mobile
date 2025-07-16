import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import colors from '@themes/colors';

interface Props {
    label?: string;
    value?: string;
    placeholder?: string;
    onPress?: () => void;
    disabled?: boolean;
    errorText?: string;
}

const DropdownField: React.FC<Props> = ({
    label,
    value,
    placeholder,
    onPress,
    disabled,
    errorText,
}) => {
    return (
        <View style={styles.fieldContainer}>
            {!!label && <Text style={styles.fieldLabel}>{label}</Text>}
            <Pressable
                style={[
                    styles.dropdownContainer,
                    disabled
                        ? styles.textInputDisabled
                        : errorText
                        ? styles.textInputError
                        : styles.textInputNormal,
                ]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text
                    style={[
                        styles.dropdownText,
                        !value ? styles.placeholderText : undefined,
                    ]}
                >
                    {value || placeholder || 'Pilih salah satu'}
                </Text>
                <IconOutline
                    name="down"
                    size={18}
                    color={colors.neutralPlaceholder}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    fieldContainer: {
        paddingVertical: 4,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutralSecondaryText,
        paddingVertical: 12,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.greyMin2,
        borderWidth: 0.7,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
    },
    dropdownText: {
        flex: 1,
        fontSize: 16,
        color: colors.neutralMainText,
    },
    placeholderText: {
        color: colors.neutralPlaceholder,
    },
    textInputNormal: {
        borderColor: colors.greyMin2,
    },
    textInputError: {
        borderColor: colors.redRubyPlus1,
        borderWidth: 1,
    },
    textInputDisabled: {
        backgroundColor: colors.neutralDisabledBg,
    },
});

export default DropdownField;
