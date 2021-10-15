import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';


const MenuItem = ({category, items, addItemToOrder}) => (
  <View style={styles.item}>
    <Text style={styles.category}>{category}</Text>
    { items.map((x) => {
      if (x.description != "temp") {
        return (
          <View style={{flexDirection: "row", paddingTop: 10, }}>
            <View styles={{flexDirection: "row", textAlign: 'center'}}>
              <TextInput placeholder = "0"
                         onChangeText = {(text) => {
                           //console.log("quantity of ", x.title, parseInt(text))
                           addItemToOrder(x.title, parseInt(text))
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
                           //console.log("quantity of ", x.title, parseInt(text))
                           addItemToOrder(x.title, parseInt(text))
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




// const MenuItem = ({category, items, addItemToOrder}) => (
//   <View style={styles.item}>
//     <Text style={styles.category}>{category}</Text>
//     { items.map((x) => {
//       if (x.description != "temp") {
//         return (
//           <View style={{flexDirection: "row", paddingTop: 10, }}>
//             <View styles={{flexDirection: "row", textAlign: 'center'}}>
//               <Button title="Add"
//                       onPress={() => addItemToOrder(x.title)} />
//
//             </View>
//             <View style={styles.sushiRoll}>
//               <Text style={{fontWeight: "bold"}}>{x.title}</Text>
//               <Text>{x.description}</Text>
//             </View>
//           </View>
//         )
//       } else {
//         return (
//           <View style={{flexDirection: "row", paddingTop: 10, }}>
//             <View styles={{flexDirection: "row", textAlign: 'center'}}>
//               <Button title="Add"
//                       onPress={() => addItemToOrder(x.title)} />
//
//             </View>
//             <View style={styles.sushiRoll}>
//               <Text style={{fontWeight: "bold"}}>{x.title}</Text>
//             </View>
//           </View>
//         )
//       }
//     }) }
//   </View>
// );

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
    paddingLeft: 10
  }
});

export default MenuItem
