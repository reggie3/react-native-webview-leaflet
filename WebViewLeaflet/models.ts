import {
  LatLngExpression,
  Bounds,
  LatLngBoundsExpression,
  PointExpression,
  LatLng
} from 'leaflet';
/* export interface Window {
  ReactNativeWebView?: any;
}

export let window: Window;

if (window.ReactNativeWebView !== undefined) {
  console.log(window.ReactNativeWebView);
}
 */

export enum MapEvents {
  ON_MOVE_END = 'onMoveEnd',
  ON_MOVE_START = 'onMoveStart',
  ON_MOVE = 'onMove',
  ON_RESIZE = 'onResize',
  ON_UNLOAD = 'onUnload',
  ON_VIEW_RESET = 'onViewReset',
  ON_ZOOM_END = 'onZoomEnd',
  ON_ZOOM_LEVELS_CHANGE = 'onZoomLevelsChange',
  ON_ZOOM_START = 'onZoomStart',
  ON_ZOOM = 'onZoom',
  ON_MAP_CLICKED = 'onMapClicked',
  ON_MAP_MARKER_CLICKED = 'onMapMarkerClicked'
}

export interface MapMarkerAnimation {
  name: 'bounce' | 'fade' | 'pulse' | 'jump' | 'waggle' | 'spin';
  duration?: string;
  delay?: number;
  direction?: 'nomal' | 'reverse' | 'alternate' | 'alternate-reverse';
  iterationCount?: number | 'infinite';
}

export interface MapMarker {
  animation: MapMarkerAnimation;
  coords: LatLngExpression;
  divIcon?: L.DivIcon;
  icon: any;
  iconAnchor?: L.PointExpression;
  id?: number | string;
  size: L.PointExpression;
  title?: string;
}

export interface MapLayer {
  // attribution string to be shown for this layer
  attribution?: string; //'&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  bounds?: LatLngBoundsExpression;
  color?: string;
  coords?: LatLng[];
  layers?: MapLayer[] | string;
  id?: number | string;
  isBaseLayer?: boolean;
  isChecked?: boolean; // if the layer is selected in the layer selection control
  name?: string; // the name of the layer, this will be seen in the layer selection control
  opacity?: number;
  play?: boolean;
  type: MapLayerTypes; // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
  // url of tiles
  url?: string; //`https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  zIndex?: number;
}


export interface MapGeometryLayer extends MapLayer{
    geometry: // TODO: each geometry layer gets an array of shapes that match the Vector Layers here:   https://leafletjs.com/reference-1.5.0.html#polygon
}

export interface MapVectorLayer {}

export enum MapLayerTypes {
  GEOMETRY_LAYER = 'GeometryLayer',
  IMAGE_LAYER = 'ImageOverlay',
  TILE_LAYER = 'TileLayer',
  VECTOR_LAYER = 'VectorLayer',
  VIDEO_LAYER = 'VideoOverlay',
  WMS_TILE_LAYER = 'WMSTileLayer'
}

export interface StartupMessage {}

export interface WebviewLeafletMessage {
  event?: any;
  msg?: string;
  error?: string;
  payload?: any;
}
