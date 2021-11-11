import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useValue } from "./ValueContext";

const Header = () => {
  const {currentValue, setCurrentValue} = useValue();
  const currTableNum = currentValue.tableNum;

  return (
    <Text style={styles.header}>You're signed into Table {currTableNum}.</Text>
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
