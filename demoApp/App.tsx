import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  INFINITE_ANIMATION_ITERATIONS,
  LatLng,
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType
} from "react-native-webview-leaflet";
import { mapboxToken } from "./secrets";
import { Button } from "native-base";
import lodashSample from "lodash.sample";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const locations: { icon: string; position: LatLng; name: string }[] = [
  {
    icon: "⭐",
    position: { lat: 38.895, lng: -77.0366 },
    name: "Washington DC"
  },
  {
    icon: "🎢",
    position: { lat: 37.8399, lng: -77.4442 },
    name: "Kings Dominion"
  },
  {
    icon: "🎢",
    position: { lat: 37.23652, lng: -76.646 },
    name: "Busch Gardens Williamsburg"
  },
  {
    icon: "⚓",
    position: { lat: 36.8477, lng: -76.2951 },
    name: "USS Wisconsin (BB-64)"
  },
  {
    icon: "🏰",
    position: { lat: 28.3852, lng: -81.5639 },
    name: "Walt Disney World"
  }
];

const getDuration = (): number => Math.floor(Math.random() * 3) + 1;
const getDelay = (): number => Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

export default function App() {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 36.850769,
    lng: -76.285873
  });
  const [ownPosition, setOwnPosition] = useState(null);

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `Map Marker Clicked ID: ${message.payload.mapMarkerID || "unknown"}`
        );
        break;
      default:
        console.log("App received", message);
    }
  };

  useEffect(() => {
    getLocationAsync();
  });

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    if (!ownPosition) {
      setOwnPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>React Native Webview Leaflet Demo</Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            backgroundColor={"green"}
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
                baseLayerName: "Mapbox",
                //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                attribution:
                  "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              }
            ]}
            mapMarkers={[
              ...locations.map(location => {
                return {
                  id: location.name.replace(" ", "-"),
                  position: location.position,
                  icon: location.icon,
                  animation: {
                    duration: getDuration(),
                    delay: getDelay(),
                    iterationCount,
                    type: lodashSample(
                      Object.values(AnimationType)
                    ) as AnimationType
                  }
                };
              }),
              {
                id: "1",
                position: { lat: 36.46410354, lng: -75.6432701 },
                icon:
                  "https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg",
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: getDelay(),
                  iterationCount,
                  type: AnimationType.BOUNCE
                }
              }
            ]}
            mapShapes={[
              {
                shapeType: MapShapeType.CIRCLE,
                color: "#123123",
                id: "1",
                center: { lat: 34.225727, lng: -77.94471 },
                radius: 2000
              },
              {
                shapeType: MapShapeType.CIRCLE_MARKER,
                color: "red",
                id: "2",
                center: { lat: 38.437424, lng: -78.867912 },
                radius: 15
              },
              {
                shapeType: MapShapeType.POLYGON,
                color: "blue",
                id: "3",
                positions: [
                  { lat: 38.80118939192329, lng: -74.69604492187501 },
                  { lat: 38.19502155795575, lng: -74.65209960937501 },
                  { lat: 39.07890809706475, lng: -71.46606445312501 }
                ]
              },
              {
                shapeType: MapShapeType.POLYGON,
                color: "violet",
                id: "4",
                positions: [
                  [
                    { lat: 37.13842453422676, lng: -74.28955078125001 },
                    { lat: 36.4433803110554, lng: -74.26208496093751 },
                    { lat: 36.43896124085948, lng: -73.00964355468751 },
                    { lat: 36.43896124085948, lng: -73.00964355468751 }
                  ],
                  [
                    { lat: 37.505368263398104, lng: -72.38891601562501 },
                    { lat: 37.309014074275915, lng: -71.96594238281251 },
                    { lat: 36.69044623523481, lng: -71.87805175781251 },
                    { lat: 36.58024660149866, lng: -72.75146484375001 },
                    { lat: 37.36579146999664, lng: -72.88330078125001 }
                  ]
                ]
              },
              {
                shapeType: MapShapeType.POLYLINE,
                color: "orange",
                id: "5",
                positions: [
                  { lat: 35.411438052435486, lng: -78.67858886718751 },
                  { lat: 35.9602229692967, lng: -79.18945312500001 },
                  { lat: 35.97356075349624, lng: -78.30505371093751 }
                ]
              },
              {
                shapeType: MapShapeType.POLYLINE,
                color: "purple",
                id: "5a",
                positions: [
                  [
                    { lat: 36.36822190085111, lng: -79.26086425781251 },
                    { lat: 36.659606226479696, lng: -79.28833007812501 },
                    { lat: 36.721273880045004, lng: -79.81018066406251 }
                  ],
                  [
                    { lat: 35.43381992014202, lng: -79.79370117187501 },
                    { lat: 35.44277092585766, lng: -81.23840332031251 },
                    { lat: 35.007502842952896, lng: -80.837402343750017 }
                  ]
                ]
              },
              {
                shapeType: MapShapeType.RECTANGLE,
                color: "yellow",
                id: "6",
                bounds: [
                  { lat: 36.5, lng: -75.7 },
                  { lat: 38.01, lng: -73.13 }
                ]
              }
            ]}
            mapCenterPosition={mapCenterPosition}
            ownPositionMarker={
              ownPosition && {
                id: "Own Position",
                position: ownPosition,
                icon: "❤️",
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: getDelay(),
                  iterationCount,
                  type: AnimationType.BOUNCE
                }
              }
            }
            zoom={7}
          />
        }
      </View>
      <View style={styles.mapControls}>
        {locations.map(location => {
          return (
            <Button
              key={location.position.lat.toString()}
              info
              onPress={() => {
                setMapCenterPosition(location.position);
              }}
              style={styles.mapButton}
            >
              <Text style={styles.mapButtonEmoji}>{location.icon}</Text>
            </Button>
          );
        })}
        <Button
          onPress={() => {
            setMapCenterPosition(ownPosition);
          }}
          style={styles.mapButton}
          success
        >
          <Text style={styles.mapButtonEmoji}>🎯</Text>
        </Button>
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
  },
  mapControls: {
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginHorizontal: 10,
    position: "absolute",
    right: 0
  },
  mapButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42
  },
  mapButtonEmoji: {
    fontSize: 28
  }
});
