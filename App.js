import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import Home from './components/Home';
import About from './components/About';
import Order from './components/Order';
import Kitchen from './components/Kitchen';
import Cart from './components/Cart';
import ValueProvider from './components/ValueContext'
import ScreenTemplate from './containers/ScreenTemplate';

const Stack = createNativeStackNavigator();

const App = () => {
  const data = {currOrder: [], queue: []};

  return (
    <ValueProvider value = {data}>
      <ScreenTemplate footer={<Text  style={{fontSize:32}}>this is the footer </Text>} >
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Kitchen" component={Kitchen} />

          </Stack.Navigator>
        </NavigationContainer>
      </ScreenTemplate>
    </ValueProvider>
  );
}

export default App;
