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
import versionedFileDownloader from 'versioned-file-downloader';
import { FileSystem } from 'expo';
import config from './config';
import Button from './Button';

// path to the file that the webview will load
const INDEX_FILE_PATH = `${FileSystem.documentDirectory}${
  config.PACKAGE_NAME
}/${config.PACKAGE_VERSION}/index.html`;
// the files that will be downloaded
const FILES_TO_DOWNLOAD = [
  'https://raw.githubusercontent.com/reggie3/react-native-webview-leaflet/master/dist/index.html',
  'https://raw.githubusercontent.com/reggie3/react-native-webview-leaflet/master/dist/main.bundle.js'
];

const MESSAGE_PREFIX = 'react-native-webview-leaflet';

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.remote = null;
    // this.setInitialMapState = this.setInitialMapState.bind(this);
    this.webview = null;
    this.state = {
      downloadCompleted: false,
      webViewNotLoaded: true,
      webViewFilesNotAvailable: true,
      mapCenterCoords: null,
      locations: []
    };
  }

  componentDidMount = () => {
    if (!config.USE_LOCAL_FILES) {
      this.downloadFilesForWebView();
    } else {
      this.setState({ webViewFilesNotAvailable: false });
    }
  };

  downloadFilesForWebView = async () => {
    let downloadStatus = await versionedFileDownloader(
      this.webViewDownloadStatusCallBack,
      {
        name: config.PACKAGE_NAME,
        version: config.PACKAGE_VERSION,
        files: FILES_TO_DOWNLOAD
      }
    );

    if (downloadStatus.success) {
      this.setState({ webViewFilesNotAvailable: false });
    } else if (!downloadStatus.success) {
      console.log(
        `unable to download html files: ${JSON.stringify(downloadStatus)}`
      );
      Alert.alert(
        'Error',
        `unable to download html files: ${JSON.stringify(downloadStatus)}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else {
      this.setState({ webViewFilesNotAvailable: false });
    }
  };

  webViewDownloadStatusCallBack = message => {
    console.log(message);
  };

  sendUpdatedMapCenterCoordsToHTML = () => {
    console.log(`updating coords ${this.state.mapCenterCoords}`);
    if (this.state.mapCenterCoords) {
      this.sendMessage('MAP_CENTER_COORD_CHANGE', {
        mapCenterCoords: this.state.mapCenterCoords,
        panToLocation: this.props.panToLocation
      });
    }
  };

  sendLocations = markers => {
    this.sendMessage('UPDATE_MARKERS', { markers });
  };

  sendZoom = zoom => {
    this.sendMessage('SET_ZOOM', { zoom });
  };

  sendShowZoomControls = showZoomControls => {
    this.sendMessage('SHOW_ZOOM_CONTROLS', { showZoomControls });
  };
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

          case 'MARKER_CLICKED':
            if (this.props.hasOwnProperty('onMarkerClicked')) {
              console.log('Received MARKER_CLICKED');
              console.log(msgData);
              this.props.onMarkerClicked(msgData.payload.id);
            }
            break;

          case 'MAP_CLICKED':
            if (this.props.hasOwnProperty('onMapClicked')) {
              console.log('Received MAP_CLICKED');
              console.log(msgData);

              this.props.onMapClicked([
                msgData.payload.coords.lat,
                msgData.payload.coords.lng
              ]);
            }
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
    // only send message when webview is loaded
    if (this.webview) {
      console.log(
        `WebViewLeaflet: sending message ${type}, ${JSON.stringify(payload)}`
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

  onWebViewLoaded = () => {
    this.setState({
      webViewNotLoaded: false
    });
    console.log('************************');
    console.log(this.props);
    // this.props.mapCenterCoords should be an array containing 2 elements; a latitude and a longitude
    if (this.props.mapCenterCoords.length > 0) {
      this.sendUpdatedMapCenterCoordsToHTML(this.state.mapCenterCoords);
    }
    if (this.props.hasOwnProperty('locations')) {
      this.sendLocations(this.props.locations);
    }
    if (this.props.hasOwnProperty('zoom')) {
      this.sendZoom(this.props.zoom);
    }
    if (this.props.hasOwnProperty('showZoomControls')) {
      this.sendShowZoomControls(this.props.showZoomControls);
    }
    // let the parent know the webview is ready
    if (this.props.hasOwnProperty('onWebViewReady')) {
      this.props.onWebViewReady();
    }
  };

  createWebViewRef = webview => {
    this.webview = webview;
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.mapCenterCoords &&
      JSON.stringify(this.state.mapCenterCoords) !==
        JSON.stringify(nextProps.mapCenterCoords)
    ) {
      console.log(`Update mapCenterCoords to ${nextProps.mapCenterCoords}`);
      let that = this;
      this.setState({ mapCenterCoords: nextProps.mapCenterCoords }, () => {
        that.sendUpdatedMapCenterCoordsToHTML();
      });
    }

    if (!this.state.webViewNotLoaded) {
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
          backgroundColor: '#e0fffb'
        }}
      >
        {renderIf(this.state.webViewFilesNotAvailable)(
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              ...{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }}
          >
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                animating={this.state.webViewFilesNotAvailable}
                color="orange"
              />
            </View>
          </View>
        )}
        {renderIf(
          this.state.webViewNotLoaded && !this.state.webViewFilesNotAvailable
        )(
          <View style={styles.activityOverlayStyle}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                animating={this.state.webViewNotLoaded}
                color="blue"
              />
            </View>
          </View>
        )}
        {renderIf(!this.state.webViewFilesNotAvailable)(
          <View style={{ ...StyleSheet.absoluteFillObject }}>
            <WebView
              ref={this.createWebViewRef}
              source={{
                uri: `${FileSystem.documentDirectory}${config.PACKAGE_NAME}/${
                  config.PACKAGE_VERSION
                }/index.html`
              }}
              onLoadEnd={this.onWebViewLoaded}
              onMessage={this.handleMessage}
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
                <Button
                  onPress={this.sendUpdatedMapCenterCoordsToHTML}
                  text={'🎯'}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

WebViewLeaflet.propTypes = {
  mapCenterCoords: PropTypes.array,
  locations: PropTypes.array,
  onMapClicked: PropTypes.func,
  onMarkerClicked: PropTypes.func,
  onWebviewReady: PropTypes.func,
  panToLocation: PropTypes.bool,
  zoom: PropTypes.number,
  showZoomControls: PropTypes.bool,
  centerButton: PropTypes.bool
};

WebViewLeaflet.defaultProps = {
  zoom: 10,
  showZoomControls: true,
  centerButton: true,
  panToLocation: false,
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
