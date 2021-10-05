import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const Cart = () => {
  return (
    <View>
      <Text>The current order goes here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;
