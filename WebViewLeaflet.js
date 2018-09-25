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
import Sentry from 'sentry-expo';
import {Asset} from 'expo';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;
Sentry.config(
  'https://7b95bce77b1d4dbbaf10a8569f60c5f3@sentry.io/1286693'
).install();

const util = require('util');
const isValidCoordinates = require('is-valid-coordinates');
const uniqby = require('lodash.uniqby');

// look up these issues related to including index.html
// https://github.com/facebook/react-native/issues/8996
// https://github.com/facebook/react-native/issues/16133

const INDEX_FILE_PATH=`./assets/dist/index.html`;
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
/*     Sentry.captureMessage('INDEX_FILE: ' + util.inspect(INDEX_FILE, {
      showHidden: false,
      depth: null
    })) */
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true,
      hasErrorMessage: error,
      hasErrorInfo: info
    });
    // You can also log the error to an error reporting service
    /* Sentry.configureScope((scope) => {
      Object.keys(info).forEach((key) => {
        scope.setExtra(key, info[key]);
      });
    }); */
    Sentry.captureException(error);
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
    if(event && event.nativeData && event.nativeData.data){
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
    Sentry.captureMessage('rendering map in WebViewLeflet');
    return (
      <WebView
        style={{
          ...StyleSheet.absoluteFillObject
        }}
        ref={(ref) => {
          this.webview = ref;
        }}
        /* source={INDEX_FILE} */
        source={Platform.OS === 'ios' ? require('./assets/dist/index.html') : {uri: INDEX_FILE_ASSET_URI}}
        startInLoadingState={true}
        renderLoading={this.renderLoading}
        renderError={(error)=>{
          Sentry.captureMessage('RENDER ERROR: ' +  util.inspect(error, {
            showHidden: false,
            depth: null
          }));
        }}
        javaScriptEnabled={true}
        onError={(error)=>{
          Sentry.captureMessage('ERROR: ' +  util.inspect(error, {
            showHidden: false,
            depth: null
          }));
        }}
        scalesPageToFit={false}
        mixedContentMode={'always'}
        onMessage={() => {
          Sentry.captureMessage('onMessage called');
          this.handleMessage();
        }}
        onLoadStart={() => {
          Sentry.captureMessage('onLoadStart called');
        }}
        onLoadEnd={() => {
          Sentry.captureMessage('onLoadEnd called');
          if (this.props.eventReceiver.hasOwnProperty('onLoad')) {
            this.props.eventReceiver.onLoad();
          }
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
          <Button
            onPress={() => Sentry.showReportDialog()}
            title="Report feedback"
          />
        </View>
      );
    return null;
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
