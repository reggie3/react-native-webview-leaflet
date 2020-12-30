import React, { ReactElement } from 'react';
import { StyleSheet, View, NativeSyntheticEvent } from 'react-native';
import { WebView } from 'react-native-webview';
import DebugMessageBox from './DebugMessageBox';
import { WebViewError, WebViewSource } from 'react-native-webview/lib/WebViewTypes';

export interface Props {
  backgroundColor: string;
  debugMessages: string[];
  doShowDebugMessages: boolean;
  handleMessage: (data: string) => void;
  webviewSource: WebViewSource;
  loadingIndicator: () => ReactElement;
  onError: (syntheticEvent: NativeSyntheticEvent<WebViewError>) => void;
  onLoadEnd: () => void;
  onLoadStart: () => void;
  setWebViewRef: (ref: WebView) => void;
}

const WebViewLeafletView = ({
  backgroundColor,
  debugMessages,
  doShowDebugMessages,
  handleMessage,
  webviewSource,
  loadingIndicator,
  onError,
  onLoadEnd,
  onLoadStart,
  setWebViewRef
}: Props) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: backgroundColor
      }}
    >
      {webviewSource && (
        <WebView
          containerStyle={{
            flex: 0,
            height: '100%',
            width: '100%'
          }}
          /*  style={{ flex: 0, height: '100%', width: '100%' }} */
          ref={(component) => {
            setWebViewRef(component);
          }}
          javaScriptEnabled={true}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onMessage={(event) => {
            if (event && event.nativeEvent && event.nativeEvent.data) {
              handleMessage(event.nativeEvent.data);
            }
          }}
          domStorageEnabled={true}
          startInLoadingState={true}
          onError={onError}
          originWhitelist={['*']}
         /*  renderLoading={loadingIndicator || null} */
          source={webviewSource}
          allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        />
      )}
      <DebugMessageBox
        debugMessages={debugMessages}
        doShowDebugMessages={doShowDebugMessages}
      />
    </View>
  );
};

export default WebViewLeafletView;
