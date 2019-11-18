import React, { useEffect, useState } from 'react';
import {
  WebViewLeaflet,
  WebviewLeafletMessage,
  WebViewLeafletLatLng
} from 'react-native-webview-leaflet';
import { Container, Header, Body, Title, View, Content } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { SafeAreaView, Platform, StyleSheet } from 'react-native';
import rasterLayers from './appData/appRasterLayers';
import vectorLayers from './appData/appVectorLayers';
import mapMarkers from './appData/appMapMarkers';

const App: React.FunctionComponent = () => {
  const [hasLoadingStarted, setHasLoadingStarted] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [mapCenterCoords, setMapCenterCoords] = useState<WebViewLeafletLatLng>({
    lat: 36.56,
    lng: -76.17
  });

  useEffect(() => {
    if (!hasLoadingStarted) {
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      }).then((res) => {
        setIsLoadingComplete(true);
      });
      setHasLoadingStarted(true);
    }
  }, [hasLoadingStarted]);

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    console.log('onMessageReceived', message);
  };

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    );
  } else {
    return (
      <Container>
        <Header
          style={{
            paddingTop: Platform.OS === 'android' ? 30 : 10,
            paddingBottom: 10
          }}
        >
          <Body>
            <Title>React Native Webview Leaflet V5 Demo</Title>
          </Body>
        </Header>
        <View style={{ backgroundColor: 'yellow', flex: 1 }}>
          <WebViewLeaflet
            onMessageReceived={onMessageReceived}
            doShowDebugMessages={false}
            backgroundColor={'#f6b36f'}
            rasterLayers={rasterLayers}
            vectorLayers={vectorLayers}
            /*mapMarkers={mapMarkers} */
            mapCenterCoords={mapCenterCoords}
            zoom={8}
          />
        </View>
      </Container>
    );
  }
};

export default App;
