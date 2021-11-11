import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet, View, Button } from 'react-native';

import Home from './components/Home';
import About from './components/About';
import Order from './components/Order';
import Kitchen from './components/Kitchen';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ValueProvider from './components/ValueContext'
import ScreenTemplate from './containers/ScreenTemplate';

const Stack = createNativeStackNavigator();

const App = () => {
  const data = {currOrder: [], queue: [], tableNum: null};

  return (
    <ValueProvider value = {data}>
      <ScreenTemplate header={<Header />} >
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Kitchen" component={Kitchen} />
            <Stack.Screen name="Footer" component={Footer} />

          </Stack.Navigator>
        </NavigationContainer>
      </ScreenTemplate>
    </ValueProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  // header: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   paddingTop: 10
  // }
});
