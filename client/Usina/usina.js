import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import api from '../api/axios';

const Usina = () => {
  const [tensaoMaxima, setTensaoMaxima] = useState('');
  const [tensaoSemFuncionamento, setTensaoSemFuncionamento] = useState('');
  const [correnteDoModulo, setCorrenteDoModulo] = useState('');
  const [correnteFuncionamento, setCorrenteFuncionamento] = useState('');
  const [qtdSerie, setQtdSerie] = useState('');
  const [qtdPlaca, setQtdPlaca] = useState('');

  const handleUsina = async () => {
    if (!tensaoMaxima ||!tensaoSemFuncionamento || !correnteDoModulo|| !correnteFuncionamento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newQtdPlaca = tensaoMaxima /tensaoSemFuncionamento;


    setQtdPlaca(<Text style={{ color: 'red' }}>{newQtdPlaca.toFixed(4)}</Text>);


    const newQtdSerie = (correnteFuncionamento * 1.51)/correnteDoModulo;
    const resultadoFormatado = newQtdSerie.toFixed(4);
    
    setQtdSerie(<Text style={{ color: 'red' }}>{resultadoFormatado}</Text>);

    const res = await api.post('/usina', {
      tensaoMaxima, 
      tensaoSemFuncionamento,
      correnteDoModulo,
      correnteFuncionamento
      
    });
    if(res.data.status === true) {
      console.log('teste:',qtdPlaca);
    } else {
      alert("Vish");
    }
  
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Cálculo do Tamanho da Usina Fotovoltaica para o Motor:
      </Text>
      <Text style={styles.texto2}>
        Digite a tensão máxima de entrada do inversor:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="VDC"
        keyboardType="numeric"
        value={tensaoMaxima}
        onChangeText={setTensaoMaxima}
      />
      <Text style={styles.texto3}>
        Digite a tensão sem funcionamento do módulo fotovoltaico:
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="VDC"
        value={tensaoSemFuncionamento}
        onChangeText={setTensaoSemFuncionamento}
      />
      <Text style={styles.texto4}>
        Digite a corrente em funcionamento do módulo fotovoltaico:
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="(A) Corrente"
        value={correnteDoModulo}
        onChangeText={setCorrenteDoModulo}
      />
      <Text style={styles.texto6}>
        Digite a corrente de funcionamento do motor:
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="(A) Corrente"
        value={correnteFuncionamento}
        onChangeText={setCorrenteFuncionamento}
      />
      <TouchableOpacity style={styles.button} onPress={handleUsina}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {qtdPlaca ? (
        <Text style={styles.resultado}>A quantidade de placas por série é igual a: {qtdPlaca}
        </Text>
      ) : null}
      {qtdSerie ? (
        <Text style={styles.resultado2}>A quantidade de séries que vai precisar em Paralelo é igual a : {qtdSerie}
        </Text>
      ) : null}
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
    texto1:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
    texto2:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
    texto3:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
    texto4:{
        alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
      },
      texto5:{
        alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
      },
      texto6:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
      },
      resultado2:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
      },
      resultado:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
      },
    
    title: {
      alignSelf: 'flex-start',
      justifyContent:'space-between',
      fontSize: 24,
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
  });
  
  export default Usina;