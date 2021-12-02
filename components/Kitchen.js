import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SectionList, Button } from 'react-native';
import { useValue } from './ValueContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Kitchen = ({navigation}) => {
  const [queue, setQueue] = useState([]);
  const {currentValue, setCurrentValue} = useValue();
  let queueFromCurrValue = currentValue.queue;

  useEffect(() => {
    getData();
    // TODO: maybe call storeData here as well?
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@queueHistory");
      let json = null;
      if (jsonValue != null && jsonValue != "[]") {
        json = JSON.parse(jsonValue);
        setQueue(json);
      } else {
        console.log("just read a null value from storage");
        setQueue(queueFromCurrValue);
      }
    } catch(e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@queueHistory", jsonValue);
      console.log("just stored ", jsonValue)
    } catch(e) {
      console.log("error in storeData");
      console.log(e);
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      console.log(e);
    }
  }

  let queueView = null;
  if (queue.length === 0) {
    queueView = (
      <Text style={{textAlign: "center"}}>No orders yet!</Text>
    )
  } else {
    queueView = (
      <View>
        <View style={{paddingBottom: 10}}>
          <Button title="Save Queue to AsyncStorage"
                  onPress={(() => {
                    console.log("calling storeData with ", queueFromCurrValue)
                    storeData(queueFromCurrValue)
                  })} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <SectionList
            sections={queue}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <View style={{paddingBottom: 20}}>
                <Text>Submitted: {item.timestamp}</Text>
                <Text style={{paddingTop: 5, paddingBottom: 5}}>
                  {item.order.map(
                    (obj) =>
                      `${obj.quantity} order(s) of ${obj.name} (${obj.category})\n`
                  )}
                </Text>
                <Text>Notes: {item.notes}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ paddingTop: 10 }}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{title}</Text>
              </View>
            )}
          />
          <View style={{alignSelf: "flex-start"}}>
            <Button title="Complete"
                    color="green"
                    onPress={(() => {
                      console.log("removing first item from queue")
                      const temp = [...queue]
                      temp.shift()
                      setQueue(temp)
                    })} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Queue</Text>

      {queueView}

      <View style={{paddingTop: 30}}>
        <Button title="Clear async memory (remove after debugging)"
                onPress={(() => {
                  clearAll();
                })} />
      </View>
    </View>
  )
}

export default Kitchen;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 20
  },
  container: {
    padding: 20
  }
});
