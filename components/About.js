import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Story from './Story';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.paragraph}>
            <Story />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    marginHorizontal: 10,
  },
});

export default About;
