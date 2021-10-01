import * as React from 'react';
import { Text, View, } from 'react-native';

const Kitchen = ({navigation}) => { 
  return ( 
    <View>
      <Text>This is the kitchen's interface. Here, a queue will populate for orders based on tables.{"\n"}</Text>
      <Text style={{fontWeight: "bold"}}>Coming soon!</Text>
    </View>
  )
}

export default Kitchen;