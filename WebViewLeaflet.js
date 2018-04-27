import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  WebView,
  Alert,
  Platform,
  Touchable
} from "react-native";
import PropTypes from "prop-types";
import renderIf from "render-if";
import Button from "./Button";
import Expo from "expo";
const isValidCoordinates = require("is-valid-coordinates");

const INDEX_FILE = require(`./assets/dist/index.html`);
const MESSAGE_PREFIX = "react-native-webview-leaflet";
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
      mapCenterCoords: null,
      locations: []
    };
  }

  onWebViewLoaded = () => {
    this.setState(
      {
        webViewNotLoaded: false
      },
      () => {
        this.sendMessage("LOAD_MAP");
        // console.log(this.props);
        // this.props.mapCenterCoords should be an array containing 2 elements; a latitude and a longitude
        if (
          this.props.mapCenterCoords.length > 0 &&
          isValidCoordinates(
            this.props.mapCenterCoords[0],
            this.props.mapCenterCoords[1]
          )
        ) {
          debugger;
          this.setState(
            { mapCenterCoords: this.props.mapCenterCoords },
            () => {
              this.sendUpdatedMapCenterCoordsToHTML();
            }
          );
        }
        if (this.props.hasOwnProperty("locations")) {
          debugger;
          this.sendLocations(this.props.locations);
        }
        if (this.props.hasOwnProperty("zoom")) {
          this.sendZoom(this.props.zoom);
        }
        if (this.props.hasOwnProperty("showZoomControls")) {
          this.sendShowZoomControls(this.props.showZoomControls);
        }
        // let the parent know the webview is ready
        if (this.props.hasOwnProperty("onWebViewReady")) {
          this.props.onWebViewReady();
        }
      }
    );
  };

  // called after the map is loaded
  initializeMapAfterLoading = () => {
    if (this.props.hasOwnProperty("onMove")) {
      this.sendAddMoveListener();
    }
    if (this.props.hasOwnProperty("onMoveEnd")) {
      this.sendAddMoveEndListener();
    }
    if (this.props.hasOwnProperty("onZoom")) {
      this.sendAddZoomListener();
    }
    if (this.props.hasOwnProperty("onZoomEnd")) {
      this.sendAddZoomEndListener();
    }
    if (this.props.hasOwnProperty("getMapCallback")) {
      this.sendGetMap();
    }
  };

  sendUpdatedMapCenterCoordsToHTML = () => {
    this.sendMessage("MAP_CENTER_COORD_CHANGE", {
      mapCenterCoords: this.state.mapCenterCoords,
      panToLocation: this.props.panToLocation
    });
  };

  sendLocations = markers => {
    this.sendMessage("UPDATE_MARKERS", { markers });
  };

  sendZoom = zoom => {
    this.sendMessage("SET_ZOOM", { zoom });
  };

  sendShowZoomControls = showZoomControls => {
    this.sendMessage("SHOW_ZOOM_CONTROLS", { showZoomControls });
  };

  // sent after the map is loaded
  sendGetMap = () => {
    this.sendMessage("GET_MAP");
  };

  sendAddMoveListener = () => {
    this.sendMessage("ADD_MOVE_LISTENER");
  };
  sendAddMoveEndListener = () => {
    this.sendMessage("ADD_MOVE_END_LISTENER");
  };
  sendAddZoomListener = () => {
    this.sendMessage("ADD_ZOOM_LISTENER");
  };
  sendAddZoomEndListener = () => {
    this.sendMessage("ADD_ZOOM_END_LISTENER");
  };

  //
  handleMessage = event => {
    let msgData;
    console.log(`WebViewLeaflet: handleMessage called: `, event);

    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty("prefix") &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        console.log(`WebViewLeaflet: received message ${msgData.type}`);
        this.sendMessage("MESSAGE_ACKNOWLEDGED");

        switch (msgData.type) {
          case "MAP_LOADED":
            console.log("MAP_LOADED");
            this.setState({ mapNotLoaded: false });
            this.initializeMapAfterLoading();
            break;
          case "MAP_SENT":
            this.props.getMapCallback(msgData.payload.map);
            break;
          case "MARKER_CLICKED":
            if (this.props.hasOwnProperty("onMarkerClicked")) {
              console.log("Received MARKER_CLICKED");
              console.log(msgData);
              this.props.onMarkerClicked(msgData.payload.id);
            }
            break;

          case "MAP_CLICKED":
            if (this.props.hasOwnProperty("onMapClicked")) {
              console.log("Received MAP_CLICKED");
              console.log(msgData);

              this.props.onMapClicked([
                msgData.payload.coords.lat,
                msgData.payload.coords.lng
              ]);
            }
            break;
          case "CONSOLE_LOG":
            console.log("From Webview: ", msgData.payload.msg);
            break;
          case "ZOOM_END":
            if (this.props.hasOwnProperty("onZoomEnd")) {
              this.props.onZoomEnd(msgData.payload);
            }
            break;
          case "MOVE_END":
            if (this.props.hasOwnProperty("onMoveEnd")) {
              this.props.onMoveEnd(msgData.payload);
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
    if (!this.state.webViewNotLoaded) {
      console.log(
        `WebViewLeaflet: sending message ${type}, ${JSON.stringify(payload)}`
      );
      this.webview.postMessage(
        JSON.stringify({
          prefix: MESSAGE_PREFIX,
          type,
          payload
        }),
        "*"
      );
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
      if (
        this.props.mapCenterCoords.length > 0 &&
        isValidCoordinates(
          this.props.mapCenterCoords[0],
          this.props.mapCenterCoords[1]
        )
      ) {
        debugger;
        this.setState(
          { mapCenterCoords: nextProps.mapCenterCoords },
          () => {
            this.sendUpdatedMapCenterCoordsToHTML();
          }
        );
      }
    }

    if (!this.state.webViewNotLoaded) {
      if (
        nextProps.hasOwnProperty("locations") &&
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

  showLoadingIndicator = () => {
    return (
      <View style={styles.activityOverlayStyle}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            animating={this.state.webViewNotLoaded}
            color="blue"
          />
        </View>
      </View>
    );
  };

  onError = error => {
    Alert.alert("WebView onError", error, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
    console.log("WebView onError: ", error);
  };

  renderError = error => {
    Alert.alert("WebView renderError", error, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
    console.log("WebView renderError: ", error);
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
            style={{ ...StyleSheet.absoluteFillObject }}
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
            mixedContentMode={"always"}
          />
          {renderIf(this.props.centerButton)(
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 20,
                padding: 10
              }}
            >
              <Button
                onPress={this.sendUpdatedMapCenterCoordsToHTML}
                text={"🎯"}
              />
            </View>
          )}
        </View>
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
  panToLocation: false
};

const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, .5)",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
    shadowColor: "#000000",
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
      backgroundColor: "#2196F3",
      borderRadius: 2
    }
  })
});
