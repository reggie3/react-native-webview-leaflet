"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_leaflet_1 = require("react-leaflet");
var models_1 = require("./models");
var ControlsLayer_1 = require("./ControlsLayer");
var RasterLayer_1 = require("./RasterLayer");
require("leaflet/dist/leaflet.css");
require("leaflet/dist/images/marker-icon-2x.png");
require("leaflet/dist/images/marker-shadow.png");
require("./markers.css");
var VectorLayers_1 = require("./VectorLayers");
var Markers_1 = require("./Markers");
require('react-leaflet-markercluster/dist/styles.min.css');
var SHOW_DEBUG_INFORMATION = true;
var ENABLE_BROWSER_TESTING = true;
var MapComponentView = function (_a) {
    var addDebugMessage = _a.addDebugMessage, vectorLayers = _a.vectorLayers, boundsOptions = _a.boundsOptions, bounds = _a.bounds, panToLocation = _a.panToLocation, showZoomControl = _a.showZoomControl, showAttributionControl = _a.showAttributionControl, mapCenterCoords = _a.mapCenterCoords, debugMessages = _a.debugMessages, isLoaded = _a.isLoaded, lat = _a.lat, lng = _a.lng, _b = _a.mapRasterLayers, mapRasterLayers = _b === void 0 ? [] : _b, _c = _a.mapMarkers, mapMarkers = _c === void 0 ? [] : _c, onClick = _a.onClick, onWhenReady = _a.onWhenReady, onMapEvent = _a.onMapEvent, onMapRef = _a.onMapRef, ownPositionMarker = _a.ownPositionMarker, useMarkerClustering = _a.useMarkerClustering, zoom = _a.zoom;
    return (React.createElement(React.Fragment, null,
        mapRasterLayers.length < 1 ? (React.createElement("div", null, "waiting for map layers")) : (React.createElement(react_leaflet_1.Map, { style: {
                width: '100%',
                backgroundColor: 'lightblue'
            }, zoom: zoom, ref: function (component) {
                onMapRef(component);
            }, center: mapCenterCoords, attributionControl: showAttributionControl, zoomControl: showZoomControl, panToLocation: panToLocation, maxZoom: 18, bounds: bounds, boundsOptions: boundsOptions, whenReady: onWhenReady, onClick: onClick, onZoomLevelsChange: function () {
                onMapEvent(models_1.MapEvent.ON_ZOOM_LEVELS_CHANGE);
            }, onResize: function () {
                onMapEvent(models_1.MapEvent.ON_RESIZE);
            }, onZoomStart: function () {
                onMapEvent(models_1.MapEvent.ON_ZOOM_START);
            }, onMoveStart: function () {
                onMapEvent(models_1.MapEvent.ON_MOVE_START);
            }, onZoom: function () {
                onMapEvent(models_1.MapEvent.ON_ZOOM);
            }, onMove: function () {
                onMapEvent(models_1.MapEvent.ON_MOVE);
            }, onZoomEnd: function () {
                onMapEvent(models_1.MapEvent.ON_ZOOM_END);
            }, onMoveEnd: function () {
                onMapEvent(models_1.MapEvent.ON_MOVE);
            }, onUnload: function () {
                onMapEvent(models_1.MapEvent.ON_UNLOAD);
            }, onViewReset: function () {
                onMapEvent(models_1.MapEvent.ON_VIEW_RESET);
            } },
            mapRasterLayers.length === 1 ? (React.createElement(RasterLayer_1.default, { layer: mapRasterLayers[0], addDebugMessage: addDebugMessage })) : (React.createElement(react_leaflet_1.LayersControl, { position: "topright" },
                React.createElement(ControlsLayer_1.default, { mapRasterLayers: mapRasterLayers, addDebugMessage: addDebugMessage }))),
            isLoaded && (React.createElement(react_leaflet_1.LayersControl, { position: "topleft" },
                React.createElement(react_leaflet_1.LayersControl.Overlay, { name: "Markers", checked: true },
                    isLoaded && React.createElement(VectorLayers_1.default, { vectorLayers: vectorLayers }),
                    isLoaded && (React.createElement(Markers_1.default, { mapMarkers: mapMarkers, onMapEvent: onMapEvent, useMarkerClustering: true }))))))),
        SHOW_DEBUG_INFORMATION ? (React.createElement("div", { style: {
                backgroundColor: 'orange',
                maxHeight: '200px',
                overflow: 'auto',
                padding: 5,
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 15000
            }, id: "messages" },
            React.createElement("ul", null, debugMessages.map(function (message, index) {
                return React.createElement("li", { key: index }, message);
            })))) : null));
};
exports.default = MapComponentView;
//# sourceMappingURL=MapComponent.view.js.map