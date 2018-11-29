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
import { Asset } from 'expo';

const util = require('util');
const isValidCoordinates = require('is-valid-coordinates');
const uniqby = require('lodash.uniqby');

// look up these issues related to including index.html
// https://github.com/facebook/react-native/issues/8996
// https://github.com/facebook/react-native/issues/16133

const INDEX_FILE_PATH = `./assets/dist/index.html`;
const INDEX_FILE_ASSET_URI = Asset.fromModule(require(INDEX_FILE_PATH)).uri;

// const INDEX_FILE = require(INDEX_FILE_PATH);
const MESSAGE_PREFIX = 'react-native-webview-leaflet';

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      webviewErrorMessages: [],
      hasError: false,
      hasErrorMessage: '',
      hasErrorInfo: ''
    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true,
      hasErrorMessage: error,
      hasErrorInfo: info
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    // check that centerPosition prop exists,
    // that the current centerPosition does not equal the previous one,
    // and that the centerPosition is a valid lat, lng
    // if so, send a message to the map to update its current position
    if (
      this.props.centerPosition &&
      this.props.centerPosition.length == 2 &&
      prevProps.centerPosition !== this.props.centerPosition
    ) {
      if (
        isValidCoordinates(
          this.props.centerPosition[1],
          this.props.centerPosition[0]
        )
      ) {
        this.sendMessage({ centerPosition: this.props.centerPosition });
        // store the center position so that we can ensure the map gets it upon
        // its loading since it is possible that the position might
        // be availible before the map has been loaded
        this.setState({ centerPosition: this.props.centerPosition });
      } else {
        console.warn(
          'Invalid coordinates provided to centerPosition: ',
          this.props.centerPosition
        );
      }
    }

    // handle updates to own position
    if (
      this.props.ownPositionMarker &&
      this.props.ownPositionMarker.coords &&
      this.props.ownPositionMarker.coords.length === 2 &&
      JSON.stringify(prevProps.ownPositionMarker) !== JSON.stringify(this.props.ownPositionMarker)
    ) {
      
      if (
        isValidCoordinates(
          this.props.ownPositionMarker.coords[1],
          this.props.ownPositionMarker.coords[0]
        )
      ) {
        console.log('****** sending position');
        // this.sendMessage({ ownPositionMarker: this.props.ownPositionMarker });
        // store the center position so that we can ensure the map gets it upon
        // its loading since it is possible that the position might
        // be availible before the map has been loaded
        this.setState({ ownPositionMarker: this.props.ownPositionMarker });
      } else {
        console.warn(
          'Invalid coordinates provided to ownPositionMarker: ',
          this.props.ownPositionMarker.coords
        );
      }
    }

    // handle updates to map markers array
    if (this.props.markers && prevProps.markers !== this.props.markers) {
      // debugger;
      let validLocations = this.props.markers.filter((marker) => {
        if (!marker || !marker.coords || marker.coords.length !== 2)
          return false;
        return isValidCoordinates(marker.coords[1], marker.coords[0]);
      });
      this.sendMessage({ locations: validLocations });
      // store the center position so that we can ensure the map gets it upon
      // its loading since it is possible that the position might
      // be availible before the map has been loaded
      this.setState({ locations: validLocations });
    }

    if ((this.props.useMarkerClustering)&&
    (this.props.useMarkerClustering!== prevProps.useMarkerClustering)) {
      this.sendMessage({ useMarkerClustering: this.props.useMarkerClustering });
    }

    // do the same for using map bounds
    
    if (
      this.props.hasOwnProperty('bounds') &&
      this.props.bounds !== prevProps.bounds
    ) {
      this.sendMessage({ bounds: this.props.bounds });
    }

     // do the same for using map boundsOptions
    if (
      this.props.hasOwnProperty('boundsOptions') &&
      this.props.boundsOptions !== prevProps.boundsOptions
    ) {
      this.sendMessage({ boundsOptions: this.props.boundsOptions });
    }
    // actions to be performed one time immediately after the map
    // completes loading
    if (!prevState.mapLoaded && this.state.mapLoaded) {
      this.doPostMapLoadedActions();
    }
  };

  doPostMapLoadedActions = () => {
    // Here is our chance to send stuff to the map once it has loaded
    // Create an object that will have the update that the map will
    // get once it has loaded
    let onMapLoadedUpdate = {
      mapLayers: this.props.mapLayers
    };
    // Check the state for any items that may have been received prior to
    // the map loading, and send them to the map
    // check if we have a center position
    if (
      this.props.centerPosition &&
      this.props.centerPosition.length === 2 &&
      isValidCoordinates(
        this.props.centerPosition[1],
        this.props.centerPosition[0]
      )
    ) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        centerPosition: this.props.centerPosition
      };
    }

    // do the same for ownPostionMarker
    if (
      this.props.ownPositionMarker &&
      this.props.ownPositionMarker.coords &&
      this.props.ownPositionMarker.coords.length == 2 &&
      isValidCoordinates(
        this.props.ownPositionMarker.coords[1],
        this.props.ownPositionMarker.coords[0]
      )
    ) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        ownPositionMarker: this.props.ownPositionMarker
      };
    }

    // do the same for map markers
    if (this.props.markers) {
      let validLocations = this.props.markers.filter((marker) => {
        if (!marker || !marker.coords || marker.coords.length !== 2)
          return false;
        return isValidCoordinates(marker.coords[1], marker.coords[0]);
      });
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        locations: validLocations
      };
    }
    // do the same for zoom
    if (this.props.zoom) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        zoom: this.props.zoom
      };
    }

    // do the same for using marker clustering
    if (this.props.useMarkerClustering) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        useMarkerClustering: this.props.useMarkerClustering
      };
    }

    // do the same for using map bounds
    if (this.props.bounds) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        ...{ bounds: this.props.bounds }
      };
    }

    if (this.props.boundsOptions) {
      onMapLoadedUpdate = {
        ...onMapLoadedUpdate,
        ...{ boundsOptions: this.props.boundsOptions }
      };
    }

    if (Object.keys(onMapLoadedUpdate).length > 0) {
      // console.log({ onMapLoadedUpdate });
      this.sendMessage(onMapLoadedUpdate);
    }
  };

  // data to send is an object containing key value pairs that will be
  // spread into the destination's state
  sendMessage = (payload) => {
    if (this.state.mapLoaded) {
      // only send message when webview is loaded

      const message = JSON.stringify({
        prefix: MESSAGE_PREFIX,
        payload
      });

      // If the user has sent a centering messaging, then store the location
      // so that we can refer to it later if the built in centering button
      // is pressed
      /* if (payload.centerPosition) {
        this.setState({ centerPosition: payload.centerPosition });
      } */
      // console.log(`WebViewLeaflet: sending message: `, JSON.stringify(message));
      this.webview.postMessage(message, '*');
    }
  };

  //
  handleMessage = (data) => {
    let msgData;
    // console.log({ data });
    msgData = JSON.parse(data);
    if (msgData.hasOwnProperty('prefix') && msgData.prefix === MESSAGE_PREFIX) {
      // console.log(`WebViewLeaflet: received message: `, msgData.payload);

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
    this.setState({
      webviewErrorMessages: [...this.state.webviewErrorMessages, error]
    });
  };

  renderError = (error) => {
    this.setState({
      webviewErrorMessages: [...this.state.webviewErrorMessages, error]
    });
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

  maybeRenderMap = () => {
    return (
      <WebView
        style={{
          ...StyleSheet.absoluteFillObject
        }}
        ref={(ref) => {
          this.webview = ref;
        }}
        /* source={INDEX_FILE} */
        source={
          Platform.OS === 'ios'
            ? require('./assets/dist/index.html')
            : { uri: INDEX_FILE_ASSET_URI }
        }
        startInLoadingState={true}
        renderLoading={this.renderLoading}
        renderError={(error) => {
          console.log(
            'RENDER ERROR: ',
            util.inspect(error, {
              showHidden: false,
              depth: null
            })
          );
        }}
        javaScriptEnabled={true}
        onError={(error) => {
          console.log(
            'ERROR: ',
            util.inspect(error, {
              showHidden: false,
              depth: null
            })
          );
        }}
        scalesPageToFit={false}
        mixedContentMode={'always'}
        onMessage={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.data) {
            this.handleMessage(event.nativeEvent.data);
          }
        }}
        onLoadStart={() => {}}
        onLoadEnd={() => {
          if (this.props.eventReceiver.hasOwnProperty('onLoad')) {
            this.props.eventReceiver.onLoad();
          }
          // Set the component state to showw that the map has been loaded.
          // This will let us do things during component update once the map
          // is loaded.
          this.setState({ mapLoaded: true });
        }}
        domStorageEnabled={true}
      />
    );
  };

  maybeRenderWebviewError = () => {
    if (this.state.webviewErrorMessages.length > 0) {
      return (
        <View style={{ zIndex: 2000, backgroundColor: 'orange', margin: 4 }}>
          {this.state.webviewErrorMessages.map((errorMessage, index) => {
            return <Text key={index}>{errorMessage}</Text>;
          })}
        </View>
      );
    }
    return null;
  };

  maybeRenderErrorBoundaryMessage = () => {
    if (this.state.hasError)
      return (
        <View style={{ zIndex: 2000, backgroundColor: 'red', margin: 5 }}>
          {util.inspect(this.state.webviewErrorMessages, {
            showHidden: false,
            depth: null
          })}
        </View>
      );
    return null;
  };

  renderCenterOnOwnPositionMarkerButton = () => {
    if (this.props.ownPositionMarker) {
      if (
        this.props.ownPositionMarker.coords &&
        this.props.ownPositionMarker.coords.length == 2 &&
        isValidCoordinates(
          this.props.ownPositionMarker.coords[1],
          this.props.ownPositionMarker.coords[0]
        )
      ) {
        return (
          <View
            style={{
              position: 'absolute',
              right: 10,
              bottom: 20,
              padding: 10
            }}
          >
            <Button
              onPress={() => {
                this.sendMessage({
                  centerPosition: this.props.ownPositionMarker.coords
                });
              }}
              text={'🎯'}
            />
          </View>
        );
      }
      return null;
    } else {
      console.warn(
        "Prop 'ownPositionMarker' must be passed in order to display the center on own position button."
      );
      return null;
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#fff1ad'
          }}
        >
          {this.maybeRenderMap()}
          {this.maybeRenderErrorBoundaryMessage()}
          {this.maybeRenderWebviewError()}
          {this.props.centerButton
            ? this.renderCenterOnOwnPositionMarkerButton()
            : null}
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
  centerButton: false,
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
  },
  useMarkerClustering: false
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
