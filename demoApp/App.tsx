import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebViewLeaflet, AnimationType } from "react-native-webview-leaflet";
import { mapboxToken } from "./secrets";
const emoji = ["😴", "😄", "😃", "⛔", "🎠", "🚓", "🚇"];
const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

export default function App() {
  const onMessageReceived = (msg: any) => {
    console.log("App received", msg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>React Native Webview Leaflet Demo</Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            onMessageReceived={onMessageReceived}
            mapLayers={[
              {
                attribution:
                  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                baseLayerIsChecked: true,
                baseLayerName: "OpenStreetMap.Mapnik",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              },
              {
                baseLayerName: "Streets",
                //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                attribution:
                  "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              }
            ]}
            mapMarkers={[
              {
                id: "2",
                position: { lat: 37.06452161, lng: -75.67364786 },
                icon: "😴",
                size: [64, 64],
                animation: {
                  duration,
                  delay,
                  iterationCount,
                  type: AnimationType.BOUNCE
                }
              },
              {
                id: "1",
                position: { lat: 36.46410354, lng: -75.6432701 },
                icon:
                  "https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg",
                size: [32, 32],
                animation: {
                  duration,
                  delay,
                  iterationCount,
                  type: AnimationType.BOUNCE
                }
              },
              {
                id: "100",
                position: { lat: 37.23310632, lng: -76.23518332 },
                icon: emoji[Math.floor(Math.random() * emoji.length)],
                animation: {
                  duration,
                  delay,
                  iterationCount,
                  type: AnimationType.WAGGLE
                }
              }
            ]}
          />
        }
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
