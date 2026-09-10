import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Nama : Sabbicarel Edward Piris</Text>
      <Text>Tempat tanggal Lahir : Cirebon, 30 April 2006</Text>
      <Text>Cita-cita : Menjadi Programmer Handal</Text>
      <Text>Rencana Hidup : Meningkatkan kemampuan programming dan berkontribusi dalam pengembangan aplikasi yang bermanfaat</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
