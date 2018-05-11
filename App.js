import React from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import WebViewLeaflet from './WebViewLeaflet';
import testLocations from './web/testLocations';

const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
let parkLocations = {
  dw: [28.417839, -81.563808],
  bg: [37.23416573, -76.63999744],
  kd: [37.837329984, -77.440331572]
};

const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const interationCount = 'infinite';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: null,
      locations: [...testLocations],
      coords: []
    };
  }

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
    let locations = this.createRandomMarkers(location.coords, 0, 50000);

    // center random markers around Washington DC
    // let locations = this.createRandomMarkers({latitude: 38.889931, longitude: -77.009003}, 20, 10000);

    this.setState({
      locations: [...this.state.locations, ...locations],
      location,

      // center around Washington DC
      // coords: [38.889931, -77.009003]
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
        id: i,
        // coords: [33.946, -91.000],
        coords: [foundLatitude, foundLongitude],
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
    let updatedLocations = this.state.locations.map((location) => {
      let updatedLocation = Object.assign({}, location, {
        animation: Object.assign({}, location.animation, {
          duration: location.animation.duration + 0.5
        })
      });
      return updatedLocation;
    });
    this.setState({ locations: updatedLocations });
  };

  onMapClicked = (coords) => {
    console.log(`Map Clicked: app received: ${coords}`);
    this.showAlert('Map Clicked', `Coordinates = ${coords}`);
  };

  onMarkerClicked = (id) => {
    console.log(`Marker Clicked: ${id}`);
    this.showAlert('Marker Clicked', `Marker ID = ${id}`);
  };

  showAlert = (title, body) => {
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  getMapCallback = (map) => {
    console.log('getMapCallback received : ', map);
  };
  onZoomLevelsChange = (event) => {
    console.log('onZoomLevelsChange received : ', event);
  };
  onResize = (event) => {
    console.log('onResize received : ', event);
  };
  onUnload = (event) => {
    console.log('onUnload received : ', event);
  };
  onViewReset = (event) => {
    console.log('onViewReset received : ', event);
  };
  onLoad = (event) => {
    console.log('onLoad received : ', event);
  };
  onZoomStart = (event) => {
    console.log('onZoomEnd received : ', event);
  };
  onMoveStart = (event) => {
    console.log('onMoveStart received : ', event);
  };
  onZoom = (event) => {
    console.log('onZoom received : ', event);
  };
  onMove = (event) => {
    console.log('onMove received : ', event);
  };
  onZoomEnd = (event) => {
    console.log('onZoomEnd received : ', event);
  };
  onMoveEnd = (event) => {
    console.log('onMoveEnd received : ', event);
  };

  onCurrentPositionClicked=()=>{
    console.log('onCurrentPositionClicked received');
  }

  centerMap = (parkInitials) => {
    console.log(parkInitials);
    switch (parkInitials) {
    case 'dw':
      this.setState({ coords: parkLocations.dw });
      break;
    case 'bg':
      this.setState({ coords: parkLocations.bg });
      break;
    case 'kd':
      this.setState({ coords: parkLocations.kd });
      break;
    }
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
          currentPosition={this.state.coords}
          locations={this.state.locations}
          onMapClicked={this.onMapClicked}
          onMarkerClicked={this.onMarkerClicked}
          onWebViewReady={this.onWebViewReady}
          panToLocation={false}
          zoom={10}
          showZoomControls={true}
          onZoomLevelsChange={this.onZoomLevelsChange}
          onResize={this.onResize}
          onUnload={this.onUnload}
          onViewReset={this.onViewReset}
          onLoad={this.onLoad}
          onZoomStart={this.onZoomStart}
          onMoveStart={this.onMoveStart}
          onZoom={this.onZoom}
          onMove={this.onMove}
          onZoomEnd={this.onZoomEnd}
          onMoveEnd={this.onMoveEnd}
          showMapAttribution={true}
          defaultIconSize={[16, 16]}
          onCurrentPositionClicked={this.onCurrentPositionClicked}
          currentPositionMarkerStyle= {{
            icon: '🍇',
            animation: {
              name: 'beat',
              duration: 0.25,
              delay: 0,
              interationCount: 'infinite',
              direction: 'alternate'
            },
            size: [36, 36]
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Button onPress={() => this.centerMap('dw')} text={'🏰'} />
          <Button onPress={() => this.centerMap('bg')} text={'🍺'} />
          <Button onPress={() => this.centerMap('kd')} text={'👑'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ccccff',
    display: 'flex'
  },
  statusBar: {
    height: Constants.statusBarHeight
  }
});
