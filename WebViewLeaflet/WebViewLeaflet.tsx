import React, {
  useEffect,
  useState,
  Dispatch,
  ReactElement,
  useRef
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';
import AssetUtils from 'expo-asset-utils';
import { Asset } from 'expo-asset';
import { WebviewLeafletMessage, StartupMessage } from './models';
const INDEX_FILE_PATH = require(`./assets/index.html`);
const SHOW_RED_DEBUG = true;

export interface Props {
  loadingIndicator?: () => ReactElement;
  onMessageReceived: (message: WebviewLeafletMessage) => void;
}

interface State {
  debugMessages: string[];
  indexFile: Asset;
  isLoading: boolean;
}

const renderDebugWindow = (debugMessages: string[]): ReactElement => {
  if (SHOW_RED_DEBUG) {
    return (
      <View style={{ height: 100, backgroundColor: 'aliceblue', margin: 5 }}>
        <ScrollView>
          {debugMessages.map((msg, idx) => {
            if (typeof msg === 'object') {
              return (
                <Text style={{ fontSize: 10 }} key={idx}>{`- ${JSON.stringify(
                  msg
                )}`}</Text>
              );
            }
            return <Text style={{ fontSize: 10 }} key={idx}>{`- ${msg}`}</Text>;
          })}
        </ScrollView>
      </View>
    );
  }
  return null;
};

class WebViewLeaflet extends React.Component<Props, State> {
  private webViewRef: any;
  constructor(props) {
    super(props);
    this.state = {
      debugMessages: ['test'],
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

  // useEffect(() => {}, [isLoading]);

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

  // Render the loading indicator that the user passed, or use the default
  private renderLoadingIndicator = () => {
    const { loadingIndicator } = this.props;

    return loadingIndicator ? (
      loadingIndicator()
    ) : (
      <View style={styles.activityOverlayStyle}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" animating={this.state.isLoading} />
        </View>
      </View>
    );
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

  // Output rendered item to screen
  render() {
    const { debugMessages, indexFile } = this.state;

    if (indexFile && indexFile.uri) {
      return (
        <View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'cyan' }}
        >
          <Text>Webview</Text>
          <WebView
            ref={(component) => {
              this.webViewRef = component;
            }}
            javaScriptEnabled={true}
            onLoadEnd={() => {
              this.setState({ isLoading: false });
            }}
            onLoadStart={() => {
              this.setState({ isLoading: true });
            }}
            onMessage={(event) => {
              if (event && event.nativeEvent && event.nativeEvent.data) {
                this.handleMessage(event.nativeEvent.data);
              }
            }}
            originWhitelist={['*']}
            renderLoading={this.renderLoadingIndicator}
            source={{ uri: indexFile.uri }}
          />
          {renderDebugWindow(debugMessages)}
        </View>
      );
    } else {
      return (
        <>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'pink'
            }}
          />
          {renderDebugWindow(debugMessages)}
        </>
      );
    }
  }
}

export default WebViewLeaflet;

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
