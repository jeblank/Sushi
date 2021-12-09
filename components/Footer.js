import React from 'react';
import { View, Button } from 'react-native';

const Footer = ({navigation}) => {
  return (
    <View>
      <Button title="About"
              onPress={(() => {
                console.log("navigation:", navigation)
              })} />
    </View>
  )
}

export default Footer;
