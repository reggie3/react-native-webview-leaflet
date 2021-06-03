import { Asset } from 'expo-asset'
import AssetUtils from 'expo-asset-utils'
import * as FileSystem from 'expo-file-system'
import isEqual from 'lodash.isequal'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WebViewLeafletProps } from './web/src/LeafletWebView.types'
import { LeafletWebViewEvent, NativeStartupMessage } from './web/src/model'

const INDEX_FILE_PATH = require(`./assets/index.html`)

interface State {
  isLoading: boolean
  webviewContent: string | null
}

export class WebViewLeaflet extends React.Component<
  WebViewLeafletProps,
  State
> {
  private webViewRef = React.createRef<WebView>()

  state: State = {
    isLoading: true,
    webviewContent: null,
  }

  componentDidMount = () => {
    this.loadHTMLFile()
  }

  private loadHTMLFile = async () => {
    try {
      let asset: Asset = await AssetUtils.resolveAsync(INDEX_FILE_PATH)
      let fileString: string = await FileSystem.readAsStringAsync(
        asset.localUri!,
      )

      this.setState({ webviewContent: fileString })
    } catch (error) {
      this.props.onMessage({ tag: 'Error', error })
    }
  }

  componentDidUpdate = (prevProps: WebViewLeafletProps, prevState: State) => {
    const { webviewContent } = this.state
    const { mapCenterPosition, mapMarkers, mapLayers, mapShapes, zoom } =
      this.props

    if (!prevState.webviewContent && webviewContent) {
      this.sendDebugMessage('file loaded')
    }
    if (!isEqual(mapCenterPosition, prevProps.mapCenterPosition)) {
      this.sendMessageToWebview({ mapCenterPosition })
    }
    if (!isEqual(mapMarkers, prevProps.mapMarkers)) {
      this.sendMessageToWebview({ mapMarkers })
    }
    if (!isEqual(mapLayers, prevProps.mapLayers)) {
      this.sendMessageToWebview({ mapLayers })
    }
    if (!isEqual(mapShapes, prevProps.mapShapes)) {
      this.sendMessageToWebview({ mapShapes })
    }
    if (zoom !== prevProps.zoom) {
      this.sendMessageToWebview({ zoom })
    }
  }

  private sendDebugMessage = (message: string) => {
    this.props.onMessage({ tag: 'DebugMessage', message })
  }

  private handleWebviewMessage = (data: string) => {
    try {
      let message: LeafletWebViewEvent = JSON.parse(data)
      if (message.tag === 'MapReady') {
        this.sendStartupMessage()
      }
      this.props.onMessage(message)
    } catch (error) {
      this.props.onMessage({ tag: 'Error', error: { error, data } })
    }
  }

  private sendMessageToWebview = (object: object) => {
    const payload = JSON.stringify(object)
    this.sendDebugMessage(`sending: ${payload}`)
    this.webViewRef.current?.injectJavaScript(
      `window.postMessage(${payload}, '*');`,
    )
  }

  private sendStartupMessage = () => {
    const startupMessage: NativeStartupMessage = {
      tag: 'Startup',
      mapLayers: this.props.mapLayers,
      mapMarkers: this.props.mapMarkers,
      mapCenterPosition: this.props.mapCenterPosition,
      mapShapes: this.props.mapShapes,
      zoom: this.props.zoom ?? 7,
      maxZoom: this.props.maxZoom,
    }
    const message = JSON.stringify(startupMessage)

    this.sendDebugMessage(`sending startup message ${message}`)
    this.webViewRef.current?.injectJavaScript(
      `window.postMessage(${message}, '*');`,
    )
    this.setState({ isLoading: false })
  }

  private onLoadEnd = () => {
    this.setState({ isLoading: false })
    this.props.onLoadEnd?.()
  }

  private onLoadStart = () => {
    this.setState({ isLoading: true })
    this.props.onLoadStart?.()
  }

  render() {
    const { webviewContent } = this.state
    const { backgroundColor, loadingIndicator } = this.props
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flex: 1,
          backgroundColor: backgroundColor ?? 'white',
        }}
      >
        {webviewContent == null ? (
          loadingIndicator?.() ?? null
        ) : (
          <WebView
            containerStyle={{
              flex: 0,
              height: '100%',
              width: '100%',
            }}
            ref={this.webViewRef}
            javaScriptEnabled={true}
            onLoadEnd={this.onLoadEnd}
            onLoadStart={this.onLoadStart}
            onMessage={(event) => {
              if (event && event.nativeEvent && event.nativeEvent.data) {
                this.handleWebviewMessage(event.nativeEvent.data)
              }
            }}
            domStorageEnabled={true}
            startInLoadingState={true}
            onError={(error: any) => {
              this.props.onMessage({ tag: 'Error', error })
            }}
            originWhitelist={['*']}
            renderLoading={loadingIndicator}
            source={{
              html: webviewContent,
            }}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
          />
        )}
      </View>
    )
  }
}
