import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculoFinal = () => {
  const navigation = useNavigation();

  const [carregamento12, setCarregamento12] = useState('');
  const [carregamento24, setCarregamento24] = useState('');
  const [carregamento48, setCarregamento48] = useState('');

  const [arranjo12, setArranjo12] = useState('');
  const [arranjo24, setArranjo24] = useState('');
  const [arranjo48, setArranjo48] = useState('');

  const [tamanhousina, setgetTamanhousina] = useState(0);
  const [potenciarecomendada, setpotenciarecomendada] = useState(0);

  const [potenciaBateriaResult, setPotenciaBateria] = useState(0);

  useEffect(() => {
    const retrieveTamanhousina = async () => {
      try {
        const recieveBruteData = await AsyncStorage.getItem('resultado');
        setgetTamanhousina(JSON.parse(recieveBruteData));
      } catch (error) {
        console.log(error);
      }
    };
    retrieveTamanhousina();
  }, []);

  useEffect(() => {
    const retrievePotenciaBateria = async () => {
      try {
        const recieveBruteData = await AsyncStorage.getItem('resultados');
        setPotenciaBateria(JSON.parse(recieveBruteData));
      } catch (error) {
        console.log(error);
      }
    };
    retrievePotenciaBateria();
  }, []);

  useEffect(() => {
    const retrievePotenciaRecomendada = async () => {
      try {
        const recieveBruteData = await AsyncStorage.getItem('resultad');
        setpotenciarecomendada(JSON.parse(recieveBruteData));
      } catch (error) {
        console.log(error);
      }
    };
    retrievePotenciaRecomendada();
  }, []);

  const resultadosFinais = () => {
    const carregamento12Val = tamanhousina / 12;
    const carregamento24Val = tamanhousina / 24;
    const carregamento48Val = tamanhousina / 48;

    const arran12 = potenciaBateriaResult / 12;
    const arran24 = potenciaBateriaResult / 24;
    const arran48 = potenciaBateriaResult / 48;

  
    setCarregamento12(`${carregamento12Val.toFixed(2)}Ah.`);
    setCarregamento24(`${carregamento24Val.toFixed(2)}Ah.`);
    setCarregamento48(`${carregamento48Val.toFixed(2)}Ah.`);

    setArranjo12(`${arran12.toFixed(2)}Ah.`);
    setArranjo24(`${arran24.toFixed(2)}Ah.`);
    setArranjo48(`${arran48.toFixed(2)}Ah`);
  };

  useEffect(() => {
    resultadosFinais();
  }, [tamanhousina, potenciaBateriaResult, potenciarecomendada]);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.Text3}>O resultado do seu <Text style={{ color: 'red' }}>Sistema é:</Text></Text>
      <Text style={styles.Text2}>A Potência total da usina fotovoltaica é: {potenciaBateriaResult? (<Text style={{ color: 'red' }}>{potenciaBateriaResult} KW.</Text>) : null}</Text>
      <Text style={styles.Text2}>A Potência total da bateria é: {tamanhousina? (<Text style={{ color: 'red' }}>{tamanhousina} Watts/Hora.</Text>) : null} </Text>
      <Text style={styles.Text2}>A Potência Recomendada do Inversor é: {potenciarecomendada.toFixed(2)? (<Text style={{ color: 'red' }}>{potenciarecomendada.toFixed(2)} Watts.</Text>) : null} </Text>
      <Text style={styles.Text1}>Tensão de Trabalho do Controlador referente ao arranjo das séries de cada bateria:</Text>
      <Text style={styles.Text2}>Carregamento em 12VDC: <Text style={{ color: 'red' }}>{carregamento12}</Text></Text>
      <Text style={styles.Text2}>Carregamento em 24VDC: <Text style={{ color: 'red' }}>{carregamento24}</Text></Text>
      <Text style={styles.Text2}>Carregamento em 48VDC: <Text style={{ color: 'red' }}>{carregamento48}</Text></Text>
      <Text style={styles.Text1}>Arranjo de bateria:</Text>
      <Text style={styles.Text2}>Arranjo em 12VDC: <Text style = {{color:'red'}}>{arranjo12}</Text></Text>
      <Text style={styles.Text2}>Arranjo em 24VDC:<Text style = {{color:'red'}}>{arranjo24}</Text></Text>
      <Text style={styles.Text2}>Arranjo em 48VDC:<Text style = {{color:'red'}}>{arranjo48}</Text></Text>
      <TouchableOpacity style={[styles.button, { margin: 10 }]} onPress={() => navigation.navigate('Primeira')}>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </TouchableOpacity>
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
     Text1:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 25,
        fontWeight:'bold',
        marginBottom: 10,
    },

    Text3:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 30,
        fontWeight:'bold',
        marginBottom: 10,
    },
    Text2:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 24,
       
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
});

export default CalculoFinal;