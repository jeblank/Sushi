import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button, TextInput, SectionList } from 'react-native';
import { useValue } from './ValueContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = (props) => {
  const [order, setOrder] = useState([]);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const tableNum = props.route.params.tableNum;

  const {currentValue, setCurrentValue} = useValue();
  const currOrderArr = currentValue.currOrder;
  const updateData = () => {
    setCurrentValue([]);
  }

  console.log(props)

  let currOrderArrView = ""
  if (currOrderArr == undefined || currOrderArr.length === 0) {
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
        setHistory({ data: [] })
      }
    } catch(e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      console.log("value: ", value)
      console.log("updated value: ", { data: value })
      const updatedValue = { data: value }
      const jsonValue = JSON.stringify(updatedValue)
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
  if (currOrderArr != undefined && currOrderArr.length != 0) {
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
                    history.data.concat({
                      'order': currOrderArr,
                      'notes': notes,
                      'timestamp': "Temp Timestamp Entry"
                    })
                    storeData(newHistory)

                  // TODO: send this order info to the Kitchen's queue

                  setConfirmationMessage(true)
                  updateData()

                })} />
      </View>
  }

  let confirmationView = ""
  if (confirmationMessage) {
    confirmationView =
    <View>
      <Text style = {styles.confirmation}>Order Submitted!</Text>
      <View style = {styles.doneButton}>
        <Button title = "Done"
                color = "green"
                onPress = {(() => {
                  props.navigation.navigate('Home')
                })} />
      </View>
    </View>
  }

  let historyView = ""
  if (showHistory && history) {
    historyView =
      history.data.map((entry) => {
        return (
          entry.order.map((item) => { // TODO: change this to flatlist?
            return (
              <View>
                <Text>{entry.timestamp}</Text>
                <Text>{item}</Text>
                <Text>{entry.notes}</Text>
              </View>
            )
          })
        )
      })
  }

  // let historyView = ""
  // if (showHistory && history) {
  //   {console.log(history)}
  //   historyView =
  //     <View>
  //       <SectionList sections = {history.data}
  //                    keyExtractor = {(item, index) => index}
  //                    renderItem={({ item }) => (
  //                     <View>
  //                       <Text>{item}</Text>
  //                     </View>
  //                   )}
  //                   renderSectionHeader={({ section: { timestamp } }) => (
  //                     <Text>{timestamp}</Text>
  //                   )} />
  //       </View>
  // }

  return (
    <View>
      <Text style = {styles.header}>Current Order for Table Number {tableNum}</Text>

      {currOrderArrView}

      {confirmationView}

      {submitView}

      <View style = {styles.history}>
        <Button title = {showHistory ? "Hide History" : "Show History"}
                onPress = {(() => {
                  setShowHistory(!showHistory)
                })}
                style = {styles.history} />
      </View>

      {historyView}

      <Button title = "Clear async memory"
              onPress = {(() => {
                clearAll()
              })} />

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
  },
  confirmation: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
    paddingTop: 10,
    fontSize: 15,
  },
  doneButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }
});

export default Cart;
