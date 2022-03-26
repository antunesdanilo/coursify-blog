import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export interface SplashProps {
  navigation: any;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../static/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default Splash;
