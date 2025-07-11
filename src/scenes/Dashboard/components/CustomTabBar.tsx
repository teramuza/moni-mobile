import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { IconOutline,
} from '@ant-design/icons-react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Colors from "@themes/colors.ts";
import DashboardScene from "@scenes/Dashboard/Dashboard.scene.tsx";

interface Props extends BottomTabBarProps {
    hideTabBar?: boolean;
}

const CustomTabBar = ({state, navigation, hideTabBar}: Props) => {
    if (hideTabBar) return null;

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const icon = route.name === DashboardScene.name
                    ? <IconOutline name='home' style={isFocused ? styles.activeIcon : styles.icon} />
                    : <IconOutline name='team' style={isFocused ? styles.activeIcon : styles.icon} />;

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        onPress={onPress}
                        style={[styles.tabItem]}>
                        <View style={[styles.itemContainer, isFocused && styles.itemContainerSelected]}>
                        {icon}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.neutralWhite,
        borderTopWidth: 1,
        borderTopColor: Colors.neutralBorder,
        height: 75,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainerSelected: {
        backgroundColor: Colors.neutralSecondaryBg,
        borderRadius: 16,
    },
    label: {
        fontSize: 12,
        color: Colors.greyMin1,
    },
    activeLabel: {
        color: '#000',
        fontWeight: '600',
    },
    icon: {
        fontSize: 24,
        color: Colors.bluePurple,
    },
    activeIcon: {
        fontSize: 24,
        color: Colors.bluePurplePlus2,
    },
});


export default CustomTabBar;
