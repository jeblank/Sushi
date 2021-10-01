// TODO: change this to Order?
// TODO: Add maybe an accordian list based on the categories (single roll, house sepcial, etc)

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput } from 'react-native';
import SushiMenu from '../assets/menu';

const sushiMenu = SushiMenu();
const DATA = sushiMenu.map((x) => {
  return(x)
})

const Item = ({title, description, category}) => (
  <View style={styles.item}>
    <Text style={styles.sushiTitle}>{title}</Text>
    <Text style={{color: "gray"}}>{description}</Text>
    <Text style={{color: "gray"}}>Category: {category}</Text>
  </View>
);

const Menu = ({navigation}) => {
  const renderItem = ({item}) => (
    <View>
      <Item title = {item.title}
            description = {item.description}
            category = {item.category} />
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
        renderItem={renderItem}
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
  item: {
    flex:4,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  }
});

export default Menu;
