import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useData from '../../useData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const data = useData();
  return (
    <View style={styles.container}>
      <Text>
        Open up App.tsx to start working on your app!
        <pre>{JSON.stringify(Object.keys(data.channels || []))}</pre>
      </Text>
    </View>
  );
}
