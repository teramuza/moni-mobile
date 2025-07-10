import React from 'react';
import {StatusBar as RNStatusBar, StatusBarStyle, View} from 'react-native';
import {isIOS} from '@utils/platform.utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors, {IColors} from 'themes/colors';

interface Props {
    barColor?: IColors;
    barStyle?: StatusBarStyle;
}

const StatusBar: React.FC<Props> = ({barColor, barStyle = 'light-content'}) => {
    const backgroundColor = Colors[barColor ?? 'bluePurplePlus2'];

    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;

    return (
        <>
            <RNStatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
            {isIOS() && (
                <View
                    style={{
                        backgroundColor: backgroundColor,
                        height: statusBarHeight,
                    }}
                />
            )}
        </>
    );
};

export default StatusBar;
