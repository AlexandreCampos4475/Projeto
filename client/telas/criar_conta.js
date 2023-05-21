
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View,Text,TextInput,TouchableOpacity, StyleSheet} from 'react-native';

import api from '../api/axios';

const SignUpPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [nome, setnome] = useState('');
  const [telefone, settelefone] = useState(''); // criando as variaveis para receber os valores
  const [cpf, setcpf] =useState('');
  const [senha, setSenha] = useState('');
 
  const handleSignUp = async () => {

    if (!nome || !cpf || !validateEmail(email) || !senha || !telefone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const res = await api.post('/register', {
      email,
      nome,
      telefone,
      cpf,
      senha
    });

    if(res.data.status === false) {
      alert('Não foi possível realizar o cadastro!');
    } 
    else {
      navigation.navigate('LoginPage');
    }

  }

  const handleEmailChange = (emailValue) => {
    setEmail(emailValue);
  };

  const validateEmail = (emailValue) => {
    // Verifica se o valor inserido é um endereço de e-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleBlur = () => {
    if (!validateEmail(email)) {  
      alert('Por favor, insira um endereço de e-mail válido');
    }
  };

  return (

    
    <View style={styles.container}>
     <Text ></Text>
     <Text ></Text>
     
      <Text style={styles.title}>Vamos registrar</Text>
      <Text style={styles.title1}>sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"              //placeholder serve para escolher nome que vai ser mostrado dentro do imput
        value={nome}
                           // criando os texto imnput de acordo com as variaveis criadas acima
        onChangeText={setnome}         // para os usuarios digitarem
      />                               
       <TextInput                       // onchange permite a chamada da funcao toda vez que o texto é alterado
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setcpf}
      />
      <TextInput 
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={handleBlur}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
      />

<TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        keyboardType="phone-pad"
        onChangeText={settelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText} >Criar conta</Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
      <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Já tem uma conta?</Text>
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  title1: {
    alignSelf: 'flex-start',
    color: 'red',
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
    height: 68,
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

export default SignUpPage;