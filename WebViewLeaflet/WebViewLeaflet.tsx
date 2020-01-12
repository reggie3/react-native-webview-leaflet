import * as React from "react";
import { WebView } from "react-native-webview";
import AssetUtils from "expo-asset-utils";
import { Asset } from "expo-asset";
import WebViewLeafletView from "./WebViewLeaflet.view";
import {
  MapMarker,
  WebviewLeafletMessage,
  MapStartupMessage,
  WebViewLeafletEvents,
  MapLayer,
  MapShape
} from "./models";
import { ActivityOverlay } from "./ActivityOverlay";
import * as FileSystem from "expo-file-system";
import { LatLng } from "react-leaflet";
// @ts-ignore node types
const INDEX_FILE_PATH = require(`./assets/index.html`);

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
  mapCenterCoords?: LatLng;
  zoom?: number;
}

interface State {
  debugMessages: string[];
  webviewContent: string;
  isLoading: boolean;
}

class WebViewLeaflet extends React.Component<WebViewLeafletProps, State> {
  private webViewRef: any;
  static defaultProps = {
    backgroundColor: "#FAEBD7",
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
      webviewContent: null,
      isLoading: null
    };
    this.webViewRef = null;
  }

  componentDidMount = () => {
    this.loadHTMLFile();
  };

  private loadHTMLFile = async () => {
    try {
      let asset: Asset = await AssetUtils.resolveAsync(INDEX_FILE_PATH);
      let fileString: string = await FileSystem.readAsStringAsync(
        asset.localUri
      );

      this.setState({ webviewContent: fileString });
    } catch (error) {
      console.warn(error);
      console.warn("Unable to resolve index file");
    }
  };

  componentDidUpdate = (prevProps: WebViewLeafletProps, prevState: State) => {
    const { webviewContent } = this.state;
    if (!prevState.webviewContent && webviewContent) {
      this.updateDebugMessages("file loaded");
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
    onMessageReceived(message);
  };

  // Send message to webvie
  private sendMessage = (message: WebviewLeafletMessage) => {
    const stringMessage = JSON.stringify(message);

    this.updateDebugMessages(`sending: ${stringMessage}`);
    // this.webview.postMessage(stringMessage, '*');

    // var event = new CustomEvent('payrookMessage', stringMessage);

    const js = `
    handleMessage(${JSON.stringify(message)});
    `;
    /* var event = new Event('message'); */
    this.webViewRef.injectJavaScript(
      `handleMessage(${stringMessage}, '*'); true;`
    );
  };

  // Send a startup message with initalizing values to the map
  private sendStartupMessage = () => {
    let startupMessage: MapStartupMessage = {};
    const {
      mapLayers,
      mapMarkers,
      mapShapes,
      mapCenterCoords,
      zoom = 7
    } = this.props;
    if (mapLayers) {
      startupMessage.mapLayers = mapLayers;
    }
    if (mapMarkers) {
      startupMessage.mapMarkers = mapMarkers;
    }
    if (mapCenterCoords) {
      startupMessage.mapCenterCoords = mapCenterCoords;
    }
    if (mapShapes) {
      startupMessage.mapShapes = mapShapes;
    }

    startupMessage.zoom = zoom;

    this.setState({ isLoading: false });
    this.updateDebugMessages("sending startup message");

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
    const { debugMessages, webviewContent } = this.state;
    const {
      backgroundColor,
      doShowDebugMessages,
      loadingIndicator
    } = this.props;

    if (webviewContent) {
      return (
        <WebViewLeafletView
          backgroundColor={backgroundColor}
          debugMessages={debugMessages}
          doShowDebugMessages={doShowDebugMessages}
          handleMessage={this.handleMessage}
          webviewContent={webviewContent}
          loadingIndicator={loadingIndicator}
          onError={this.onError}
          onLoadEnd={this.onLoadEnd}
          onLoadStart={this.onLoadStart}
          setWebViewRef={(ref: WebView) => {
            this.webViewRef = ref;
          }}
        />
      );
    } else {
      return null;
    }
  }
}

export default WebViewLeaflet;
