import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import WebViewLeaflet from './WebViewLeaflet';
import locations from './locations';

const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    locations,
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
    this.setState({
      location,
      coords: [location.coords.latitude, location.coords.longitude]
    });
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
