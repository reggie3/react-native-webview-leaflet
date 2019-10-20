import * as React from 'react';
import { NativeSyntheticEvent } from 'react-native';
import { WebView } from 'react-native-webview';
import AssetUtils from 'expo-asset-utils';
import { Asset } from 'expo-asset';
import WebViewLeafletView from './WebViewLeaflet.view';
import {
  MapVectorLayer,
  MapRasterLayer,
  MapMarker,
  WebviewLeafletMessage,
  StartupMessage
} from './models';
import { WebViewError } from 'react-native-webview/lib/WebViewTypes';
import { ActivityOverlay } from './ActivityOverlay';
const INDEX_FILE_PATH = require(`./assets/index.html`);

export interface Props {
  backgroundColor?: string;
  doShowDebugMessages?: boolean;
  loadingIndicator?: () => React.ReactElement;
  onError?: (syntheticEvent: NativeSyntheticEvent<WebViewError>) => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
  onMessageReceived: (message: WebviewLeafletMessage) => void;
  vectorLayers?: MapVectorLayer[];
  rasterLayers?: MapRasterLayer[];
  mapMarkers?: MapMarker[];
}

interface State {
  debugMessages: string[];
  indexFile: Asset;
  isLoading: boolean;
}

class WebViewLeaflet extends React.Component<Props, State> {
  private webViewRef: any;
  static defaultProps = {
    backgroundColor: '#FAEBD7',
    doShowDebugMessages: false,
    loadingIndicator: <ActivityOverlay />,
    onError: (syntheticEvent: NativeSyntheticEvent<WebViewError>) => {},
    onLoadEnd: () => {},
    onLoadStart: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      debugMessages: [],
      indexFile: null,
      isLoading: null
    };
    this.webViewRef = null;
  }

  componentDidMount = () => {
    AssetUtils.resolveAsync(INDEX_FILE_PATH)
      .then((res: Asset) => {
        console.log(res);
        if (res.localUri) {
          this.setState({ indexFile: res });
        } else {
          console.warn('Unable to find index file uri');
        }
      })
      .catch((error) => {
        console.warn(error);
        console.warn('Unable to resolve index file');
      });
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    const { indexFile } = this.state;
    if (!prevState.indexFile && indexFile) {
      this.updateDebugMessages('file loaded');
    }
  };

  // Handle messages received from webview contents
  private handleMessage = (data: string) => {
    const { onMessageReceived } = this.props;

    let message: WebviewLeafletMessage = JSON.parse(data);
    this.updateDebugMessages(`received: ${JSON.stringify(message)}`);
    if (message.msg === 'READY') {
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
    this.webViewRef.current.injectJavaScript(
      `handleMessage(${stringMessage}, '*'); true;`
    );
  };

  // Send a startup message with initalizing values to the map
  private sendStartupMessage = () => {
    this.setState({ isLoading: false });
    this.updateDebugMessages('sending startup message');

    let startupMessage: StartupMessage = { msg: 'This is the startup message' };

    this.webViewRef.current.injectJavaScript(
      `window.postMessage(${JSON.stringify(startupMessage)}, '*');`
    );
  };

  // Add a new debug message to the debug message array
  private updateDebugMessages = (debugMessage: string) => {
    this.setState({
      debugMessages: [...this.state.debugMessages, debugMessage]
    });
  };

  private onError = (syntheticEvent: NativeSyntheticEvent<WebViewError>) => {
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
    const { debugMessages, indexFile } = this.state;
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
        indexFile={indexFile}
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
