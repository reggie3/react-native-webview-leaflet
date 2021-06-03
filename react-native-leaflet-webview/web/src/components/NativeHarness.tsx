import Leaflet from 'leaflet'
// TODO why are these image files just imported?
import 'leaflet/dist/images/layers-2x.png'
import 'leaflet/dist/images/layers.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import React, { Component } from 'react'
import {
  LeafletWebViewEvent,
  MapLayer,
  MapMarker,
  MapShape,
  NativeMessage,
} from '../model'
import '../styles/index.css'
import { MapComponent } from './MapComponent'

const DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

Leaflet.Marker.prototype.options.icon = DefaultIcon

// TODO this is the MapComponentProps
interface State {
  mapCenterPosition: Leaflet.LatLngLiteral
  mapLayers: MapLayer[]
  mapMarkers: MapMarker[]
  mapShapes: MapShape[]
  maxZoom: number
  zoom: number
}

const sendMessage = (message: LeafletWebViewEvent) => {
  // @ts-ignore
  window.ReactNativeWebView?.postMessage(JSON.stringify(message))
}

const sendDebugMessage = (message: string) => {
  sendMessage({ tag: 'DebugMessage', message })
}

export class NativeHarness extends Component<{}, State> {
  state: State = {
    mapCenterPosition: { lat: 36.56, lng: -76.17 },
    mapLayers: [],
    mapMarkers: [],
    mapShapes: [],
    maxZoom: 20,
    zoom: 6,
  }

  componentDidMount = () => {
    this.addEventListeners()
    sendMessage({
      tag: 'MapComponentMounted',
    })
  }

  private addEventListeners = () => {
    // if (document) {
    //   document.addEventListener('message', this.handleNativeMessage)
    //   sendDebugMessage('set document listeners')
    //   sendMessage({ tag: 'DOCUMENT_EVENT_LISTENER_ADDED' })
    // } else
    if (window) {
      window.addEventListener('message', this.handleNativeMessage)
      sendDebugMessage('setting Window')
      sendMessage({ tag: 'WINDOW_EVENT_LISTENER_ADDED' })
    } else {
      sendMessage({ tag: 'UNABLE_TO_ADD_EVENT_LISTENER' })
      return
    }
  }

  private handleNativeMessage = (event: MessageEvent) => {
    sendDebugMessage(JSON.stringify(event))
    try {
      const nativeEvent = event.data as NativeMessage
      if (nativeEvent.tag === 'MapCenter') {
        this.setState({ mapCenterPosition: nativeEvent.location })
      } else if (nativeEvent.tag === 'Zoom') {
        this.setState({ zoom: nativeEvent.zoom })
      } else {
        sendDebugMessage(`Unhandled native message: ${JSON.stringify(event)}`)
      }
    } catch (error) {
      sendDebugMessage(JSON.stringify(error))
    }
  }

  private onMapEvent = (webViewLeafletEvent: LeafletWebViewEvent) => {
    sendMessage(webViewLeafletEvent)
  }

  render() {
    // TODO accept map options
    return (
      <MapComponent
        mapCenterPosition={this.state.mapCenterPosition}
        mapLayers={this.state.mapLayers}
        mapMarkers={this.state.mapMarkers}
        mapOptions={{}}
        mapShapes={this.state.mapShapes}
        zoom={this.state.zoom}
        maxZoom={this.state.maxZoom}
        onMessage={this.onMapEvent}
      />
    )
  }
}
