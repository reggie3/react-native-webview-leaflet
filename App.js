import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import WebViewLeaflet from './WebViewLeaflet';

const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const interationCount = 'infinite';

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    locations: null,
    coords: []
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let locations = this.createRandomMarkers(location.coords, 20, 100000);
    this.setState({
      locations,
      location,
      coords: [location.coords.latitude, location.coords.longitude]
    });
  };

  // create set of location objects centered around the current user location
  createRandomMarkers = (center, numberOfMarkers, radius) => {
    let newMarkers = [];
    for (let i = 0; i < numberOfMarkers; i++) {
      // get a random location centered around the current postion
      let x0 = center.longitude;
      let y0 = center.latitude;

      let r = radius / 111300; // = 100 meters

        let u = Math.random();
        let v = Math.random();
        let w = r * Math.sqrt(u);
        let t = 2 * Math.PI * v;
        let x = w * Math.cos(t);
        let y1 = w * Math.sin(t);
        let x1 = x / Math.cos(y0);

        let foundLatitude = y0 + y1;
        let foundLongitude = x0 + x1;

      newMarkers.push({
        id: Math.floor(Math.random() * 1000),
        //coords: [33.946, -91.000],
         coords: [foundLatitude, foundLongitude],
        // coords: [37.06452161, -85.67364786],
        icon: emoji[Math.floor(Math.random() * emoji.length)],
        animation: {
          name: animations[Math.floor(Math.random() * animations.length)],
          duration: Math.floor(Math.random() * 3) + 1,
          delay: Math.floor(Math.random()) * 0.5,
          interationCount
        }
      });
    }
    return newMarkers;
  };

  onWebViewReady = () => {
    // setInterval(this.updateMarkerSpeed.bind(this), 1000);
  };

  updateMarkerSpeed = () => {
    // console.log('altering markers');
    let updatedLocations = this.state.locations.map(location => {
      let updatedLocation = Object.assign({}, location, {
        animation: Object.assign({}, location.animation, {
          duration: location.animation.duration + 0.5
        })
      });
      return updatedLocation;
    });
    this.setState({ locations: updatedLocations });
  };

  onMapClicked = coords => {
    console.log(`Map Clicked: app received: ${coords}`);
  };

  onMarkerClicked = id => {
    console.log(`Marker Clicked: ${id}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text
          style={{
            margin: 10,
            fontSize: 24,
            color: 'black'
          }}
        >
          Animated Map Markers App
        </Text>
        <WebViewLeaflet
          mapCenterCoords={this.state.coords}
          locations={this.state.locations}
          onMapClicked={this.onMapClicked}
          onMarkerClicked={this.onMarkerClicked}
          onWebViewReady={this.onWebViewReady}
          panToLocation={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'pink',
    display: 'flex'
  },
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight
  }
});
