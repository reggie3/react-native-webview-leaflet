import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  WebView,
  Platform,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

const isValidCoordinates = require('is-valid-coordinates');
const uniqby = require('lodash.uniqby');
const INDEX_FILE = require(`./assets/dist/index.html`);
// const INDEX_FILE ={uri: 'https://github.com/facebook/react-native'};
const MESSAGE_PREFIX = 'react-native-webview-leaflet';
// const index = Expo.Asset.fromModule(require('./assets/dist/index.html')).uri

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false
    };
  }

  // data to send is an object containing key value pairs that will be
  // spread into the destination's state
  sendMessage = (payload) => {
    // if (this.state.mapLoaded) {
    // only send message when webview is loaded
    const message = JSON.stringify({
      prefix: MESSAGE_PREFIX,
      payload
    });

    console.log(`WebViewLeaflet: sending message: `, JSON.stringify(message));
    this.webview.postMessage(message, '*');
    // }
  };

  //
  handleMessage = (event) => {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        console.log(`WebViewLeaflet: received message: `, msgData.payload);

        // if we receive an event, then pass it to the parent by calling
        // the parent function wtith the same name as the event, and passing
        // the entire payload as a parameter
        if (
          msgData.payload.event &&
          this.props.eventReceiver.hasOwnProperty(msgData.payload.event)
        ) {
          this.props.eventReceiver[msgData.payload.event](msgData.payload);
        }
        // WebViewLeaflet will also need to know of some state changes, such as
        // when the mapComponent is mounted
        else {
          this.props.eventReceiver.setState({
            state: {
              ...this.props.eventReceiver.state,
              mapState: {
                ...this.props.eventReceiver.mapState,
                ...msgData.payload
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  validateLocations = (locations) => {
    // confirm the location coordinates are valid
    const validCoordLocations = locations.filter((location) => {
      return isValidCoordinates(location.coords[1], location.coords[0]);
    });
    // remove any locations that are already in the component state's "locations"
    // create a new array containing all the locations
    let combinedArray = [...this.state.locations, ...validCoordLocations];
    // remove duplicate locations
    const deDupedLocations = uniqby(combinedArray, 'id');
    this.sendLocations(deDupedLocations);
    this.setState({ locations: deDupedLocations });
  };

  onError = (error) => {
    return (
      <View style={styles.activityOverlayStyle}>
        <Text>WebViewError</Text>
        <Text>{error}</Text>
      </View>
    );
  };

  renderError = (error) => {
    return (
      <View style={styles.activityOverlayStyle}>
        <Text>RenderError</Text>
        <Text>{error}</Text>
      </View>
    );
  };

  renderLoadingIndicator = () => {
    return (
      <View style={styles.activityOverlayStyle}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            animating={!this.props.eventReceiver.state.mapsState.mapLoaded}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          <WebView
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            ref={(ref) => {
              this.webview = ref;
            }}
            source={INDEX_FILE}
            onLoadEnd={this.onWebViewLoaded}
            onMessage={this.handleMessage}
            startInLoadingState={true}
            renderLoading={this.renderLoading}
            renderError={this.renderError}
            javaScriptEnabled={true}
            onError={this.onError}
            scalesPageToFit={false}
            mixedContentMode={'always'}
          />
          {this.props.centerButton ? (
            <View
              style={{
                position: 'absolute',
                right: 10,
                bottom: 20,
                padding: 10
              }}
            >
              <Button onPress={this.centerMapOnCurrentPosition} text={'🎯'} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

WebViewLeaflet.propTypes = {
  defaultIconSize: PropTypes.array,
  currentPosition: PropTypes.array,
  locations: PropTypes.array,
  onMapClicked: PropTypes.func,
  onMarkerClicked: PropTypes.func,
  onWebviewReady: PropTypes.func,
  panToLocation: PropTypes.bool,
  zoom: PropTypes.number,
  showZoomControls: PropTypes.bool,
  centerButton: PropTypes.bool,
  showMapAttribution: PropTypes.bool,
  currentPositionMarkerStyle: PropTypes.object,
  onCurrentPositionClicked: PropTypes.func
};

WebViewLeaflet.defaultProps = {
  defaultIconSize: [36, 36],
  zoom: 5,
  showZoomControls: true,
  centerButton: true,
  panToLocation: false,
  showMapAttribution: false,
  currentPosition: [38.89511, -77.03637],
  currentPositionMarkerStyle: {
    icon: '❤️',
    animation: {
      name: 'beat',
      duration: 0.25,
      delay: 0,
      interationCount: 'infinite',
      direction: 'alternate'
    },
    size: [36, 36]
  }
};

const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#2196F3',
      borderRadius: 2
    }
  })
});
