import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebViewLeaflet } from "react-native-webview-leaflet";

export default function App() {
  return (
    <View style={styles.container}>
      <WebViewLeaflet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
