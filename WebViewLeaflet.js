import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  WebView,
  Alert,
  Platform,
  Touchable
} from 'react-native';
import PropTypes from 'prop-types';
import renderIf from 'render-if';
import Button from './Button';
import Expo from 'expo';
const isValidCoordinates = require('is-valid-coordinates');
const uniqby = require('lodash.uniqby');
const INDEX_FILE = require(`./assets/dist/index.html`);
const MESSAGE_PREFIX = 'react-native-webview-leaflet';
// const index = Expo.Asset.fromModule(require('./assets/dist/index.html')).uri

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.remote = null;
    // this.setInitialMapState = this.setInitialMapState.bind(this);
    this.webview = null;
    this.state = {
      downloadCompleted: false,
      webViewNotLoaded: true,
      mapNotLoaded: true,
      currentPosition: null,
      locations: []
    };
  }

  componentDidMount = () => {
    this.setState({ currentPosition: this.props.currentPosition });
  };

  onWebViewLoaded = () => {
    this.setState(
      {
        webViewNotLoaded: false
      },
      () => {
        // tell the map to load with the map initialization options
        this.sendMessage('LOAD_MAP', {
          defaultIconSize: this.props.defaultIconSize,
          showMapAttribution: this.props.showMapAttribution,
          currentPosition: this.props.currentPosition,
          zoom: this.props.zoom,
          showZoomControls: this.props.showZoomControls,
          currentPositionMarkerStyle: this.props.currentPositionMarkerStyle
        });
        // let the parent know the webview is ready
        // put this inside the set state callback to prevent parent
        // from trying to send a message before the webview thinks the map
        // is ready
        if (this.props.hasOwnProperty('onWebViewReady')) {
          this.props.onWebViewReady();
        }
      }
    );
  };

  // called after the map is loaded
  initializeMapAfterLoading = () => {
    if (this.props.hasOwnProperty('locations')) {
      // validate the location coordinates
      const newLocations = this.props.locations;
      this.validateLocations(newLocations);
    }
    if (this.props.hasOwnProperty('zoom')) {
      this.sendZoom(this.props.zoom);
    }
  };

  centerMapOnCurrentPosition = () => {
    if (
      isValidCoordinates(
        this.props.currentPosition[1],
        this.props.currentPosition[0]
      )
    ) {
      this.sendMessage('CENTER_MAP_ON_CURRENT_POSITION', {
        currentPosition: this.props.currentPosition,
        panToLocation: this.props.panToLocation
      });
    }
  };

  sendLocations = (markers) => {
    this.sendMessage('UPDATE_MARKERS', { markers });
  };

  sendZoom = (zoom) => {
    this.sendMessage('SET_ZOOM', { zoom });
  };

  sendShowZoomControls = (showZoomControls) => {
    this.sendMessage('SHOW_ZOOM_CONTROLS', { showZoomControls });
  };

  // sent after the map is loaded
  sendShowMapAttribution = () => {
    this.sendMessage('SHOW_MAP_ATTRIBUTION');
  };

  // sent after the map is loaded
  sendGetMap = () => {
    this.sendMessage('GET_MAP');
  };

  //
  handleMessage = (event) => {
    let msgData;
    console.log(`WebViewLeaflet: handleMessage called: `, event);

    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        // // console.log(`WebViewLeaflet: received message ${msgData.type}`);
        // this.sendMessage("MESSAGE_ACKNOWLEDGED");

        switch (msgData.type) {
        case 'MAP_LOADED':
          // // console.log('MAP_LOADED');
          this.setState({ mapNotLoaded: false });
          if (this.props.hasOwnProperty('onLoad')) {
            this.props.onLoad(msgData.payload);
          }
          this.initializeMapAfterLoading();
          break;
        case 'MAP_SENT':
          this.props.getMapCallback(msgData.payload.map);
          break;
        case 'MARKER_CLICKED':
          if (this.props.hasOwnProperty('onMarkerClicked')) {
            // console.log('Received MARKER_CLICKED');
            // console.log(msgData);
            this.props.onMarkerClicked(msgData.payload.id);
          }
          break;

        case 'MAP_CLICKED':
          if (this.props.hasOwnProperty('onMapClicked')) {
            // console.log('Received MAP_CLICKED');
            // console.log(msgData);

            this.props.onMapClicked([
              msgData.payload.coords.lat,
              msgData.payload.coords.lng
            ]);
          }
          break;
        case 'CONSOLE_LOG':
          // console.log('From Webview: ', msgData.payload.msg);
          break;

        case 'ZOOM_LEVELS_CHANGE':
          if (this.props.hasOwnProperty('onZoomLevelsChange')) {
            this.props.onZoomLevelsChange(msgData.payload);
          }
          break;
        case 'RESIZE':
          if (this.props.hasOwnProperty('onResize')) {
            this.props.onResize(msgData.payload);
          }
          break;
        case 'UNLOAD':
          if (this.props.hasOwnProperty('onUnload')) {
            this.props.onUnload(msgData.payload);
          }
          break;
        case 'VIEW_RESET':
          if (this.props.hasOwnProperty('onViewReset')) {
            this.props.onViewReset(msgData.payload);
          }
          break;
        case 'LOAD':
          if (this.props.hasOwnProperty('onLoad')) {
            this.props.onLoad(msgData.payload);
          }
          break;
        case 'MOVE_START':
          if (this.props.hasOwnProperty('onMoveStart')) {
            this.props.onMoveStart(msgData.payload);
          }
          break;
        case 'ZOOM_START':
          if (this.props.hasOwnProperty('onZoomStart')) {
            this.props.onZoomStart(msgData.payload);
          }
          break;
        case 'ZOOM':
          if (this.props.hasOwnProperty('onZoom')) {
            this.props.onZoom(msgData.payload);
          }
          break;
        case 'MOVE':
          if (this.props.hasOwnProperty('onMove')) {
            this.props.onMove(msgData.payload);
          }
          break;
        case 'ZOOM_END':
          if (this.props.hasOwnProperty('onZoomEnd')) {
            this.props.onZoomEnd(msgData.payload);
          }
          break;
        case 'MOVE_END':
          if (this.props.hasOwnProperty('onMoveEnd')) {
            this.props.onMoveEnd(msgData.payload);
          }
          break;
        case 'CURRENT_POSITION_MARKER_CLICKED':
          if (this.props.hasOwnProperty('onCurrentPositionClicked')) {
            this.props.onCurrentPositionClicked();
          }
          break;
        default:
          console.warn(
            `WebViewLeaflet Error: Unhandled message type received "${JSON.stringify(
              msgData
            )}"`
          );
        }
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  sendMessage = (type, payload) => {
    // only send message when webview is loaded
    if (!this.state.webViewNotLoaded) {
      console.log(
        `WebViewLeaflet: sending message ${type}, ${
          payload ? JSON.stringify(payload) : ''
        }`
      );
      this.webview.postMessage(
        JSON.stringify({
          prefix: MESSAGE_PREFIX,
          type,
          payload
        }),
        '*'
      );
    }
  };

  createWebViewRef = (webview) => {
    this.webview = webview;
  };

  coordinateValidation = (lat, long) => {
    if (isValidCoordinates(long, lat)) {
      return [lat, long];
    } else {
      // console.log(`WebViewLeaflet: Invalid coords received ${[lat, long]}`);
      return false;
    }
  };

  fitBounds = (bounds, padding) => {
    this.sendMessage('FIT_BOUNDS', { bounds, padding });
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.currentPosition &&
      JSON.stringify(this.state.currentPosition) !==
        JSON.stringify(nextProps.currentPosition)
    ) {
      if (this.props.currentPosition.length > 0) {
        const lat = nextProps.currentPosition[0];
        const long = nextProps.currentPosition[1];
        if (this.coordinateValidation(lat, long)) {
          this.setState({ currentPosition: [lat, long] }, () => {
            this.sendUpdatedCurrentPositionToHTML();
          });
        }
      }
    }

    if (!this.state.webViewNotLoaded) {
      if (
        nextProps.hasOwnProperty('locations') &&
        JSON.stringify(this.state.locations) !==
          JSON.stringify(nextProps.locations)
      ) {
        const newLocations = nextProps.locations;
        this.validateLocations(newLocations);
      }
    }
  };

  sendUpdatedCurrentPositionToHTML = () => {
    this.sendMessage('CENTER_MAP_ON_CURRENT_POSITION', {
      currentPosition: this.state.currentPosition,
      panToLocation: this.props.panToLocation
    });
  };

  validateLocations = (locations) => {
    // confirm the location coordinates are valid
    const validCoordLocations = locations.filter((location) => {
      return this.coordinateValidation(location.coords[0], location.coords[1]);
    });
    // remove any locations that are already in the component state's "locations"
    // create a new array containing all the locations
    let combinedArray = [...this.state.locations, ...validCoordLocations];
    // remove duplicate locations
    const deDupedLocations = uniqby(combinedArray, 'id');
    this.sendLocations(deDupedLocations);
    this.setState({ locations: deDupedLocations });
  };

  showLoadingIndicator = () => {
    return (
      <View style={styles.activityOverlayStyle}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            animating={this.state.webViewNotLoaded}
          />
        </View>
      </View>
    );
  };

  onError = (error) => {
    Alert.alert('WebView onError', error, [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ]);
    console.error('WebView onError: ', error);
  };

  renderError = (error) => {
    Alert.alert('WebView renderError', error, [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ]);
    console.error('WebView renderError: ', error);
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
            ref={this.createWebViewRef}
            source={INDEX_FILE}
            onLoadEnd={this.onWebViewLoaded}
            onMessage={this.handleMessage}
            startInLoadingState={true}
            renderLoading={this.showLoadingIndicator}
            renderError={this.renderError}
            javaScriptEnabled={true}
            onError={this.onError}
            scalesPageToFit={false}
            mixedContentMode={'always'}
          />
          {renderIf(this.props.centerButton)(
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
          )}
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
