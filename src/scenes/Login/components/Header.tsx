import React from 'react';
import Colors from '@themes/colors';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '@images';

const Header: React.FC = () => (
  <View style={styles.headerContainer}>
    <Image source={images.MoniAppLogo} style={styles.logo} />
    <Text style={styles.title}>Masuk untuk memulai</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.bluePurplePlus2,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    paddingBottom: 62,
  },
  logo: {
    width: 92,
    resizeMode: 'contain',
    marginVertical: 6,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
    maxWidth: 200,
    marginVertical: 4,
  },
});

export default Header;
