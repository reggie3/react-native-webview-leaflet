import * as Leaflet from 'leaflet'
import {
  CircleMarkerProps,
  CircleProps,
  PolygonProps,
  PolylineProps,
  RectangleProps,
} from 'react-leaflet'

export type Dimensions = [width: number, height: number]

type Payload = {
  bounds: Leaflet.LatLngBoundsLiteral
  mapCenter: Leaflet.LatLngLiteral
  zoom: number
}

export type MapMarkerClickedEvent = {
  tag: 'onMapMarkerClicked'
  mapMarkerId: string
}

export type LeafletWebViewEvent =
  | { tag: 'DebugMessage'; message: string }
  | { tag: 'DOCUMENT_EVENT_LISTENER_ADDED' }
  | { tag: 'DOCUMENT_EVENT_LISTENER_REMOVED' }
  | { tag: 'Error'; error: any }
  | { tag: 'WINDOW_EVENT_LISTENER_ADDED' }
  | { tag: 'WINDOW_EVENT_LISTENER_REMOVED' }
  | { tag: 'UNABLE_TO_ADD_EVENT_LISTENER' }
  | { tag: 'MapReady' }
  | { tag: 'MapComponentMounted' }
  | { tag: 'onMapClicked'; location: Leaflet.LatLngLiteral }
  | MapMarkerClickedEvent
  | ({ tag: 'onMove' } & Payload)
  | ({ tag: 'onMoveEnd' } & Payload)
  | ({ tag: 'onMoveStart' } & Payload)
  | ({ tag: 'onResize' } & Payload)
  | ({ tag: 'onUnload' } & Payload)
  | ({ tag: 'onViewReset' } & Payload)
  | ({ tag: 'onZoom' } & Payload)
  | ({ tag: 'onZoomEnd' } & Payload)
  | ({ tag: 'onZoomLevelsChange' } & Payload)
  | ({ tag: 'onZoomStart' } & Payload)

export interface NativeStartupMessage {
  tag: 'Startup'
  mapLayers?: MapLayer[]
  mapMarkers?: MapMarker[]
  mapShapes?: MapShape[]
  mapCenterPosition?: Leaflet.LatLngLiteral
  zoom?: number
  maxZoom: number
}

export type NativeMessage =
  | NativeStartupMessage
  | { tag: 'MapCenter'; location: Leaflet.LatLngLiteral }
  | { tag: 'Zoom'; zoom: number }

export enum AnimationType {
  BOUNCE = 'bounce',
  FADE = 'fade',
  PULSE = 'pulse',
  JUMP = 'jump',
  SPIN = 'spin',
  WAGGLE = 'waggle',
}

export enum MapLayerType {
  IMAGE_LAYER = 'ImageOverlay',
  TILE_LAYER = 'TileLayer',
  VECTOR_LAYER = 'VectorLayer',
  VIDEO_LAYER = 'VideoOverlay',
  WMS_TILE_LAYER = 'WMSTileLayer',
}

export enum MapShapeType {
  CIRCLE = 'Circle',
  CIRCLE_MARKER = 'CircleMarker',
  POLYLINE = 'Polyline',
  POLYGON = 'Polygon',
  RECTANGLE = 'Rectangle',
}

export enum AnimationDirection {
  NORMAL = 'normal',
  REVERSE = 'reverse',
}

export interface MapMarkerAnimation {
  type: AnimationType
  duration?: number
  delay?: number
  direction?: AnimationDirection
  iterationCount?: number | 'infinite'
}

export interface MapMarker {
  animation?: MapMarkerAnimation
  divIcon?: Leaflet.DivIcon
  icon: string
  iconAnchor?: Leaflet.PointTuple
  id: string
  position: Leaflet.LatLngLiteral
  size?: Dimensions
  title?: string
}

export interface MapLayer {
  attribution?: string
  baseLayer?: boolean
  baseLayerIsChecked?: boolean
  baseLayerName?: string
  bounds?: Leaflet.LatLngBoundsLiteral
  id?: string
  layerType?: MapLayerType
  opacity?: number
  pane?: string
  subLayer?: string
  url?: string
  zIndex?: number
}

type CircleShape = {
  shapeType: MapShapeType.CIRCLE
} & CircleProps

type CircleMarkerShape = {
  shapeType: MapShapeType.CIRCLE_MARKER
} & CircleMarkerProps

type PolygonShape = {
  shapeType: MapShapeType.POLYGON
} & PolygonProps

type PolylineShape = {
  shapeType: MapShapeType.POLYLINE
} & PolylineProps

type RectangleShape = {
  shapeType: MapShapeType.RECTANGLE
} & RectangleProps

export type MapShape = { id?: string } & (
  | CircleShape
  | CircleMarkerShape
  | PolygonShape
  | PolylineShape
  | RectangleShape
)
