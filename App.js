import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button} from 'react-native';

import FlatListExpamle from "./src/components/FlatListExpamle";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatListExpamle />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
