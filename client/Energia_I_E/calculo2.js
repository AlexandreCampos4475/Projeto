import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TamanhoUsina = () => {
  const navigation = useNavigation();
  const [horasSol, setHorasSol] = useState('');
  const [resultado, setResultado] = useState('');
  const [potenciaBateria, setPotenciaBateria] = useState(0);
  const [getpassandofinal, setGetPassandofinal] = useState(0);

  useEffect(() => {
    const retrieveBruteData = async () => {
      try {
        const recieveBruteData = await AsyncStorage.getItem('resultado');
        setPotenciaBateria(JSON.parse(recieveBruteData));
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBruteData();
  }, []);


  const calcularTamanhoUsina = async () => {
    if (horasSol) {
      const potenciaUsina = (((potenciaBateria / horasSol)/0.8)*2);
      const resultadoFormatado = potenciaUsina.toFixed(2);

       setGetPassandofinal(resultadoFormatado);
      setResultado(<Text style={{ color: 'red' }}>{resultadoFormatado} KW</Text>);
      console.log(resultadoFormatado);

      const res = await api.post('/tamanhousina', {
       horasSol
         
       });
       
    }
  };
  useEffect(() => {
    const storeResult = async () => {
      try {
        await AsyncStorage.setItem('resultados', JSON.stringify(getpassandofinal));
      } catch (error) {
        console.log(error);
      }
    };
    storeResult();
  }, [getpassandofinal]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculo do Tamanho da Usina Fotovioltaico:</Text>
      <Text style={styles.titulo2}>Digite as Horas de Sol da Média do Brasil (1-5):</Text>
      <Picker
        selectedValue={horasSol}
        onValueChange={(itemValue) => setHorasSol(itemValue)}
        style={{ width: 350 }}
        itemStyle={{ backgroundColor: 'grey', color: 'blue', fontFamily: 'Ebrima', fontSize: 17 }}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>
      <TouchableOpacity style={[styles.button, { marginTop: 40 }]} onPress={calcularTamanhoUsina}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => navigation.navigate('CalculoFinal')}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
      <Text style={styles.textoresul}>Obs:</Text>
      {resultado ? <Text style={styles.resultado}>Tamanho da Usina: {resultado}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  titulo2:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  titulo3:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultado: {
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 70,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textoresul: {
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,

  },
});

export default TamanhoUsina;