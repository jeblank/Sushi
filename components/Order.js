// TODO: change this to Order?
// TODO: Add maybe an accordian list based on the categories (single roll, house sepcial, etc)

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, Button } from 'react-native';
import SushiMenu from '../assets/menu';
import MenuItem from './MenuItem';
import { useValue } from './ValueContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Read in the JSON data file
const sushiMenu = SushiMenu();
const DATA = sushiMenu.map((x) => {
  return(x)
})

const Order = ({navigation}) => {
  // ------------------- State variables -------------------
  const [currOrder, setCurrOrder] = useState([]); // TODO: take the empty array out once we finish async storage

  let test = ""
  let currOrderArrView = ""
  useEffect(() => {
    test = currOrder
    console.log("test: ", test)

    let currOrderArrView =
      test.map((x) => {
        return (
          <Text>{x}</Text>
        )
      })
  }, [currOrder])



  // ------------------- Context logic -------------------
  const {currentValue, setCurrentValue} = useValue();
  const updateData = () => {
    console.log("currOrder in updateData:", currOrder)
    setCurrentValue({currOrder: currOrder})
  }

  // ------------------- Async storage logic -------------------
  useEffect(() => {getData()}, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@currOrder')
      let json = null
      if (jsonValue != null) {
        json = JSON.parse(jsonValue)
        console.log("json: ", JSON.stringify(json))
        setCurrOrder(json.currOrder)
      } else {
        console.log("just read a null value from storage")
        setCurrOrder([])
      }
    } catch(e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@currOrder', jsonValue)
      console.log('just stored ', jsonValue)
    } catch(e) {
      console.log("error in storeData")
      console.dir(e)
    }
  }

  // ------------------- Helper functions -------------------
  const addItemToOrder = (item) => {
    var temp = currOrder
    temp.push(item)
    setCurrOrder(temp)
    console.log("currOrder: ", currOrder)
  }

  const renderCategory = ({item}) => (
    <View>
      <MenuItem category = {item.category}
                items = {item.items}
                addItemToOrder = {addItemToOrder} />
    </View>
  );

  // ------------------- Draw the screen -------------------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sushi Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a roll"
      />

      <Text>Current Order:</Text>
      {currOrderArrView}
      {console.log("currOrder: ", currOrder)}

      <FlatList
        data={DATA}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
      <Button
         title = "Next"
         onPress = {() => {
              updateData()
         }}
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
