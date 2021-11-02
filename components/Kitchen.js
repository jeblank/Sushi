// TODO: add async storage for preserving queue

import * as React from 'react';
import { Text, View, StyleSheet, SectionList, Button } from 'react-native';
import { useValue } from './ValueContext';

const Kitchen = ({navigation}) => {
  const {currentValue, setCurrentValue} = useValue();
  const queue = currentValue.queue;

  // console.log("queue in Kitchen:", queue)
  // console.log(Object.keys(queue))

  let queueView = null;
  if (queue.length === 0) {
    queueView = (
      <Text style={{textAlign: "center"}}>No orders yet!</Text>
    )
  } else {
    queueView = (
      <View style={{flexDirection: 'row'}}>
        <SectionList
          sections={queue}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
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
                  color="green" />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Queue</Text>
      {queueView}
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
