import { LatLng, LatLngBounds } from 'leaflet';
export declare enum MapComponentMessages {
    MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
    DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
    WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
    UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
    DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
    WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED"
}
export declare enum MapEvent {
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
}
export interface MapMarkerAnimation {
    name: 'bounce' | 'fade' | 'pulse' | 'jump' | 'waggle' | 'spin';
    duration?: string;
    delay?: number;
    direction?: 'nomal' | 'reverse' | 'alternate' | 'alternate-reverse';
    iterationCount?: number | 'infinite';
}
export interface MapMarker {
    animation?: MapMarkerAnimation;
    coords: LatLng;
    divIcon?: L.DivIcon;
    icon: any;
    iconAnchor?: L.PointExpression;
    id?: number | string;
    size: L.PointExpression;
    title?: string;
}
export interface MapLayer {
    id?: number | string;
    isBaseLayer?: boolean;
    isChecked?: boolean;
    name?: string;
    opacity?: number;
    type?: MapLayerTypes | MapVectorLayerType;
    zIndex?: number;
}
export interface MapVectorLayer extends MapLayer {
    attribution?: string;
    color?: string;
}
export interface MapVectorLayerCircle extends MapVectorLayer {
    center: LatLng;
    radius: number;
}
export interface MapVectorLayerCircleMarker extends MapVectorLayer {
    center: LatLng;
    radius: number;
}
export interface MapVectorLayerPolyline extends MapVectorLayer {
    positions: LatLng[] | LatLng[][];
}
export interface MapVectorLayerPolygon extends MapVectorLayer {
    positions: LatLng[] | LatLng[][];
}
export interface MapVectorLayerRectangle extends MapVectorLayer {
    bounds: LatLngBounds;
}
export declare enum MapVectorLayerType {
    CIRCLE = "Circle",
    CIRCLE_MARKER = "CircleMarker",
    POLYLINE = "Polyline",
    POLYGON = "Polygon",
    RECTANGLE = "Rectangle"
}
export interface MapRasterLayer extends MapLayer {
    attribution?: string;
    bounds?: LatLngBounds;
    layers?: MapLayer[] | string;
    play?: boolean;
    url?: string;
}
export interface MapVectorLayer {
}
export declare enum MapLayerTypes {
    IMAGE_LAYER = "ImageOverlay",
    TILE_LAYER = "TileLayer",
    VECTOR_LAYER = "VectorLayer",
    VIDEO_LAYER = "VideoOverlay",
    WMS_TILE_LAYER = "WMSTileLayer"
}
export interface StartupMessage {
}
export interface WebviewLeafletMessage {
    event?: any;
    msg?: string;
    error?: string;
    payload?: any;
}
