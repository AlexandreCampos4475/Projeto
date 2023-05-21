import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Pagina = () => {
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View>
      <Text style={styles.Text1}>O nível dinâmico é o nível da água quando a bomba está em operação é onde a água do poço ficara quando a bomba estiver jogando água para fora da tubulação. Caso não saiba o nível dinâmico colocar a profundidade da bomba quando a mesma foi instalada.</Text>
      <Text style={styles.Text2}>A altura de recalque representa o desnível do local da motobomba onde foi instalada e, o ponto mais alto onde a água sera levada. Resumidamente é a altura na vertical em metros de onde a motoboma está e o ponto mais alto onde a água sera levada.</Text>
      <Text style={styles.Text3}>O comprimento total da tubulação é desde a encanação utilizada para fazer a capitação da água até a encanação utilizada para levar a água ao reservatório.</Text>
      <Text style={styles.Text4}>A perda de carga é representada de acordo com a tabela, pois, ela representa a vazão desejada em metros cúbicos (1m³/h = 1000L/h) e, a encanação que terá que ser utilizada quanto maior a encanação menor é a perda de carga (perda de carga é a resistência da água ao ser transportada na tubulação).</Text>
    </View>
    </ScrollView>
  );
}

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
        fontSize: 20,
        marginBottom: 10,
    },
    Text2:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
    Text3:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
    Text4:{
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        fontSize: 20,
        marginBottom: 10,
    },
});

export default Pagina;