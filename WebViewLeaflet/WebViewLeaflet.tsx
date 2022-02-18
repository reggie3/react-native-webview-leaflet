import * as React from "react";
import { WebView } from "react-native-webview";
import WebViewLeafletView from "./WebViewLeaflet.view";
import {
  MapMarker,
  WebviewLeafletMessage,
  MapStartupMessage,
  WebViewLeafletEvents,
  MapLayer,
  MapShape,
  OwnPositionMarker,
  OWN_POSTION_MARKER_ID
} from "./models";
import { ActivityOverlay } from "./ActivityOverlay";
import { LatLng } from "react-leaflet";
import isEqual from "lodash.isequal";
// @ts-ignore node types
const HTML_FILE_SOURCE = Platform.OS === 'android' ? {uri: 'file:///android_asset/index.html'} : require(`./assets/index.html`);

export interface WebViewLeafletProps {
  backgroundColor?: string;
  doShowDebugMessages?: boolean;
  loadingIndicator?: () => React.ReactElement;
  onError?: (syntheticEvent: any) => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
  onMessageReceived: (message: WebviewLeafletMessage) => void;
  mapLayers?: MapLayer[];
  mapMarkers?: MapMarker[];
  mapShapes?: MapShape[];
  mapCenterPosition?: LatLng;
  ownPositionMarker?: OwnPositionMarker;
  zoom?: number;
}

interface State {
  debugMessages: string[];
  mapCurrentCenterPosition: LatLng;
  isLoading: boolean;
}

class WebViewLeaflet extends React.Component<WebViewLeafletProps, State> {
  private webViewRef: any;
  static defaultProps = {
    backgroundColor: "#FAEBD7",
    doDisplayCenteringButton: true,
    doShowDebugMessages: false,
    loadingIndicator: () => {
      return <ActivityOverlay />;
    },
    onError: (syntheticEvent: any) => {},
    onLoadEnd: () => {},
    onLoadStart: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      debugMessages: [],
      isLoading: null,
      mapCurrentCenterPosition: null,
    };
    this.webViewRef = null;
  }

  componentDidUpdate = (prevProps: WebViewLeafletProps, prevState: State) => {
    const {
      mapCenterPosition,
      mapMarkers,
      mapLayers,
      mapShapes,
      ownPositionMarker,
      zoom,
    } = this.props;

    if (!isEqual(mapCenterPosition, prevProps.mapCenterPosition)) {
      this.sendMessage({ mapCenterPosition });
    }
    if (!isEqual(mapMarkers, prevProps.mapMarkers)) {
      this.sendMessage({ mapMarkers });
    }
    if (!isEqual(mapLayers, prevProps.mapLayers)) {
      this.sendMessage({ mapLayers });
    }
    if (!isEqual(mapShapes, prevProps.mapShapes)) {
      this.sendMessage({ mapShapes });
    }
    if (!isEqual(ownPositionMarker, prevProps.ownPositionMarker)) {
      this.sendMessage({ ownPositionMarker });
    }
    if (zoom !== prevProps.zoom) {
      this.sendMessage({ zoom });
    }
  };

  private setMapCenterPosition = () => {
    const { mapCurrentCenterPosition } = this.state;
    const { mapCenterPosition } = this.props;

    if (!isEqual(mapCenterPosition, mapCurrentCenterPosition)) {
      this.setState({
        mapCurrentCenterPosition: mapCenterPosition
      });
      this.sendMessage({
        mapCenterPosition
      });
    }
  };

  // Handle messages received from webview contents
  private handleMessage = (data: string) => {
    const { onMessageReceived } = this.props;

    let message: WebviewLeafletMessage = JSON.parse(data);
    this.updateDebugMessages(`received: ${JSON.stringify(message)}`);
    if (message.msg === WebViewLeafletEvents.MAP_READY) {
      this.sendStartupMessage();
    }
    if (message.event === WebViewLeafletEvents.ON_MOVE_END) {
      this.setState({
        mapCurrentCenterPosition: message.payload.mapCenterPosition
      });
    }
    onMessageReceived(message);
  };

  // Send message to webview
  private sendMessage = (payload: object) => {
    this.updateDebugMessages(`sending: ${JSON.stringify(payload, null, 2)}`);

    this.webViewRef?.injectJavaScript(
      `window.postMessage(${JSON.stringify(payload)}, '*');`
    );
  };

  // Send a startup message with initalizing values to the map
  private sendStartupMessage = () => {
    let startupMessage: MapStartupMessage = {};
    const {
      mapLayers,
      mapMarkers,
      mapShapes,
      mapCenterPosition,
      ownPositionMarker,
      zoom = 7,
    } = this.props;
    if (mapLayers) {
      startupMessage.mapLayers = mapLayers;
    }
    if (mapMarkers) {
      startupMessage.mapMarkers = mapMarkers;
    }
    if (mapCenterPosition) {
      startupMessage.mapCenterPosition = mapCenterPosition;
    }
    if (mapShapes) {
      startupMessage.mapShapes = mapShapes;
    }
    if (ownPositionMarker) {
      startupMessage.ownPositionMarker = {
        ...ownPositionMarker,
        id: OWN_POSTION_MARKER_ID
      };
    }

    startupMessage.zoom = zoom;

    this.setState({ isLoading: false });
    this.updateDebugMessages("sending startup message: " + JSON.stringify(startupMessage, null, 2));

    this.webViewRef.injectJavaScript(
      `window.postMessage(${JSON.stringify(startupMessage)}, '*');`
    );
  };

  // Add a new debug message to the debug message array
  private updateDebugMessages = (debugMessage: string) => {
    this.setState({
      debugMessages: [...this.state.debugMessages, debugMessage]
    });
  };

  private onError = (syntheticEvent: any) => {
    this.props.onError(syntheticEvent);
  };
  private onLoadEnd = () => {
    this.setState({ isLoading: false });
    this.props.onLoadEnd();
  };
  private onLoadStart = () => {
    this.setState({ isLoading: true });
    this.props.onLoadStart();
  };

  // Output rendered item to screen
  render() {
    const { debugMessages } = this.state;
    const {
      backgroundColor,
      doShowDebugMessages,
      loadingIndicator
    } = this.props;

    return (
      <WebViewLeafletView
        backgroundColor={backgroundColor}
        debugMessages={debugMessages}
        doShowDebugMessages={doShowDebugMessages}
        handleMessage={this.handleMessage}
        webviewSource={HTML_FILE_SOURCE}
        loadingIndicator={loadingIndicator}
        onError={this.onError}
        onLoadEnd={this.onLoadEnd}
        onLoadStart={this.onLoadStart}
        setWebViewRef={(ref: WebView) => {
          this.webViewRef = ref;
        }}
      />
    );
  }
}

export default WebViewLeaflet;
