import React from './react.production.min.js';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  WebView,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import renderIf from 'render-if';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import * as webViewDownloadHelper from './webViewDownloadHelper';
import { FileSystem } from 'expo';
const Rollbar = require('rollbar');
import * as secrets from './secrets';

const rollbar = new Rollbar({
  accessToken: secrets.rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true
});

const PACKAGE_NAME = 'react-native-webview-leaflet';
const PACKAGE_VERSION = '0.0.71';
const INDEX_FILE_PATH = `${
  FileSystem.documentDirectory
}${PACKAGE_NAME}/${PACKAGE_VERSION}/index.html`;
const MESSAGE_PREFIX = 'react-native-webview-leaflet';
const fileURLs = [
  'https://raw.githubusercontent.com/reggie3/react-native-webview-leaflet/master/dist/index.html',
  'https://raw.githubusercontent.com/reggie3/react-native-webview-leaflet/master/dist/main.bundle.js'
];
RkTheme.setType('RkButton', 'mimicLeafletButton', {
  fontSize: 22,
  width: 50,
  borderRadius: 2,
  hitSlop: { top: 5, left: 5, bottom: 5, right: 5 },
  backgroundColor: 'rgb(255,255,255)',
  borderColor: 'rgb(200,200,200)',
  borderWidth: 1,
  borderRadius: 4,
  margin: 0
});

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.remote = null;
    // this.setInitialMapState = this.setInitialMapState.bind(this);
    this.webview = null;
    this.state = {
      filesDownloaded: false,
      downloadCompleted: false,
      webViewNotLoaded: true,
      webViewFilesNotAvailable: true,
      mapCenterCoords: null,
      locations: []
    };
  }

  componentDidMount() {
    // this.downloadWebViewFiles();
  }

  downloadWebViewFiles = async () => {
    let downloadStatus = await webViewDownloadHelper.checkForFiles(
      PACKAGE_NAME,
      PACKAGE_VERSION,
      fileURLs,
      this.webViewDownloadStatusCallBack
    );
    if (downloadStatus.success) {
      filesNotLoaded = false;
    } else {
      rollbar.error(
        `unable to download html files: ${JSON.stringify(downloadStatus)}`
      );
      Alert.alert(
        'Error',
        `unable to download html files: ${JSON.stringify(downloadStatus)}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
    debugger;
  };

  webViewDownloadStatusCallBack = message => {
    console.log(mesage);
  };

  sendUpdatedMapCenterCoordsToHTML = () => {
    console.log(`updating coords ${this.props.mapCenterCoords}`);
    this.sendMessage('MAP_CENTER_COORD_CHANGE', {
      mapCenterCoords: this.props.mapCenterCoords,
      panToLocation: this.props.panToLocation
    });
  };

  sendLocations = markers => {
    this.sendMessage('UPDATE_MARKERS', { markers });
  };

  /*   setInitialMapState = () => {
    console.log('setting initial map state');
    this.setState({
      webviewIsLoaded: true,
      showActivityIndicator: false
    });
    if (this.props.mapCenterCoords) {
      this.sendUpdatedMapCenterCoordsToHTML(this.props.mapCenterCoords);
    }
    if (this.props.hasOwnProperty('locations')) {
      this.sendLocations(this.props.locations);
    }
  }; */

  handleMessage = event => {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        console.log(`WebViewLeaflet: received message ${msgData.type}`);
        this.sendMessage('MESSAGE_ACKNOWLEDGED');

        switch (msgData.type) {
          // receive an event when the webview is ready
          /*  case 'WEBVIEW_READY':
            console.log('Received Webview Ready');
            this.setInitialMapState();
            break; */

          case 'MARKER_CLICKED':
            console.log('Received MARKER_CLICKED');
            console.log(msgData);
            this.props.onMarkerClicked(msgData.payload.id);
            break;

          case 'MAP_CLICKED':
            console.log('Received MAP_CLICKED');
            console.log(msgData);
            this.props.onMapClicked([
              msgData.payload.coords.lat,
              msgData.payload.coords.lng
            ]);
            break;
          default:
            console.warn(
              `WebViewLeaflet Error: Unhandled message type received "${
                msgData.type
              }"`
            );
        }
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  sendMessage = (type, payload) => {
    console.log(`WebViewLeaflet: sending message ${type}`);
    this.webview.postMessage(
      JSON.stringify({
        prefix: MESSAGE_PREFIX,
        type,
        payload
      }),
      '*'
    );
  };

  onWebViewLoaded = () => {
    this.setState({
      webviewIsLoaded: true,
      webViewNotLoaded: false
    });
    // this.props.mapCenterCoords should be an array containing 2 elements; a latitude and a longitude
    if (this.props.mapCenterCoords.length > 0) {
      this.sendUpdatedMapCenterCoordsToHTML(this.props.mapCenterCoords);
    }
    if (this.props.hasOwnProperty('locations') && this.props.locations) {
      this.sendLocations(this.props.locations);
    }
    // let the parent know the webview is ready
    this.props.onWebViewReady();
  };

  createWebViewRef = webview => {
    this.webview = webview;
  };

  componentWillReceiveProps = nextProps => {
    if (
      JSON.stringify(this.props.mapCenterCoords) !==
      JSON.stringify(nextProps.mapCenterCoords)
    ) {
      console.log('Update mapCenterCoords');
      /* this.setState({ mapCenterCoords: nextProps.mapCenterCoords });
      if (this.state.webviewIsLoaded) { */
      this.sendUpdatedMapCenterCoordsToHTML(nextProps.mapCenterCoords);
    }

    if (this.state.webviewIsLoaded) {
      if (
        nextProps.hasOwnProperty('locations') &&
        JSON.stringify(this.state.locations) !==
          JSON.stringify(nextProps.locations)
      ) {
        let updatedLocations = nextProps.locations.filter((location, index) => {
          return (
            JSON.stringify(location) !==
            JSON.stringify(this.state.locations[index])
          );
        });
        this.sendLocations(nextProps.locations);
        this.setState({ locations: [...nextProps.locations] });
      }
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#a2e8a2'
        }}
      >
        <WebView
          ref={this.createWebViewRef}
          source={{
            uri: `${
              FileSystem.documentDirectory
            }${PACKAGE_NAME}/${PACKAGE_VERSION}/index.html`
          }}
          onLoadEnd={this.onWebViewLoaded}
          onMessage={this.handleMessage}
        />
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 20,
            padding: 10
          }}
        >
          <View
            style={{
              shadowColor: '#000000',
              shadowOffset: {
                width: 30,
                height: 3
              },
              shadowRadius: 5,
              shadowOpacity: 1.0,
              // needed to get shadows working in android
              backgroundColor: '#0000', // invisible color
              elevation: 4 //
            }}
          >
            <RkButton
              rkType="mimicLeafletButton"
              onPress={this.sendUpdatedMapCenterCoordsToHTML}
            >
              🎯
            </RkButton>
          </View>
        </View>
        {renderIf(this.state.webViewNotLoaded || this.state.filesNotLoaded)(
          <View style={styles.activityOverlayStyle}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                animating={
                  this.state.webViewNotLoaded || this.state.filesNotLoaded
                }
                color="blue"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

/* WebViewLeaflet.propTypes = {
  mapCenterCoords: PropTypes.array,
  locations: PropTypes.array,
  onMapClicked: PropTypes.function,
  onMarkerClicked: PropTypes.function,
  onWebviewReady: PropTypes.function,
  panToLocation: PropTypes.bool
};

WebViewLeaflet.defaults = {
  onMapClicked: () => {
    console.log('onMapClicked');
  },
  onMarkerClicked: () => {
    console.log('onMarkerClicked');
  },
  onWebviewReady: () => {
    console.log('onWebviewReady');
  },
  panToLocation: false
}; */

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
  }
});
