// TODO: change this to Order?
// TODO: Add maybe an accordian list based on the categories (single roll, house sepcial, etc)

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import SushiMenu from '../assets/menu';

const sushiMenu = SushiMenu();
const DATA = sushiMenu.map((x) => {
  return(x)
})

const Item = ({category, items}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{category}</Text>
    <Text>{items}</Text>
  </View>
);

const Menu = ({navigation}) => {
  const renderItem = ({item}) => (
    <View>
      <Item category = {item.category}
            items = {item.items} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:32,
                    backgroundColor:'red'}}>
         Sushi Menu
      </Text>
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
  title: {
    fontSize: 32,
  },
});

export default Menu;
