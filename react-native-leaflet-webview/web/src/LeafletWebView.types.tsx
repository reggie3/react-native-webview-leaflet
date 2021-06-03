import { LatLngLiteral, MapOptions } from 'leaflet'
import { ReactElement } from 'react'
import { LeafletWebViewEvent, MapLayer, MapMarker, MapShape } from './model'

export type WebViewLeafletProps = {
  backgroundColor?: string
  loadingIndicator?: () => ReactElement
  onLoadEnd?: () => void
  onLoadStart?: () => void
  onMessage: (message: LeafletWebViewEvent) => void
  mapOptions?: MapOptions
  mapLayers?: MapLayer[]
  mapMarkers?: MapMarker[]
  mapShapes?: MapShape[]
  mapCenterPosition?: LatLngLiteral
  zoom?: number
  maxZoom: number
}
