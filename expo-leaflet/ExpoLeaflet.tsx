import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import isEqual from 'lodash.isequal'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { ExpoLeafletProps, LeafletMapProps } from './web/src/ExpoLeaflet.types'
import { LeafletWebViewEvent } from './web/src/model'

export const ExpoLeaflet = ({
  backgroundColor,
  loadingIndicator,
  onMessage,
  onMapLoad,
  ...rest
}: ExpoLeafletProps) => {
  const mapProps: LeafletMapProps = rest
  const webViewRef = useRef<WebView>(null!)
  const [webViewContent, setWebviewContent] = useState<string | null>()
  const [isLoadingHtmlFile, setLoadingHtmlFile] = useState(true)
  const [isWebviewReady, setWebviewReady] = useState(false)
  const previousPropsRef = useRef<Partial<LeafletMapProps>>({})
  useEffect(() => {
    const loadHtmlFile = async () => {
      try {
        const path = require(`./assets/index.html`)
        const htmlFile: Asset = await Asset.fromModule(path)
        await htmlFile.downloadAsync()
        const webviewContent: string = await FileSystem.readAsStringAsync(
          htmlFile.localUri!,
        )
        setWebviewContent(webviewContent)
        onMessage({
          tag: 'DebugMessage',
          message: 'WebView content loaded',
        })
      } catch (error) {
        onMessage({ tag: 'Error', error })
      }
    }

    loadHtmlFile().catch(() => {})
  }, [])

  useEffect(() => {
    if (!isWebviewReady) {
      return
    }
    const previousProps = previousPropsRef.current
    const newMapProps: Partial<LeafletMapProps> = {}
    if (!isEqual(mapProps.mapCenterPosition, previousProps.mapCenterPosition)) {
      newMapProps.mapCenterPosition = mapProps.mapCenterPosition
    }
    if (!isEqual(mapProps.mapLayers, previousProps.mapLayers)) {
      newMapProps.mapLayers = mapProps.mapLayers
    }
    if (!isEqual(mapProps.mapMarkers, previousProps.mapMarkers)) {
      newMapProps.mapMarkers = mapProps.mapMarkers
    }
    if (!isEqual(mapProps.mapOptions, previousProps.mapOptions)) {
      newMapProps.mapOptions = mapProps.mapOptions
    }
    if (!isEqual(mapProps.mapShapes, previousProps.mapShapes)) {
      newMapProps.mapShapes = mapProps.mapShapes
    }
    if (mapProps.maxZoom !== previousProps.maxZoom) {
      newMapProps.maxZoom = mapProps.maxZoom
    }
    if (mapProps.zoom !== previousProps.zoom) {
      newMapProps.zoom = mapProps.zoom
    }
    previousPropsRef.current = {
      ...previousProps,
      ...mapProps,
    }
    const payload = JSON.stringify(newMapProps)
    webViewRef.current?.injectJavaScript(`window.postMessage(${payload}, '*');`)
  }, [
    isWebviewReady,
    mapProps.mapCenterPosition,
    mapProps.mapLayers,
    mapProps.mapMarkers,
    mapProps.mapOptions,
    mapProps.mapShapes,
    mapProps.maxZoom,
    mapProps.zoom,
  ])

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: backgroundColor ?? 'white',
          position: 'relative',
          flex: 1,
        },
      ]}
    >
      {webViewContent != null && (
        <WebView
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          ref={webViewRef}
          onLoadEnd={() => {
            setLoadingHtmlFile(false)
          }}
          onLoadStart={() => {
            setLoadingHtmlFile(true)
          }}
          onMessage={(event) => {
            if (event && event.nativeEvent && event.nativeEvent.data) {
              try {
                const message: LeafletWebViewEvent = JSON.parse(
                  event.nativeEvent.data,
                )
                if (message.tag === 'MapComponentMounted') {
                  setWebviewReady(true)
                  onMapLoad?.()
                }
                onMessage(message)
              } catch (error) {
                onMessage({
                  tag: 'Error',
                  error: { error, data: event.nativeEvent.data },
                })
              }
            }
          }}
          onError={(error: any) => {
            onMessage({ tag: 'Error', error })
          }}
          originWhitelist={['*']}
          renderLoading={loadingIndicator}
          source={{ html: webViewContent }}
          startInLoadingState={true}
        />
      )}
      {(webViewContent == null || isLoadingHtmlFile || !isWebviewReady) && (
        <View style={StyleSheet.absoluteFill}>
          {loadingIndicator?.() ?? null}
        </View>
      )}
    </View>
  )
}
