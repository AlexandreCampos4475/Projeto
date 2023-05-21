import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../api/axios';

const LoginPage = ({navigation}) => {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');   // mesma coisa da pagina criar conta

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    

    const res = await api.post('/login', {
      email,
      senha
    });

    if(res.data.status === false) {
      alert("Dados inválidos!");
    } else {
navigation.navigate('Primeira');
    }

    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta</Text>
      <Text style={styles.title2}>Bem vindo,</Text>
      <Text style={styles.title3}>sentimos sua falta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
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
     onPress={handleLogin}
     >
  <Text style={styles.buttonText}>Entrar</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
      <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Cria nova conta</Text>
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
    color:'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  title2: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  title3: {
    alignSelf: 'flex-start',
    fontSize: 20,
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

export default LoginPage;