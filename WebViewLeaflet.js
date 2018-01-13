import React from './react.production.min.js';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  WebView
} from 'react-native';
import { connectToRemote, withMessaging } from 'react-native-webview-messaging';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

const WebViewWithMessaging = withMessaging(WebView);

export default class WebViewLeaflet extends React.Component {
  constructor(props) {
    super();
    this.remote = null;
    this.setInitialMapState = this.setInitialMapState.bind(this);
    this.webview = null;
    this.state = {
      webviewIsLoaded: false,
      showActivityIndicator: true,
      mapCenterCoords: null
    };
  }

  componentDidMount() {
    // register listeners to listen for events from the html
    // we'll receive a nonce once the requestPaymentMethodComplete is completed
    connectToRemote(this.webview)
      .then(remote => {
        this.remote = remote;
        this.bindListeners();
      })
      .catch(console.log);
    console.log('wbvw braintree mounted');
  }

  sendUpdatedMapCenterCoordsToHTML = mapCenterCoords => {
    if (this.remote) {
      this.remote.emit('MAP_CENTER_COORD_CHANGE', {
        payload: {
          mapCenterCoords
        }
      });
    }
  };

  sendLocations = markers => {
    this.remote.emit('UPDATE_MARKERS', {
      payload: {
        markers
      }
    });
  };

  setInitialMapState = () => {
    console.log('setting initial map state');
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

  bindListeners = () => {
    this.remote.on('TEST_MESSAGE', event =>
      this.setState({
        message: `Received "greetingFromWebview" event: ${JSON.stringify(
          event
        )}`
      })
    );

    // receive an event when the webview is ready
    this.remote.on('WEBVIEW_READY', event => {
      console.log('Received Webview Ready');
      this.setInitialMapState();
    });
  
    this.remote.on('MARKER_CLICKED', event => {
      console.log('Received MARKER_CLICKED');
    });
    this.remote.on('MAP_CLICKED', event => {
      console.log('Received MAP_CLICKED');
    });
    console.log('listeners bound');
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

  onWebViewLoaded = () => {
    this.setState({
      webviewIsLoaded: true,
      showActivityIndicator: false
    });
  };

  createWebViewRef = webview => {
    this.webview = webview;
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green'
        }}
      >
        <WebViewWithMessaging
          ref={this.createWebViewRef}
          source={require('./dist/index.html')}
          onLoadEnd={this.onWebViewLoaded}
        />
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
