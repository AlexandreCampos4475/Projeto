import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';


export default function Inicio({navigation}) {
  return (

  
    <View style={styles.container}>

<Image
    source={require('../assets/logo.png')}
    />
    <Text style={styles.text}>Dimensionamento OFF-GRID Fotovoltaico para Motobombas e Residencial/Industrial</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonLogar} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText} >Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCriarConta} onPress={()=> navigation.navigate('SignUpPage')}>
        <Text style={styles.buttonText} >Criar Conta</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
},
text: {
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center', // Adicionando alinhamento de texto centralizado
  marginHorizontal: 16, // Ajustando margem horizontal
},
buttonContainer: {
  position: 'absolute',
  bottom: 32,
  flexDirection: 'row',
},
buttonLogar: {
  backgroundColor: 'black',
  paddingVertical: 20,
  paddingHorizontal: 50, // Ajustando padding horizontal
  borderRadius: 8,
  marginHorizontal: 8,
},
buttonCriarConta: {
  backgroundColor: 'red',
  paddingVertical: 20,
  paddingHorizontal: 50, // Ajustando padding horizontal
  borderRadius: 8,
  marginHorizontal: 8,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
});
