import React, { useEffect, useState } from 'react'
import { LeafletMapProps } from './ExpoLeaflet.types'
import { MapComponent } from './MapComponent'
import { LeafletWebViewEvent } from './model'
import './styles/index.css'

const sendMessage = (message: LeafletWebViewEvent) => {
  // @ts-ignore
  window.ReactNativeWebView?.postMessage(JSON.stringify(message))
}

const sendDebugMessage = (message: string) => {
  sendMessage({ tag: 'DebugMessage', message })
}

export const NativeHarness = () => {
  const [state, setState] = useState<Partial<LeafletMapProps>>({
    mapCenterPosition: { lat: 36.56, lng: -76.17 },
    mapLayers: [],
    mapMarkers: [],
    mapShapes: [],
    maxZoom: 20,
    zoom: 6,
  })

  useEffect(() => {
    const handleNativeMessage = (event: MessageEvent) => {
      try {
        const eventData = event.data as LeafletMapProps
        if (Object.keys(eventData).length === 0) {
          return
        }
        setState((state) => ({ ...state, ...eventData }))
      } catch (error) {
        sendDebugMessage(JSON.stringify(error))
      }
    }
    if (window) {
      window.addEventListener('message', handleNativeMessage)
      sendMessage({
        tag: 'MapComponentMounted',
        version: '1.0.2',
      })
    } else {
      sendMessage({
        tag: 'Error',
        error: 'Unable to add window / document event listeners',
      })
    }
    return () => {
      if (window) {
        window.removeEventListener('message', handleNativeMessage)
      }
    }
  }, [])

  // If we haven't received the first message from the parent,
  // dont render yet since some options can't be changed after the first render.
  if (
    state.mapCenterPosition == null ||
    state.mapLayers == null ||
    state.mapLayers.length === 0
  ) {
    return null
  }
  return (
    <MapComponent
      mapCenterPosition={state.mapCenterPosition}
      mapLayers={state.mapLayers}
      mapMarkers={state.mapMarkers}
      mapOptions={state.mapOptions}
      mapShapes={state.mapShapes}
      maxZoom={state.maxZoom}
      zoom={state.zoom}
      onMessage={(webViewLeafletEvent: LeafletWebViewEvent) => {
        sendMessage(webViewLeafletEvent)
      }}
    />
  )
}
