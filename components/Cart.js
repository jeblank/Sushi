import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button, TextInput} from 'react-native';
import { useValue } from './ValueContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = (props) => {
  const [order, setOrder] = useState([]);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState();
  const [showHistory, setShowHistory] = useState(true);

  const tableNum = props.route.params.tableNum
  const {currentValue} = useValue();
  const currOrderArr = currentValue.currOrder;

  let currOrderArrView = ""
  if (currOrderArr.length === 0) {
    currOrderArrView =
      <View>
        <Text style={{textAlign: 'center'}}>Your cart is empty!</Text>
        <Text style={{textAlign: 'center'}}>Add some sushi to your cart to submit an order.</Text>
      </View>
  } else {
    currOrderArrView =
      currOrderArr.map((x) => {
        return (
          <Text>{x}</Text>
        )
      })
  }

  useEffect(() => {getData()}, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@history')
      let json = null
      if (jsonValue != null) {
        json = JSON.parse(jsonValue)
        console.log("json: ", JSON.stringify(json))
        setHistory(json)
      } else {
        console.log("just read a null value from storage")
        setHistory([])
      }
    } catch(e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@history', jsonValue)
      console.log('just stored ', jsonValue)
    } catch(e) {
      console.log("error in storeData")
      console.die(e)
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.dir(e)
    }
  }

  let submitView = ""
  if (currOrderArr.length != 0) {
    submitView =
      <View>
        <View style = {{paddingTop: 10}}>
          <TextInput style = {styles.input}
                     placeholder="Special notes for the order"
                     onChangeText = {text => {
                       setNotes(text)
                     }} />
        </View>
        <Button title = "Submit Order"
                onPress = {(() => {
                  console.log("order: ", currOrderArr)
                  console.log("notes: ", notes)
                  // Store this order in async storage for history
                  const newHistory =
                    history.concat({
                      'order': currOrderArr,
                      // add notes here
                    })
                    storeData(newHistory)

                  // TODO: send this order info to the Kitchen's queue
                })} />
      </View>
  }

  let historyView = ""
  if (showHistory && history) {
    historyView =
      history.map((entry) => {
        return (
          entry.order.map((item) => {
            return (
              <Text>{item}</Text>
            )
          })
        )
      })
  }
  // if (showHistory && history) {
  //   historyView =
  //     history.map((entry) => {
  //       if (entry.order.length === 1) {
  //         return (
  //           <Text>{entry.order}</Text>
  //         )
  //       } else {
  //         return (
  //           entry.order.map((item) => {
  //             return (
  //               <Text>{item}</Text>
  //             )
  //           })
  //         )
  //       }
  //     })
  // }

  return (
    <View>
      <Text style = {styles.header}>Current Order for Table Number {tableNum}</Text>
      {currOrderArrView}

      {submitView}

      <View style = {styles.history}>
        <Button title = "Show/Hide History"
                onPress = {(() => {
                  console.log("show history")
                })}
                style = {styles.history} />
      </View>

      {historyView}

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  history: {
    padding: 20
  }
});

export default Cart;
