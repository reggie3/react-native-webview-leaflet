import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebViewLeaflet } from "react-native-webview-leaflet";

export default function App() {
  const onMessageReceived = () => {
    debugger;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>React Native Webview Leaflet Demo</Text>
      </View>
      <View style={{ flex: 1 }}>
        <WebViewLeaflet onMessageReceived={onMessageReceived} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingTop: 30,
    width: "100%"
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  }
});
