// TODO: change this to Order?
// TODO: Add maybe an accordian list based on the categories (single roll, house sepcial, etc)

import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, Button } from 'react-native';
import SushiMenu from '../assets/menu';
import MenuItem from './MenuItem';

const sushiMenu = SushiMenu();
const DATA = sushiMenu.map((x) => {
  return(x)
})

const Order = ({navigation}) => {
  const [currOrder, setCurrOrder] = useState([])
  const addItemToOrder = (item) => {
    console.log(Array.isArray(currOrder))
    // let updatedOrder = currOrder
    // updatedOrder.push(item)
    // setCurrOrder(updatedOrder)
    // console.log("updated order:", currOrder)
  }

  const renderCategory = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.category}>{item.category}</Text>
      { item.items.map((x) => {
        if (x.description != "temp") {
          return (
            <View style={{flexDirection: "row", paddingTop: 10, }}>
              <View styles={{flexDirection: "row", textAlign: 'center'}}>
                <Button title="Add"/>

              </View>
              <View style={styles.sushiRoll}>
                <Text style={{fontWeight: "bold"}}>{x.title}</Text>
                <Text>{x.description}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View style={{flexDirection: "row", paddingTop: 10, }}>
              <View styles={{flexDirection: "row", textAlign: 'center'}}>
                <Button title="Add"
                        onPress={() => addItemToOrder(["temp"]) }
                        />

              </View>
              <View style={styles.sushiRoll}>
                <Text style={{fontWeight: "bold"}}>{x.title}</Text>
              </View>
            </View>
          )
        }
      }) }
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sushi Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a roll"
      />
      <Text>Current order:</Text>
      { currOrder.map((x) => {
        <Text>{x}</Text>
      }) }
      <FlatList
        data={DATA}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
      <Button title="Next" />
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
