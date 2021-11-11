import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useValue } from "./ValueContext";

const Header = () => {
  const {currentValue, setCurrentValue} = useValue();
  const currTableNum = currentValue.tableNum;

  let text = null;
  if (!currTableNum) {
    text = "Please input your table number!"
  } else {
    text = `You're signed into Table ${currTableNum}.`
  }

  return (
    <Text style={styles.header}>{text}</Text>
  )
}

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10
  }
})
