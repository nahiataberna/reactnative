import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import Campobase from './componentes/CampobaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'blue',
      textAlign: 'center',
      fontSize: 40
    },
  });

  

  return (
    <SafeAreaProvider>
      <View>
        <Campobase />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>);
}
