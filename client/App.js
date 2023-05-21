import * as React from 'react';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './telas/inicial';
import LoginPage from './telas/login';
import SignUpPage from './telas/criar_conta';
import Primeira from './Escolha/Escolhas';
import Usina from './Usina/usina';
import Moto_bomba from './MotoBomba/motobomba';
import InversorScreen from './inversor/inversor';
import BombaSuperficie from './MotoBomba/bomba_superficie';
import BombaSubmersa from './MotoBomba/bomba_submersa';
import Energia from './Energia_I_E/energia';
import CalculoDimensionamento from './Energia_I_E/calculo1';
import Pagina from './MotoBomba/instrucoessub';
import PaginaSup from './MotoBomba/instrucoessuper';
import TamanhoUsina from './Energia_I_E/calculo2';
import calculofinal from './Energia_I_E/resultado';
import CalculoFinal from './Energia_I_E/resultado';


const Stack = createStackNavigator();
function App() {
  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true)
    return () => BackHandler.removeEventListener('backPress', () => true)
  }, [])

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage"  component={LoginPage}  options={{  headerStyle:{backgroundColor:'#f5f5f5'} }}/>
        <Stack.Screen name="SignUpPage" component={SignUpPage}  options={{ headerStyle:{backgroundColor:'#f5f5f5'}} }/>
        <Stack.Screen name = "Primeira" component={Primeira} options={{ headerShown: false }} />
        <Stack.Screen name = "InversorScreen" component={InversorScreen}options={{headerTitle:'Inversor'}} />
        <Stack.Screen name = "Usina" component={Usina} />
        <Stack.Screen name = "Moto_bomba" component={Moto_bomba}options={{headerTitle:'Moto Bomba'}} />
        <Stack.Screen name="BombaSuperficie" component={BombaSuperficie} />
        <Stack.Screen name="BombaSubmersa" component={BombaSubmersa} />
        <Stack.Screen name="Energia" component={Energia} />
        <Stack.Screen name="CalculoDimensionamento" component={CalculoDimensionamento} />
       <Stack.Screen name='Pagina' component={Pagina} />
       <Stack.Screen name= 'PaginaSup' component={PaginaSup}/>
       <Stack.Screen name= 'TamanhoUsina' component={TamanhoUsina}/>
      <Stack.Screen name = 'CalculoFinal' component={CalculoFinal}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
 