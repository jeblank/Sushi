import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

const MenuItem = ({category, items}) => (
  <View style={styles.item}>
    <Text style={styles.category}>{category}</Text>

    { items.map((x) => {
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
              <Button title="Add"/>
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

const styles = StyleSheet.create({
  item: {
    //backgroundColor: '#f9c2ff',
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
    //backgroundColor: '#f9c2ff',
    //paddingTop: 10,
    paddingLeft: 10
  }
});

export default MenuItem
