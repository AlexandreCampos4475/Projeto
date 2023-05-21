import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Primeira = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha abaixo um tipo de necessidade:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InversorScreen')}
         >
        <Text style={styles.buttonText}  >Inversor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('Moto_bomba')} // modificar essa linha
      >
        <Text style={styles.buttonText2}>Moto Bomba</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button3}
        onPress={() => navigation.navigate('Usina')} // modificar essa linha
      >
        <Text style={styles.buttonText3}>Usina</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button4}
        onPress={() => navigation.navigate('Energia')} // modificar essa linha
      >
        <Text style={styles.buttonText4}>Energia Industrial/Residêncial</Text>
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
  titulo:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    height: 70,
    marginBottom: 16,
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
  button2: {
    width: '100%',
    height: 70,
    marginBottom: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button3: {
    width: '100%',
    height: 70,
    marginBottom: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button4: {
    width: '100%',
    height: 70,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText4: {

    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Primeira;