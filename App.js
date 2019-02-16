import React from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import WebViewLeaflet from './WebViewLeaflet';
import testLocations from './web/testLocations';
import Button from './Button';
import mapLayers from './web/mockMapLayers';
import base64Image from './base64Image.js';
const geolib = require('geolib');
const emoji = ['🍇', '🍋', '🍐', '🍆', '🍞', '🌮'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
const imageURLs = [
  'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/00092f6ec7a911e1be6a12313820455d_7.png',
  'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/0475ea02c7da11e18cf91231380fd29b_7.png',
  'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/0502a3b2a1e111e18cf91231380fd29b_7.png',
  'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/16cb636ed3c711e1b62722000a1e8b36_7.png'
];

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

      //markers: testLocations,
      markers: [],
      currentLocation: undefined,
      mapCenterPosition: undefined,
      showEmojiSelectorModal: false,
      mapState: {
        showAttributionControl: false,
        showZoomControls: false,
        panToLocation: false,
        zoom: 10
      }
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log("getCurrentPositionAsync returned: ", { location });
    let markers = this.createRandomMarkers(location.coords, 1, 50000);
    // add some image markers

    // center random markers around Washington DC
    // let markers = this.createRandomMarkers({latitude: 38.889931, longitude: -77.009003}, 20, 10000);
    this.setState({
      markers,
      location,

      // center around Washington DC
      // coords: [38.889931, -77.009003]
      mapCenterPosition: [location.coords.latitude, location.coords.longitude],
      currentLocation: [location.coords.latitude, location.coords.longitude]
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
        id: i + 200,
        // coords: [33.946, -91.000],
        coords: [foundLatitude, foundLongitude],
        icon:base64Image,
         /*  Math.random() > 0.2
            ? emoji[Math.floor(Math.random() * emoji.length)]
            : Math.random() > 0.2
            ? base64Image
            : imageURLs[Math.floor(Math.random() * imageURLs.length)], */
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

  componentDidUpdate = (prevProps, prevState) => {};

  updateMarkerSpeed = () => {
    // // console.log('altering markers');
    let updateMarkers = this.state.markers.map((location) => {
      let updatedLocation = Object.assign({}, location, {
        animation: Object.assign({}, location.animation, {
          duration: location.animation.duration + 0.5
        })
      });
      return updatedLocation;
    });
    this.setState({ markers: updateMarkers });
  };

  onMapClicked = ({ payload }) => {
    // // debugger;
    console.log(`Map Clicked: app received: ${payload.coords}`);
    this.showAlert('Map Clicked', `Coordinates = ${payload.coords}`);
  };

  onMapMarkerClicked = ({ payload }) => {
    // // debugger;
    console.log(`Marker Clicked: ${payload.id}`);
    this.showAlert('Marker Clicked', `Marker ID = ${payload.id}`);
    this.setState(
      {
        clickedMarkerID: payload.id,
        markers: this.state.markers.map((location) => {
          if (location.id === payload.id) {
            return {
              ...location,
              icon: (location.icon = '✖️')
            };
          }
          return location;
        })
      },
      () => {
        // send the updated locations
        /* this.webViewLeaflet.sendMessage({
          locations: this.state.locations
        }); */
      }
    );
  };

  setEmojiForMarker = (emoji) => {
    // debugger;
  };
  onCloseEmojiSelectorModal = () => {
    this.setState({ showEmojiSelectorModal: false });
  };
  onOpenEmojiSelectorModal = () => {
    this.setState({ showEmojiSelectorModal: true });
  };

  showAlert = (title, body) => {
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  onZoomLevelsChange = (event) => {
    // console.log("onZoomLevelsChange received : ", event);
  };
  onResize = (event) => {
    // console.log("onResize received : ", event);
  };
  onUnload = (event) => {
    // console.log("onUnload received : ", event);
  };
  onViewReset = (event) => {
    // console.log("onViewReset received : ", event);
  };
  onLoad = (event) => {
    // console.log('onLoad received ');
    this.setState({
      ...this.state,
      mapState: { ...this.state.mapState, mapLoaded: true }
    });
    setTimeout(() => {
      this.setState({
        bounds: [
          [56.8859948, -76.91253011988012],
          [50.07467659353497, -76.4096857]
        ],
        boundsOptions: { padding: [50, 50] }
      });
    }, 5000);
  };
  onZoomStart = (event) => {
    // console.log("onZoomEnd received : ", event);
  };
  onMoveStart = (event) => {
    // console.log("onMoveStart received : ", event);
  };
  onZoom = (event) => {
    // console.log("onZoom received : ", event);
  };
  onMove = (event) => {
    // console.log("onMove received : ", event);
  };
  onZoomEnd = (event) => {
    // console.log("onZoomEnd received : ", event);
  };
  onMoveEnd = () => {
    // have to set the bounds at the end of the initial onMove event
    if (!this.state.initialBoundsSet) {
      // this.setBoundsForAllMarkers();
      this.setState({ initialBoundsSet: true });
    }
  };

  onCurrentPositionClicked = () => {
    // console.log("onCurrentPositionClicked received");
  };

  centerMap = (parkInitials) => {
    // console.log(parkInitials);
    switch (parkInitials) {
      case 'dw':
        this.setState({ mapCenterPosition: parkLocations.dw });
        break;
      case 'bg':
        this.setState({ mapCenterPosition: parkLocations.bg });
        break;
      case 'kd':
        this.setState({ mapCenterPosition: parkLocations.kd });
        break;
    }
  };

  // update the map object in the component's state
  onUpdateMapState = (data) => {
    this.setState({
      ...this.state,
      mapState: { ...this.mapState, ...data }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text
          style={{
            margin: 10,
            fontSize: 18,
            color: 'black'
          }}
        >
          react-native-webview-leaflet Demo
        </Text>
        <WebViewLeaflet
          ref={(component) => (this.webViewLeaflet = component)}
          onLoad={this.onLoad}
          eventReceiver={this} // the component that will receive map events
          centerPosition={this.state.mapCenterPosition}
          markers={this.state.markers}
          mapLayers={mapLayers}
          ownPositionMarker={{
            coords: this.state.currentLocation,
            icon: '❤️',
            size: [24, 24],
            animation: {
              name: 'pulse',
              duration: '.5',
              delay: 0,
              interationCount: 'infinite'
            }
          }}
          centerButton={true}
          useMarkerClustering={true}
          bounds={this.state.bounds}
          boundsOptions={{ padding: [100, 100] }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor: 'rgba(255,255,255,.50)'
          }}
        >
          <Button
            onPress={() => this.centerMap('dw')}
            borderWidth={0}
            fontSize={30}
            text={'🏰'}
          />
          <Button
            onPress={() => this.centerMap('bg')}
            borderWidth={0}
            fontSize={30}
            text={'🍺'}
          />
          <Button
            onPress={() => this.centerMap('kd')}
            borderWidth={0}
            fontSize={30}
            text={'👑'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00ffff',

    display: 'flex'
  },
  statusBar: {
    height: Constants.statusBarHeight
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'dodgerblue'
  }
});
