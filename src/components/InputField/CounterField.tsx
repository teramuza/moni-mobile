import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import colors from '@themes/colors';

interface Props {
    label: string;
    value: number;
    onChange: (newCounter: number) => void;
    min?: number;
    max?: number;
}

const CounterField: React.FC<Props> = ({
    label,
    value,
    onChange,
    min = 0,
    max,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(String(value));

    const handleChangeText = (text: string) => {
        if (/^\d*$/.test(text)) {
            setTempValue(text);
            const num = parseInt(text || '0', 10);
            if (!isNaN(num)) {
                if (max !== undefined && num > max) return;
                if (num >= min) onChange(num);
            }
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        setTempValue(String(value)); // reset if invalid
    };

    const handleIncrement = () => {
        if (max === undefined || value < max) {
            onChange(value + 1);
            setTempValue(String(value + 1));
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
            setTempValue(String(value - 1));
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.inputContainer}>
                    <Pressable
                        onPress={handleDecrement}
                        style={styles.roundButton}
                    >
                        <Text style={styles.sign}>−</Text>
                    </Pressable>

                    {isEditing ? (
                        <TextInput
                            style={[styles.counterText, styles.inputText]}
                            value={tempValue}
                            keyboardType="numeric"
                            onChangeText={handleChangeText}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <Pressable onPress={() => setIsEditing(true)}>
                            <Text style={styles.counterText}>{value}</Text>
                        </Pressable>
                    )}

                    <Pressable
                        onPress={handleIncrement}
                        style={styles.roundButton}
                    >
                        <Text style={styles.sign}>+</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutralSecondaryText,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        gap: 12,
    },
    roundButton: {
        backgroundColor: colors.neutralSecondaryBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    sign: {
        fontSize: 18,
        color: colors.royalBlue,
    },
    counterText: {
        fontSize: 18,
        minWidth: 40,
        textAlign: 'center',
        color: colors.neutralMainText,
    },
    inputText: {
        borderBottomWidth: 1,
        borderColor: colors.neutralBorder20,
    },
});

export default CounterField;
