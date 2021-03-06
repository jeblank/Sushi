import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  SectionList,
} from "react-native";
import { useValue } from "./ValueContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = (props) => {
  const [order, setOrder] = useState([]);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [showCurrOrderArrView, setShowCurrOrderArrView] = useState(true);
  const [showHeaderView, setShowHeaderView] = useState(true);
  const [showHistoryButtonView, setShowHistoryButtonView] = useState(true);
  const [num, setNum] = useState();

  const {currentValue, setCurrentValue} = useValue();
  const currOrderArr = currentValue.currOrder;
  const queue = currentValue.queue;
  const tableNum = currentValue.tableNum;

  const updateData = () => {
    // maybe change this to newQueueEntry with proper structure?
    //queue.push(currOrderArr)
    const queueEntry = {
      title: `Table ${tableNum}`,
      data: [
        {
          order: currOrderArr,
          notes: notes,
          timestamp: new Date().toLocaleString()
        }
      ]
    }
    queue.push(queueEntry)

    setCurrentValue({currOrder: [], queue: queue, tableNum: tableNum});
  };

  let currOrderArrView = null;
  if (showCurrOrderArrView) {
    if (currOrderArr == undefined || currOrderArr.length === 0) {
      currOrderArrView = (
        <View>
          <Text style={{ textAlign: "center" }}>Your cart is empty!</Text>
          <Text style={{ textAlign: "center" }}>
            Add some sushi to your cart to submit an order.
          </Text>
        </View>
      );
    } else {
      currOrderArrView = currOrderArr.map((x) => {
        return (
          <View>
            <Text>
              {x.quantity} order(s) of {x.name} ({x.category})
            </Text>
          </View>
        );
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@history");
      let json = null;
      if (jsonValue != null) {
        json = JSON.parse(jsonValue);
        setHistory(json);
      } else {
        console.log("just read a null value from storage");
        setHistory([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@history", jsonValue);
      console.log("just stored ", jsonValue);
    } catch (e) {
      console.log("error in storeData");
      console.die(e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.dir(e);
    }
  };

  let submitView = null;
  if (currOrderArr != undefined && currOrderArr.length != 0) {
    submitView = (
      <View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={styles.input}
            placeholder={"Special notes for the order"}
            onChangeText={(text) => {
              setNotes(text);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Submit Order"
            color="green"
            onPress={() => {
              // console.log("order: ", currOrderArr);
              // console.log("notes: ", notes);
              const newHistory = history.concat({
                title: new Date().toLocaleString(),
                data: [
                  {
                    notes: notes,
                    order: currOrderArr,
                  },
                ],
              });
              storeData(newHistory);
              setConfirmationMessage(true);
              setShowCurrOrderArrView(false);
              setShowHeaderView(false);
              setShowHistoryButtonView(false);
              updateData(); // Send this order info to the Kitchen's queue
            }}
          />
        </View>
      </View>
    );
  }

  let confirmationView = null;
  if (confirmationMessage) {
    confirmationView = (
      <View>
        <Text style={styles.confirmation}>Order Submitted!</Text>
        <View style={styles.doneButton}>
          <Button
            title={"Done"}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    );
  }

  let tempHistoryView = null;
  if (showHistory) {
    tempHistoryView = (
      <View>
        <SectionList
          sections={history}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <Text>Notes: {item.notes}</Text>
              <Text>
                {item.order.map(
                  (obj) =>
                    `${obj.quantity} order(s) of ${obj.name} (${obj.category})\n`
                )}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ paddingTop: 10 }}>
              <Text>{title}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  let headerView = null;
  if (showHeaderView) {
    if (tableNum) {
      headerView = (
        <Text style={styles.header}>
          Current Order for Table Number {tableNum}:
        </Text>
      )
    } else {
      headerView = (
        <View style={styles.textinput}>
          <Text style={styles.header}>Please enter your table number: </Text>
          <TextInput placeholder="ex: 10"
                     onChangeText={((text) => {
                       setNum(parseInt(text))
                     })} />
           <Button title="Save table number"
                   onPress={() => {
                     if (num) {
                       setCurrentValue({tableNum: num, queue: queue, currOrderArr: currOrderArr})
                     }
                   }} />
        </View>
      )
    }
  }

  let historyButtonView = null;
  if (showHistoryButtonView) {
    historyButtonView = (
      <View style={styles.history}>
        <Button
          title={showHistory ? "Hide Order History" : "Show Order History"}
          color="orange"
          onPress={() => {
            setShowHistory(!showHistory);
          }}
        />
      </View>
    )
  }

  return (
    <View>
      {headerView}

      {currOrderArrView}

      {confirmationView}

      {submitView}

      {historyButtonView}

      {tempHistoryView}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  history: {
    paddingTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  confirmation: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
    paddingTop: 10,
    fontSize: 25,
  },
  doneButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textinput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default Cart;

// Data structure for the order
// const testHistory = [
//   {
//     title: "Temp Timestamp Entry",
//     data: [
//       {
//         notes: "This is the first test",
//         order: [
//           {
//             name: "Cooked Shrimp",
//             quantity: 10,
//             category: "hand roll"
//           },
//           {
//             name: "Salmon",
//             quantity: 10,
//             category: "sashimi"
//           },
//           {
//             name: "White Tuna",
//             quantity: 1,
//             category: "nigiri"
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Temp Timestamp Entry #2",
//     data: [
//       {
//         notes: "This is the second test",
//         order: [
//           {
//             name: "Raw Shrimp",
//             quantity: 5,
//           },
//           {
//             name: "Haddock",
//             quantity: 4,
//           },
//           {
//             name: "Black Tuna",
//             quantity: 2,
//           },
//         ],
//       },
//     ],
//   },
// ];
