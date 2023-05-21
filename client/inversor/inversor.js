import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert} from 'react-native';
import api from '../api/axios';
const InversorScreen = ({navigation}) => {
  const [unidadePotencia, setUnidadePotencia] = useState('KW');
  const [potenciaMotor, setPotenciaMotor] = useState('');
  const [fatorPotencia, setFatorPotencia] = useState('');
  const[resultbd, setreltbd]= useState('');
  const [resultado, setResultado] = useState('')

  const calcularInversor = async() => {
    if (potenciaMotor && fatorPotencia) {
      let potencia = Number(potenciaMotor);
      if (unidadePotencia === 'CV') {
        potencia = potencia * 0.735499;
      } else if (unidadePotencia === 'HP') {
        potencia = potencia * 0.7457;
      }
      const potenciaAparente = (potencia) * (1 + (1 - fatorPotencia));
      const resultadoFormatado = potenciaAparente.toFixed(2);
      setreltbd(resultadoFormatado);
      setResultado(<Text style={{ color: 'red' }}>{resultadoFormatado}KW</Text>);
  
      const res = await api.post('/inversor', {
        unidadePotencia,
        potenciaMotor,
        fatorPotencia
        
      });
      
    }
  
  };
  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Calculo do inversor de Frequência (Onde Quadrada) de acordo com a potência do motor:</Text>
      <Text style={styles.titulo2}>Escolha o tipo de grandeza do Motor (referente a potência)</Text>
      <Picker
  selectedValue={unidadePotencia}
  onValueChange={(itemValue) => setUnidadePotencia(itemValue)}
  style={{ width: 350 }}
  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
>
<Picker.Item label="" value="" />
  <Picker.Item label="CV" value="CV" />
  <Picker.Item label="HP" value="HP" />
  <Picker.Item label="KW" value="KW" />
</Picker>
      <Text style={styles.titulo3}>Digite a Potência do Motor</Text>
      <TextInput
        style={styles.input}
        value={potenciaMotor}
        onChangeText={(valor) => setPotenciaMotor(valor)}
        placeholder="Potência do motor"
        keyboardType="numeric"
      />

  
      <Text style={styles.titulo2}>Digite o fator de Potência.(Em fração) :</Text>
      <TextInput
        style={styles.input}
        value={fatorPotencia}
        onChangeText={(valor) => setFatorPotencia(valor)}
        placeholder="Fator de Potência"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={calcularInversor}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado ? (
        <Text style={styles.resultado}>
          A potência do Inversor em KW onda quadrada é igual a: {resultado}
        </Text>
      ) : null}

      <Text style={styles.textoresul}>
        Obs: A potência do inversor vai ser maior que a potência do Motor, sendo que, foi considerado o fator de potência do Motor.
      </Text>
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

export default InversorScreen;