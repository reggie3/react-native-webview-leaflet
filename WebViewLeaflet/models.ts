import { LatLng, Point, LatLngBounds } from "react-leaflet";

export enum WebViewLeafletEvents {
  MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
  MAP_READY = "MAP_READY",
  DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
  WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
  UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
  DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
  WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED",
  ON_MOVE_END = "onMoveEnd",
  ON_MOVE_START = "onMoveStart",
  ON_MOVE = "onMove",
  ON_RESIZE = "onResize",
  ON_UNLOAD = "onUnload",
  ON_VIEW_RESET = "onViewReset",
  ON_ZOOM_END = "onZoomEnd",
  ON_ZOOM_LEVELS_CHANGE = "onZoomLevelsChange",
  ON_ZOOM_START = "onZoomStart",
  ON_ZOOM = "onZoom",
  ON_MAP_CLICKED = "onMapClicked",
  ON_MAP_MARKER_CLICKED = "onMapMarkerClicked"
  //  ON_MAP_SHAPE_CLICKED = "onMapShapeClicked" cannot click on shapes yet
}

export enum AnimationType {
  BOUNCE = "bounce",
  FADE = "fade",
  PULSE = "pulse",
  JUMP = "jump",
  SPIN = "spin",
  WAGGLE = "waggle"
}

export enum MapLayerType {
  IMAGE_LAYER = "ImageOverlay",
  TILE_LAYER = "TileLayer",
  VECTOR_LAYER = "VectorLayer",
  VIDEO_LAYER = "VideoOverlay",
  WMS_TILE_LAYER = "WMSTileLayer"
}

export enum MapShapeType {
  CIRCLE = "Circle",
  CIRCLE_MARKER = "CircleMarker",
  POLYLINE = "Polyline",
  POLYGON = "Polygon",
  RECTANGLE = "Rectangle"
}

export interface MapMarkerAnimation {
  type: AnimationType;
  duration?: number;
  delay?: number;
  direction?: "nomal" | "reverse" | "alternate" | "alternate-reverse";
  iterationCount?: number | "infinite";
}

export interface MapMarker {
  animation?: MapMarkerAnimation;
  position: LatLng;
  divIcon?: L.DivIcon;
  icon: any;
  iconAnchor?: Point;
  id?: string;
  size?: Point;
  title?: string;
}

export interface MapEventMessage {
  event?: any;
  msg?: string;
  error?: string;
  payload?: any;
}

export interface MapLayer {
  attribution?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  bounds?: LatLngBounds;
  id?: string;
  layerType?: MapLayerType;
  opacity?: number;
  pane?: string;
  subLayer?: string;
  url?: string;
  zIndex?: number;
}

export interface MapShape {
  bounds?: LatLng[];
  center?: LatLng;
  color?: string;
  id?: string;
  positions?: LatLng[] | LatLng[][];
  radius?: number;
  shapeType: MapShapeType;
}

export interface MapStartupMessage {
  mapLayers?: MapLayer[];
  mapMarkers?: MapMarker[];
  mapShapes?: MapShape[];
  mapCenterCoords?: LatLng;
  zoom?: number;
}

export interface WebviewLeafletMessage {
  event?: any;
  msg?: string;
  error?: string;
  payload?: any;
}
