// TODO: change this to Order?
// TODO: Add maybe an accordian list based on the categories (single roll, house sepcial, etc)

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, Button } from 'react-native';
import SushiMenu from '../assets/menu';
import MenuItem from './MenuItem';

const sushiMenu = SushiMenu();
const DATA = sushiMenu.map((x) => {
  return(x)
})

const Order = ({navigation}) => {
  const renderCategory = ({item}) => (
    <View>
      <MenuItem category = {item.category}
            items = {item.items} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sushi Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a roll"
      />
      <FlatList
        data={DATA}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  sushiTitle: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Order;
