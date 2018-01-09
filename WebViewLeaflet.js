import React from './react.production.min.js';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview-messaging/WebView';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.state = {
      webviewIsLoaded: false,
      showActivityIndicator: true
    };
  }

  componentDidMount() {
    // register listeners to listen for events from the html
    // we'll receive a nonce once the requestPaymentMethodComplete is completed
    this.registerMessageListeners();
    console.log('wbvw braintree mounted');
  }

  registerMessageListeners = () => {
    const { messagesChannel } = this.webview;
  };

  onWebviewLoaded = () => {
    this.setState({ showActivityIndicator: false });
  };

  sendMessageToWebView = () => {
    this.webview.sendJSON({
      payload: 'JSON from RN'
    });

    this.webview.send('plain text from RN');

    this.webview.emit('custom-event-from-rn', {
      payload: 'Custom event from RN'
    });
  };

  render() {
    debugger;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green'
        }}
      >
        {renderIf(this.state.showActivityIndicator)(
          <View style={styles.activityOverlayStyle}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                animating={this.state.showGetNonceActivityIndicator}
                color="blue"
              />
            </View>
          </View>
        )}
        <WebView
          ref={webview => {
            this.webview = webview;
          }}
          source={require('./dist/index.html')}
          onLoad={() => {
            this.setState({
              webviewIsLoaded: true,
              showActivityIndicator: false
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(150, 150, 150, .55)',
    marginHorizontal: 20,
    marginVertical: 60,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: 'white',
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
