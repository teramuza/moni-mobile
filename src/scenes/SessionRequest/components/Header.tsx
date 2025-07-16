import React from 'react';
import Colors from '@themes/colors';
import { StyleSheet, Text, View} from 'react-native';

interface IProps {
    title?: string;
}

const Header: React.FC<IProps> = ({title}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.bluePurplePlus2,
        justifyContent: 'center',
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
