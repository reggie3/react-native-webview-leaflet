import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebViewLeaflet } from './WebViewLeaflet';
import { WebviewLeafletMessage } from './WebViewLeaflet/models';

export default function App() {
  const onMessageReceived = (message: WebviewLeafletMessage) => {
    console.log('onMessageReceived', onMessageReceived);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <WebViewLeaflet onMessageReceived={onMessageReceived} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
