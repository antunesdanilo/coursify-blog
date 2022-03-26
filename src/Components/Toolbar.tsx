import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {Toolbar as Tool} from 'react-native-material-ui';

const Toolbar: React.FC<{navigation: any; back?: boolean}> = ({
  navigation,
  back = false,
}) => {
  return (
    <View>
      <Tool
        style={toolbarStyles}
        leftElement={
          <View style={styles.leftElement}>
            {back && (
              <IconFontAwesome
                onPress={() => navigation.goBack()}
                style={styles.back}
                name="long-arrow-left"
              />
            )}
            <Image source={require('../../static/logo-2.png')} />
          </View>
        }
        rightElement={
          <View style={styles.iconContainer}>
            <IconEntypo style={styles.icon} name="menu" />
          </View>
        }
      />
    </View>
  );
};

const toolbarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 70,
    paddingHorizontal: 15,
  },
});

const styles = StyleSheet.create({
  leftElement: {
    flexDirection: 'row',
  },
  back: {
    alignSelf: 'center',
    lineHeight: 50,
    fontSize: 22,
    paddingRight: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#3CC6AA',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    color: 'white',
    alignSelf: 'center',
  },
});

export default Toolbar;
