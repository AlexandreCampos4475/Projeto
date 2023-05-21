import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Energia = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [potenciaNominal, setPotenciaNominal] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [horasUso, setHorasUso] = useState('');
  const [resultadoEnergia, setResultadoEnergia] = useState('');
  const [recomendadaEnergia, setRecomendadaEnergia] = useState('');
  const [resultadoFinal, setResultadoFinal] = useState(0);
  const [getFinalResult, setGetFinalResult] = useState(0);
  const [getpotenciarecomandada, setGetpotenciarecomendada] = useState(0);

  const handleAddItem = async() => {
    if (!item || !potenciaNominal || !quantidade || !horasUso) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
  

    const newItem = {
      item,
      potenciaNominal: Number(potenciaNominal),
      quantidade: Number(quantidade),
      horasUso: Number(horasUso),
    };
    setItems([...items, newItem]);
    setItem('');
    setPotenciaNominal('');
    setQuantidade('');
    setHorasUso('');
    handleEnergia([...items, newItem]); // adiciona o novo item ao cálculo de energia
    handleResultadoFinal([...items, newItem]); // adiciona o novo item ao cálculo do resultado final
    
  };
  
  
  const handleEnergia = (items) => {
    const potenciaTotal = items.reduce(
      (total, item) => total + item.potenciaNominal * item.quantidade,
      0
    );
    
  
    const potenciaRecomendada = potenciaTotal / 0.75;
    setGetpotenciarecomendada(potenciaRecomendada);
    setResultadoEnergia(<Text style={{ color: 'red' }}>{potenciaTotal} Watts</Text>);
    setRecomendadaEnergia(<Text style={{ color: 'red' }}>{potenciaRecomendada.toFixed(2)} Watts </Text>);

   
  };

  const handleResultadoFinal = async (items) => {
    const resultFinal = items.reduce(
      (total, item) => total + item.potenciaNominal * item.quantidade * item.horasUso,
      0
    );
    const res = await api.post('/itens', {
      item,
      potenciaNominal,
      quantidade,
      horasUso
       
     });
      
        
      
    setGetFinalResult(resultFinal);

   
   
    setResultadoFinal(<Text style={{color: 'red'}}>{resultFinal} Watts/Hora</Text>);
    
  };
  

  useEffect(() => {
  
    AsyncStorage.setItem('resultado', JSON.stringify(getFinalResult));
  }, [getFinalResult]);

  useEffect(() => {
    AsyncStorage.setItem('resultad', JSON.stringify(getpotenciarecomandada));
  }, [getpotenciarecomandada]);
 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Sistemas de reserva/integral de energia residencial/industrial (Onda pura):
        Itens de Consumo de Energia:
      </Text>
      <Text style={styles.texto2}>Digite a descrição do item:</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={item}
        onChangeText={(text) => {
          setItem(text);
        }}
      />
      <Text style={styles.texto3}>Digite a potência Nominal (Watts):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={potenciaNominal}
        onChangeText={(text) => {
          setPotenciaNominal(text);
        }}
      />
      <Text style={styles.texto4}>Digite a Quantidade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={quantidade}
        onChangeText={(text) => {
          setQuantidade(text);
        }}
      />
      <Text style={styles.texto6}>Digite as Horas de uso:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={horasUso}
        onChangeText={(text) => {
          setHorasUso(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Adicionar outro item</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button5, { marginTop: 10 }]} onPress={() => navigation.navigate('CalculoDimensionamento')}>
        <Text style={styles.buttonText1}>Avançar</Text>
      </TouchableOpacity>
      {resultadoEnergia ? (
        <Text style={styles.resultadoEnergia}>
          Potência mínima do inversor: {resultadoEnergia}
        </Text>
      ) : null}

{recomendadaEnergia ? (
        <Text style={styles.resultadoEnergia}>
          Potência Recomendada do Inversor : {recomendadaEnergia}
        </Text>
      ) : null}
      {resultadoFinal ? (
        <Text style={styles.resultadoEnergia}>
          Potência Total todos items : {resultadoFinal}
        </Text>
      ) : null}

{items.map((item, index) => (
  <Text key={index} style={styles.resultadoEnergia}>Item {index + 1}: <Text style={{ color: 'red' }}>{item.item}</Text></Text>
))}

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
  resultadoEnergia:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  texto1: {
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
  
  export default Energia;

