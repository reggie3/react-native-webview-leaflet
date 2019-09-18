import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import WebViewLeaflet from 'react-native-webview-leaflet;
import { Body, Container, Text, Header, Title } from 'native-base';
import mapLayers from '../react-native-webview-leaflet/web/mockMapLayers';
import base64Image from '../react-native-webview-leaflet/web/webBase64Image';

interface State {
  bounds: any;
  location: any;
  errorMessage: any;

  //markers: testLocations,
  markers: any[];
  currentLocation: any;
  mapCenterPosition: any;
  showEmojiSelectorModal: any;
  mapState: {
    showAttributionControl: boolean;
    showZoomControls: boolean;
    panToLocation: boolean;
    zoom: number;
  };
}

class App extends React.Component<null, State> {
  webViewLeaflet: any;
  onLoad: any;
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      bounds: null,
      //markers: testLocations,
      markers: [],
      currentLocation: undefined,
      mapCenterPosition: undefined,
      showEmojiSelectorModal: false,
      mapState: {
        showAttributionControl: false,
        showZoomControls: false,
        panToLocation: false,
        zoom: 10
      }
    };
  }
  render = () => {
    return (
      <Container>
        <Header>
          <Body>
            <Title>react-native-webview-leaflet Demo 2.0</Title>
          </Body>
        </Header>
        <WebViewLeaflet
          ref={(component) => (this.webViewLeaflet = component)}
          onLoad={this.onLoad}
          eventReceiver={this} // the component that will receive map events
          centerPosition={this.state.mapCenterPosition}
          markers={this.state.markers}
          mapLayers={mapLayers}
          ownPositionMarker={{
            coords: this.state.currentLocation,
            icon: '❤️',
            size: [24, 24],
            animation: {
              name: 'pulse',
              duration: '.5',
              delay: 0,
              interationCount: 'infinite'
            }
          }}
          centerButton={true}
          useMarkerClustering={true}
          bounds={this.state.bounds}
          boundsOptions={{ padding: [100, 100] }}
        />
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBar: {
    height: Constants.statusBarHeight
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'dodgerblue'
  }
});
