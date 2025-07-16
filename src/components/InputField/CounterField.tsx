import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import colors from '@themes/colors';

interface Props {
    label: string;
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
}

const CounterField: React.FC<Props> = ({
    label,
    value,
    onIncrease,
    onDecrease,
    min,
    max,
}) => {
    const canDecrease = min === undefined || value > min;
    const canIncrease = max === undefined || value < max;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.counterContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.circleButton,
                        !canDecrease && styles.disabledButton,
                        pressed && canDecrease && styles.buttonPressed,
                    ]}
                    onPress={canDecrease ? onDecrease : undefined}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !canDecrease && styles.disabledText,
                        ]}
                    >
                        –
                    </Text>
                </Pressable>

                <Text style={styles.value}>{value}</Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.circleButton,
                        !canIncrease && styles.disabledButton,
                        pressed && canIncrease && styles.buttonPressed,
                    ]}
                    onPress={canIncrease ? onIncrease : undefined}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !canIncrease && styles.disabledText,
                        ]}
                    >
                        +
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const CIRCLE_SIZE = 36;

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
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    circleButton: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: '#EEF3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#DCE6FF',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3478F6',
    },
    disabledButton: {
        backgroundColor: '#F2F2F2',
    },
    disabledText: {
        color: colors.neutralPlaceholder,
    },
    value: {
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '500',
        color: colors.neutralMainText,
        minWidth: 24,
        textAlign: 'center',
    },
});

export default CounterField;
