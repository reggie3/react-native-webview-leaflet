import React, { useEffect, useState, Dispatch, ReactElement } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AssetUtils from 'expo-asset-utils';
import { Asset } from 'expo-asset';

export interface WebViewLeafletProps {
  loadingIndicator?: ReactElement;
}

const INDEX_FILE_PATH = require(`./index.html`);

const WebViewLeaflet = ({  }: WebViewLeafletProps) => {
  const [indexFile, setIndexFile]: [Asset, Dispatch<Asset>] = useState(null);

  useEffect(() => {
    if (!indexFile) {
      AssetUtils.resolveAsync(INDEX_FILE_PATH)
        .then((res: Asset) => {
          console.log(res);
          if (res.localUri) {
            setIndexFile(res);
          } else {
            console.warn('Unable to find index file uri');
          }
        })
        .catch((error) => {
          console.warn(error);
          console.warn('Unable to resolve index file');
        });
    }
  });

  if (indexFile && indexFile.uri) {
    return (
      <View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'cyan' }}
      >
        <Text>Webview</Text>
        <WebView originWhitelist={['*']} source={{ uri: indexFile.uri }} />
      </View>
    );
  } else {
    return (
      <View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'pink' }}
      />
    );
  }
};

export default WebViewLeaflet;
