import React from './react.production.min.js';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview-messaging/WebView';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.setInitialMapState = this.setInitialMapState.bind(this);
    this.state = {
      webviewIsLoaded: false,
      showActivityIndicator: true,
      mapCenterCoords: null
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

  componentWillReceiveProps = nextProps => {
    if (this.props.mapCenterCoords !== nextProps.mapCenterCoords) {
      console.log('Update mapCenterCoords');
      /* this.setState({ mapCenterCoords: nextProps.mapCenterCoords });
      if (this.state.webviewIsLoaded) { */
      this.sendUpdatedMapCenterCoordsToHTML(nextProps.mapCenterCoords);
    }
    if (this.props.locations !== nextProps.locations) {
      this.sendLocations(nextProps.locations);
    }
  };

  sendUpdatedMapCenterCoordsToHTML = mapCenterCoords => {
    this.webview.emit('MAP_CENTER_COORD_CHANGE', {
      payload: {
        mapCenterCoords
      }
    });
  };

  sendLocations = markers => {
    this.webview.emit('UPDATE_MARKERS', {
      payload: {
        markers
      }
    });
  };

  setInitialMapState = () => {
    this.setState({
      webviewIsLoaded: true,
      showActivityIndicator: false
    });
    if (this.props.mapCenterCoords) {
      this.sendUpdatedMapCenterCoordsToHTML(this.props.mapCenterCoords);
    }
    if (this.props.locations) {
      this.sendLocations(this.props.locations);
    }
  };

  render() {
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
                animating={this.state.showActivityIndicator}
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
          onLoadEnd={this.setInitialMapState} 
        />
      </View>
    );
  }
}

WebViewLeaflet.PropTypes = {
  mapCenterCoords: PropTypes.array,
  locations: PropTypes.array
};

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
