import React from 'react';
import Colors from '@themes/colors';
import { StyleSheet, Text, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { goBack } from '@navigations/Navigation.service.ts';

interface IProps {
    title?: string;
    canBack?: boolean;
}

const Header: React.FC<IProps> = ({ title, canBack }) => {
    const onPressBack = goBack;
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            <View>
                {canBack && (
                    <IconOutline
                        name="close-circle"
                        size={30}
                        color={Colors.neutralWhite}
                        onPress={onPressBack}
                    />
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.bluePurplePlus2,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 24,
        paddingBottom: 35,
    },
    logo: {
        width: 92,
        resizeMode: 'contain',
        marginVertical: 6,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 28,
        maxWidth: 400,
        marginVertical: 4,
    },
});

export default Header;
