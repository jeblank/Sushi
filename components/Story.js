import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const Story = () => { 
  return ( 
    <View>
      <Text style={styles.header}>The inspiration for this project came during a visit to Nijiya Sushi in Medford, Massachusetts.{"\n"}</Text>

      <Text>I was sitting right next to the kitchen door, so I got a clear view of how the servers appeared to be taking care of the customers. During this time, I noticed some clear gaps in effeciency and was inspired to try to create a elegant and streamlined solution for their restaurant.{"\n"}</Text>

      <Text>This eatery is an all-you-can-eat sushi restaurant. Customers pay a flat rate for the all-you-can eat sushi, and place their orders for individual pieces of suhi or small rolls via slips of paper.{"\n"}</Text>
      <Text>Each time you order a round, the table places one single order. Each table can order as many rounds as they like, and each time an order is completed, the table is given a new piece of order paper by the waitor or waitress.{"\n"}</Text>

      <Text>I felt that this method was unreliable and sometimes frustrating since the table had to wait for their server to deliver a new slip of paper, which proved to be difficult in a packed restaurant.{"\n"}</Text>

      <Text>Plus, the order slips only had the title of the sushi. There was no information as to what was actually in the roll. If you wanted to get this information, you had to ask for a separate dinner menu, and then scan through the menu until you found the sushi you were looking for to find a description.{"\n"}</Text>

      <Text>I also felt that it placed unnecessary strain on the servers. The servers did not seem to be assigned to any specific table or region like a traditional restaurant, so it appeared troublesome for them ot remember whether or not each table had a fresh order paper. Servers also had to cycle about the restaurant to pick up any order slips, and then had to manually input the order into the kitchen computer.{"\n"}</Text>

      <Text>Additionally, this seemed to be an unnecessary waste of paper.{"\n"}</Text> 

      <Text>Regardless, I had a wonderful time at Nijiya Sushi, so I was inspired to create this app!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { 
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Story;