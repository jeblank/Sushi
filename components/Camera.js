import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraTest = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
                            onPress={() => {
                              setType(
                                type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back
                              );
                            }}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraTest;

const styles = StyleSheet.create({
  camera: {
    height: '50%',
    width: '50%',
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    backgroundColor:'black',
    color:'white',
    paddingTop:10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
