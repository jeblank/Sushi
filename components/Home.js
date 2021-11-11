import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useValue } from "./ValueContext";
import Camera from './Camera';

const Home = ({navigation}) => {
  const {currentValue, setCurrentValue} = useValue();
  const currTableNum = currentValue.tableNum;
  const [num, setNum] = useState(currTableNum);

  return (
    <ScrollView>
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
                    navigation.navigate('Cart', {tableNum: currTableNum})
                  } />
          <Button title="Kitchen"
                  onPress = {() =>
                    navigation.navigate('Kitchen')
                  } />
        </View>

        <Text style={{textAlign: "center", paddingBottom: 10}}>Order a round of sushi by entering your table number or scanning the QR code on your table.</Text>

        <View style={{flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center',}}>
          <Text>Enter table number here: </Text>
          <TextInput placeholder="ex: 10"
                     onChangeText={((text) => {
                       setCurrentValue({tableNum: parseInt(text)})
                       setNum(text)
                     })} />
        </View>

        <Text style={{textAlign: 'center', paddingBottom: 5}}>Or, scan the QR code on your table:</Text>
        <Camera />

      </View>
    </ScrollView>
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

// <QRCodeScanner
//   onRead={this.onSuccess}
//   flashMode={RNCamera.Constants.FlashMode.torch}
//   topContent={
//     <Text style={styles.centerText}>
//       Go to{' '}
//       <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
//       your computer and scan the QR code.
//     </Text>
//   }
//   bottomContent={
//     <TouchableOpacity style={styles.buttonTouchable}>
//       <Text style={styles.buttonText}>OK. Got it!</Text>
//     </TouchableOpacity>
//   }
// />
