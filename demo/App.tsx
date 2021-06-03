import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { WebViewLeaflet } from 'react-native-leaflet-webview'
import { mapMarkers, mapShapes } from './mockData'

export const mapboxToken =
  'pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw'

export default function App() {
  const [zoom, setZoom] = useState(7)
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 36.850769,
    lng: -76.285873,
  })
  const [ownPosition, setOwnPosition] = useState(null)

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        console.warn('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})
      if (!ownPosition) {
        setOwnPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      }
    }

    getLocationAsync()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>React Native Webview Leaflet Demo</Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            backgroundColor={'green'}
            onMessage={(message) => {
              switch (message.tag) {
                case 'onMapMarkerClicked':
                  Alert.alert(
                    `Map Marker Touched, ID: ${
                      message.mapMarkerId || 'unknown'
                    }`,
                  )
                  break
                case 'onMapClicked':
                  Alert.alert(
                    `Map Touched at:`,
                    `${message.location.lat}, ${message.location.lng}`,
                  )
                  break
                case 'onMove':
                  setMapCenterPosition(message.mapCenter)
                case 'onZoom':
                  setZoom(message.zoom)
                default:
                  console.log('App received', message)
              }
            }}
            mapLayers={[
              {
                attribution:
                  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                baseLayerIsChecked: true,
                baseLayerName: 'OpenStreetMap.Mapnik',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              },
              {
                baseLayerName: 'Mapbox',
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
              },
            ]}
            mapMarkers={mapMarkers}
            mapShapes={mapShapes}
            mapCenterPosition={mapCenterPosition}
            zoom={zoom}
            maxZoom={20}
          />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 10,
    paddingTop: 30,
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  mapControls: {
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 5,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: 'absolute',
    right: 0,
  },
  mapButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  mapButtonEmoji: {
    fontSize: 28,
  },
})
