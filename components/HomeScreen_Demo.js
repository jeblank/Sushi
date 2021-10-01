import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: '25px',
        border: 'thick solid black',
        padding: '10px',
        justifyContent: 'space-around',
      }}>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      />

      <Button
        title="Go to Jenna's profile"
        onPress={() => navigation.navigate('Profile', { name: 'Jenna' })}
      />

      <Button
        title="Go to FlexDemo1"
        onPress={() => navigation.navigate('FlexDemo1')}
      />
    </View>
  );
};

export default HomeScreen;