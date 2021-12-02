import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, Button } from 'react-native';
import SushiMenu from '../assets/menu';
import { useValue } from './ValueContext';

// Read in the JSON data file
const sushiMenu = SushiMenu();
let DATA = sushiMenu.map((x) => {
  return(x)
})

const Order = ({navigation}) => {
  const [currOrder, setCurrOrder] = useState([]);
  const [str, setStr] = useState("");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(DATA);
  const {currentValue, setCurrentValue} = useValue();
  const queue = currentValue.queue;
  const tableNum = currentValue.tableNum;

  useEffect(() => {
    setStr("")
  });

  useEffect(() => {
    // Filter the menu according to search
    if (search) {
      const tempMenu = SushiMenu();
      const result = tempMenu.map((x) => {
        x.items = x.items.filter((item) => {
          return (
            item.title.toLowerCase().includes(search) ||
            (item.description.toLowerCase().includes(search) && item.description !== "temp")
          )
        })
        return (x)
      })
      setMenu(result)
    } else {
      const result = sushiMenu.map((x) => {
        return (x)
      })
      setMenu(result)
    }
  }, [search])

  const updateData = () => {
    setCurrentValue({currOrder: currOrder, queue: queue, tableNum: tableNum})
  }

  const updateCurrOrderStr = () => {
    if (currOrder.length === 0) {
      setStr("empty")
    } else {
      setStr(currOrder.join(', '))
    }
  }

  const addItemToOrder = (item, quantity, category) => {
    if (!quantity) {
      quantity = 0
    }

    var temp = currOrder
    let entry = {
      name: item,
      quantity: quantity,
      category: category
    }

    // If we find a duplicate entry of this item, remove it before
    // adding the new quantity
    const matches = (ele) => (ele.name === item && ele.category === category);
    const matchingIndex = currOrder.findIndex(matches)
    if (matchingIndex != -1) {
      temp.splice(matchingIndex, 1)
    }

    if (quantity !== 0) {
      temp.push(entry)
    }
    setCurrOrder(temp)
    updateCurrOrderStr()
  }

  let currOrderView = ""
  if (currOrder.length === 0) {
    currOrderView = <Text>Empty!</Text>
  } else {
    currOrderView = currOrder.map((item) => {
      return (
        <View>
          <Text>{item.quantity} order(s) of {item.name} ({item.category})</Text>
        </View>
      )
    })
  }

  const renderCategory = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.category}>{item.category}</Text>
      { item.items.map((x) => {
        if (x.description != "temp") {
          return (
            <View style={{flexDirection: "row", paddingTop: 10, }}>
              <View styles={{flexDirection: "row", textAlign: 'center'}}>
                <TextInput placeholder = "0"
                           onChangeText = {(text) => {
                             addItemToOrder(x.title, parseInt(text), item.category)
                           }} />

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
                <TextInput placeholder = "0"
                           onChangeText = {(text) => {
                             addItemToOrder(x.title, parseInt(text), item.category)
                           }} />

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

      <TextInput style={styles.input}
                 placeholder="Search for a roll or ingredient"
                 onChangeText = {(text) => {
                   setSearch(text.toLowerCase())
                 }} />

      <Text>Current Order:</Text>
      {currOrderView}

      <FlatList data={menu}
                renderItem={renderCategory}
                keyExtractor={item => item.id} />

      <Button title = "Next"
              onPress = {() => {
                   console.log("Next pressed")
                   updateData()
                   navigation.navigate('Cart', {tableNum: 10})
              }} />
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  category: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10,
  },
  sushiRoll: {
    paddingLeft: 10
  }
});

export default Order;
