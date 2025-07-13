import React, {forwardRef, memo, RefObject, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    Animated,
    StyleProp,
    ViewStyle,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Colors from "@themes/colors.ts";
import {IconOutline} from "@ant-design/icons-react-native";
import LoggingUtils from "@utils/logging.utils.ts";

const DEFAULT_DURATION = 3000;
const DEFAULT_DURATION_FADE = 300;
const initialState = {
    message: '',
    onPress: () => null,
    duration: DEFAULT_DURATION,
    buttonTitle: '',
    flexDirection: 'row',
    containerStyle: {},
    isHideCloseButton: false,
} as IGuardedToastOption;

const GuardedToast = memo(forwardRef((props, ref) => {

    const [option, setOption] = useState<IGuardedToastOption>(initialState);
    const {
        onPress,
        duration = DEFAULT_DURATION,
        message,
        buttonTitle,
        flexDirection,
        containerStyle,
        isHideCloseButton =  false,
    } = option;
    const bottom = 0;
    const popAnim = useRef(new Animated.Value(bottom)).current;

    useEffect(function popToast() {
        option.message && popIn();
    }, [option]);

    const popIn = () => {
        Animated.timing(popAnim, {
            toValue: 1,
            duration: DEFAULT_DURATION_FADE,
            useNativeDriver: true,
        }).start(() => popOut());
    };

    useImperativeHandle(ref, () => ({
        showToast: (_option: IGuardedToastOption) => {
            if (_option?.message) {
                setOption({...option, ..._option});
            }
        },
    }));

    const setStateToInitial = () => {
        setOption(initialState);
    };

    const popOut = () => {
        setTimeout(() => {
            Animated.timing(popAnim, {
                toValue: bottom,
                duration: DEFAULT_DURATION_FADE,
                useNativeDriver: true,
            }).start(() => setStateToInitial());
        }, duration - DEFAULT_DURATION_FADE);
    };

    const instantPopOut = () => {
        setStateToInitial();
        Animated.timing(popAnim, {
            toValue: bottom,
            duration: DEFAULT_DURATION_FADE,
            useNativeDriver: true,
        }).start();
    };

    if (!message) {
        LoggingUtils.warn('You pass empty message to the Guarded Toast component');
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    opacity: popAnim,
                },
                containerStyle
            ]}
        >
            <View
                style={[styles.toastContentWrapper, {flexDirection: flexDirection ?? 'row'}]}
            >
                <View style={styles.toastContent}>
                    <Text style={styles.toastText}>
                        {message}
                    </Text>
                </View>
                {isHideCloseButton ?
                    <></> :
                    buttonTitle ? (
                        <View style={{marginTop: flexDirection === 'column' ? 8 : 0}}>
                            <TouchableOpacity
                                onPress={onPress ? onPress : instantPopOut}
                            >
                                <Text style={styles.buttonTitle}>
                                    {buttonTitle}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.closeButtonSection}
                            onPress={instantPopOut}>
                            <View style={{marginLeft: 8}}>
                                <IconOutline
                                    name='close'
                                    color={Colors.neutralSecondaryText}
                                    size={18}/>
                            </View>
                        </TouchableOpacity>
                    )}
            </View>
        </Animated.View>
    );
}), () => true);

GuardedToast.displayName = 'GuardedToast';

const styles = StyleSheet.create({
    toastContainer: {
        left: 16,
        right: 16,
        bottom: 16,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 50,
    },
    toastContentWrapper: {
        backgroundColor: Colors.neutralMainText,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
    },
    toastContent: {flex: 1},

    toastText: {
        fontSize: 14,
        color: Colors.neutralWhite,
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.royalBlueMin1
    },
    closeButtonSection: {marginLeft: 8, width: 28, height: 28, justifyContent: 'center'}
});

export type IGuardedToastOption = {
    message: string;
    duration?: number;
    onPress?: () => void;
    buttonTitle?: string;
    flexDirection?: 'row' | 'column';
    containerStyle?: StyleProp<ViewStyle>;
    isHideCloseButton?: boolean;
};

export type IGuardedToast = {
    showToast: (option: IGuardedToastOption) => void;
}

export type IAllowedGuardedToast = IGuardedToast | null;

export type GuardedToastRefType = (typeof GuardedToast & IAllowedGuardedToast);

export type GuardedToastRefObject = RefObject<GuardedToastRefType | null>

export type TToastDuration = 'veryLong' | 'long' | 'short' | 'veryShort';

export const ToastDuration: {
    [K in TToastDuration]: number;
} = {
    veryLong: 15000,
    long: 10000,
    short: 5000,
    veryShort: 2000,
};

export default GuardedToast;
