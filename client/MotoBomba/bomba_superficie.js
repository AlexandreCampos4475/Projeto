import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Linking} from 'react-native';
import api from '../api/axios';

const BombaSuperficie = () => {
  const navigation = useNavigation();
 
  const [alturasuccao, setalturasuccao] = useState('');
  const [alturarecalque, setalturarecalque] = useState('');
  const [comprimentototal, setcomprimentototal] = useState('');
  const [perdacarga, setperdacarga] = useState('');
  const [resultado, setresultado] = useState('');
   const[tipo_bomba, setbomba]=useState("Bomba de Superficie MCA");
  
  const [nivel_dinamic, setniveldinamico]=useState(0);

  const handleLinkPress = () => {
    Linking.openURL('https://drive.google.com/file/d/1K7h9Iz6dWmD6N78gj4ptKkybrfDUXMJG/view?usp=sharing');
  };

  const handlsuperficie =  async() => {
    
   
    if (!alturasuccao || !alturarecalque || !comprimentototal || !perdacarga) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
          
         
    const alturaMonometricaTotal = parseFloat(alturasuccao) + parseFloat(alturarecalque) + ( parseFloat(comprimentototal) * parseFloat(perdacarga)) / 100 * 1.10;
           setresultado(<Text style={{ color: 'red' }}>{alturaMonometricaTotal.toFixed(2)} Metros</Text>); 



           const res = await api.post('/moto_bomba', {
            tipo_bomba,
            nivel_dinamic,
            alturarecalque,
            alturasuccao,
            comprimentototal,
            perdacarga
            
          });
        
    
      };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
  Calculo de Altura Monumétrica Total (AMT) Bomba de Superficie MCA:
    <Text style = {{color:'blue', fontWeight:'bold'}}onPress={() => navigation.navigate('PaginaSup')}>Instruções de cada termo</Text>

</Text>

      <Text style={styles.titulo1}>Digite a Altura de Sucção:</Text>
      <TextInput
        style={styles.input}
        value={alturasuccao}
        onChangeText={setalturasuccao}
        placeholder="metros"
        keyboardType="numeric"
      />
      <Text style={styles.titulo2}>Digite a Altura de Recalque:</Text>
      <TextInput
        style={styles.input}
        value={alturarecalque}
        onChangeText={setalturarecalque}
        placeholder="metros"
        keyboardType="numeric"
      />
      <Text style={styles.titulo3}>Digite o Comprimento Total da Tubulação:</Text>
      <TextInput
        style={styles.input}
        value={comprimentototal}
        onChangeText={setcomprimentototal}
        placeholder="metros"
        keyboardType="numeric"
      />

      <Text style={styles.titulo4}>Digite a Perda de Carga: 
        <Text style = {{color: 'blue', fontWeight: 'bold', fontSize: 20}}onPress={handleLinkPress}>Baixar Tabela</Text>
    
      </Text>
      <TextInput
        style={styles.input}
        value={perdacarga}
        onChangeText={setperdacarga}
        placeholder="porcentagem"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handlsuperficie}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {resultado ? <Text style={styles.resultado}>Altura Monométrica Total: {resultado}</Text> : null}
    </ScrollView>
  );
};
        //Altura Monométrica Total:

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
  titulo1:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
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
  titulo4:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  resultado1:{
    alignSelf: 'flex-start',
    justifyContent:'space-between',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 18,
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
});

export default BombaSuperficie;