import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



const Moto_bomba = ({navigation}) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cálculo do Dimensionamento de Motobombas (MCA):</Text>

      <Text style={styles.titulo1}>Escolha o tipo de Bomba :</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BombaSuperficie')}
      >
        <Text style={styles.buttonText}>Bomba de Superfície MCA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('BombaSubmersa')}
      >
        <Text style={styles.buttonText2}
        
        >Bomba Submersa MCA</Text>
      </TouchableOpacity>

      <Text style={styles.titulo2}>Obs: (MCA) Metro de Coluna de Água.</Text>

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  titulo1:{
    alignSelf: 'flex-start',
    fontSize: 24,
   
    marginBottom: 24,

  },
  titulo2:{
    alignSelf: 'flex-start',
    fontSize: 24,
   
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
  }
});

export default Moto_bomba;