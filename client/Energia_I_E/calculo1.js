import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import { TabRouter, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import api from '../api/axios';
const CalculoDimensionamento = () => {
  const navigation = useNavigation();
  const [quantidadedias, setquantidadedias] = useState('');
  const [profundidade, setprofundidade] = useState('');
  const [eficiencia, seteficiencia] = useState('');
  const[resultadodi,setresultadodi]=useState('');
  const [valorPassado, setValorPassado] = useState(0);
  const[getpotenciabateria,setGetPotenciabateria]= useState(0);
  const[contagem, setcontagem] = useState(0);

  useEffect(() => {
    const retrieveBruteData = async () => {
      try {
        const recieveBruteData = await AsyncStorage.getItem('resultado');
        setValorPassado(JSON.parse(recieveBruteData));
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBruteData();
  }, []);

  const handlcalculodimensionamento= async() => {

    if (!quantidadedias || !profundidade|| !eficiencia) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

  const autonomia = valorPassado * quantidadedias;
  
  const potenciabanco = autonomia / (profundidade / 100);

  const potenciatotal = potenciabanco/ (eficiencia/100);

  setGetPotenciabateria(potenciatotal);
    setresultadodi(<Text style ={{color: 'red'}}>{potenciatotal.toFixed(2)} Watts/Hora</Text>)

    const res = await api.post('/dimensionamento', {
     quantidadedias,
     profundidade,
     eficiencia
      
    });
    
  
   
  };

  
  useEffect(() => {
    const storeResult = async () => {
      try {
        await AsyncStorage.setItem('resultado', JSON.stringify(getpotenciabateria));
      } catch (error) {
        console.log(error);
      }
    };
    storeResult();
  }, [getpotenciabateria]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
      Sistemas de reserva/integral de energia residêncial/industrial (Onda pura): Dimensionamento da Bateria:
      </Text>
      <Text style={styles.texto2}>Digite a quantidade de dias de autonomia: </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={quantidadedias}
        onChangeText={setquantidadedias}
      />
      <Text style={styles.texto3}>Digite a Profundidade de Descarga (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={profundidade}
        onChangeText={setprofundidade}
      />
      <Text style={styles.texto4}>Digite a Eficiência (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={eficiencia}
        onChangeText={seteficiencia}
      />
      <TouchableOpacity style={styles.button} onPress={handlcalculodimensionamento}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('TamanhoUsina')} style={[styles.button5, { marginTop: 10 }]}>
    <Text style={styles.buttonText1}  onPress={() => navigation.navigate('TamanhoUsina')}>Avançar</Text>
    
  </TouchableOpacity>
  {resultadodi? <Text style={styles.resultado}>Potência total da Bateria: {resultadodi}</Text> : null}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  texto1: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  resultado: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto2: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto3: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto4: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto5: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto6: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
    title: {
      alignSelf: 'flex-start',
      justifyContent:'space-between',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 24,
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
    button1: {
        width: '100%',
        height: 70,
        backgroundColor: 'red',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
      },
      button5: {
        width: '100%',
        height: 70,
        backgroundColor: 'red',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
  
  export default CalculoDimensionamento;