import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to All-You-Can-Eat Sushi!</Text>
        <Image source={require('../assets/sushi.jpg')}
              style={styles.image} />
      </View>

      <View style={styles.buttons}>
        <Button title="About"
                onPress = {() =>
                  navigation.navigate('About')
                } />
        <Button title="Order"
                onPress = {() =>
                  navigation.navigate('Order')
                } />
        <Button title="Cart"
                onPress = {() =>
                  navigation.navigate('Cart', {tableNum: 10})
                } />
        <Button title="Kitchen"
                onPress = {() =>
                  navigation.navigate('Kitchen')
                } />
      </View>

      <Text style={{textAlign: "center"}}>Order a round of sushi by scanning the QR code on your table.</Text>
      <Text style={{textAlign: "center"}}>[Insert QR scanner here]</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  image: {
    height: 200,
    width: 300,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cochin"
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
});

export default Home;
