"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapComponentMessages;
(function (MapComponentMessages) {
    MapComponentMessages["MAP_COMPONENT_MOUNTED"] = "MAP_COMPONENT_MOUNTED";
    MapComponentMessages["DOCUMENT_EVENT_LISTENER_ADDED"] = "DOCUMENT_EVENT_LISTENER_ADDED";
    MapComponentMessages["WINDOW_EVENT_LISTENER_ADDED"] = "WINDOW_EVENT_LISTENER_ADDED";
    MapComponentMessages["UNABLE_TO_ADD_EVENT_LISTENER"] = "UNABLE_TO_ADD_EVENT_LISTENER";
    MapComponentMessages["DOCUMENT_EVENT_LISTENER_REMOVED"] = "DOCUMENT_EVENT_LISTENER_REMOVED";
    MapComponentMessages["WINDOW_EVENT_LISTENER_REMOVED"] = "WINDOW_EVENT_LISTENER_REMOVED";
})(MapComponentMessages = exports.MapComponentMessages || (exports.MapComponentMessages = {}));
var MapEvent;
(function (MapEvent) {
    MapEvent["ON_MOVE_END"] = "onMoveEnd";
    MapEvent["ON_MOVE_START"] = "onMoveStart";
    MapEvent["ON_MOVE"] = "onMove";
    MapEvent["ON_RESIZE"] = "onResize";
    MapEvent["ON_UNLOAD"] = "onUnload";
    MapEvent["ON_VIEW_RESET"] = "onViewReset";
    MapEvent["ON_ZOOM_END"] = "onZoomEnd";
    MapEvent["ON_ZOOM_LEVELS_CHANGE"] = "onZoomLevelsChange";
    MapEvent["ON_ZOOM_START"] = "onZoomStart";
    MapEvent["ON_ZOOM"] = "onZoom";
    MapEvent["ON_MAP_CLICKED"] = "onMapClicked";
    MapEvent["ON_MAP_MARKER_CLICKED"] = "onMapMarkerClicked";
})(MapEvent = exports.MapEvent || (exports.MapEvent = {}));
var MapVectorLayerType;
(function (MapVectorLayerType) {
    MapVectorLayerType["CIRCLE"] = "Circle";
    MapVectorLayerType["CIRCLE_MARKER"] = "CircleMarker";
    MapVectorLayerType["POLYLINE"] = "Polyline";
    MapVectorLayerType["POLYGON"] = "Polygon";
    MapVectorLayerType["RECTANGLE"] = "Rectangle";
})(MapVectorLayerType = exports.MapVectorLayerType || (exports.MapVectorLayerType = {}));
var MapLayerTypes;
(function (MapLayerTypes) {
    MapLayerTypes["IMAGE_LAYER"] = "ImageOverlay";
    MapLayerTypes["TILE_LAYER"] = "TileLayer";
    MapLayerTypes["VECTOR_LAYER"] = "VectorLayer";
    MapLayerTypes["VIDEO_LAYER"] = "VideoOverlay";
    MapLayerTypes["WMS_TILE_LAYER"] = "WMSTileLayer";
})(MapLayerTypes = exports.MapLayerTypes || (exports.MapLayerTypes = {}));
