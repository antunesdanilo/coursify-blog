import React from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../static/logo-coursify-w.png')} />
      <Text style={styles.text}>
        O Coursify.me é uma plataforma de ensino à distância, onde qualquer
        pessoa ou empresa pode construir seu EAD e vender cursos pela Internet.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://coursify.me')}>
        <Text style={styles.button}>Quero conhecer a plataforma!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL('http://www.daniloantunes.dev.br')}>
        <Text style={styles.copyright}>
          Desenvolvido por @DaniloAntunes - 2022 ©
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1ABC9C',
    alignItems: 'center',
    padding: 25,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFA900',
    color: 'white',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  copyright: {
    backgroundColor: '#AAA',
    color: 'white',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default Footer;
