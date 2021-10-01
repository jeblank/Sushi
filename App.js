import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text, } from 'react-native';

import FlexDemo1 from './components/FlexDemo1';
import HomeScreenDemo from './components/HomeScreen_Demo';
import ProfileScreenDemo from './components/ProfileScreen_Demo';

import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Kitchen from './components/Kitchen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Kitchen" component={Kitchen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}




// The parameters of the function are a JSON object here
