import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.text}>APP NAHIA & IÑIGO</Text>
      <StatusBar style="auto" />
    </View>
  );
}
