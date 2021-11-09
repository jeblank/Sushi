import * as React from 'react';
import { Text, View, StyleSheet, Image, Button,
  // AppRegistry,
  // TouchableOpacity,
  // Linking
} from 'react-native';

import Camera from './Camera';

//import QRCodeScanner from 'react-native-qrcode-scanner';

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

      <Text style={{textAlign: "center", paddingBottom: 10}}>Order a round of sushi by scanning the QR code on your table.</Text>

      <Camera />

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
