"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var models_1 = require("./models");
var react_leaflet_1 = require("react-leaflet");
var react_leaflet_markercluster_1 = require("react-leaflet-markercluster");
var utilities_1 = require("./utilities");
var MapMarkers = function (_a) {
    var mapMarkers = _a.mapMarkers, onMapEvent = _a.onMapEvent, _b = _a.useMarkerClustering, useMarkerClustering = _b === void 0 ? true : _b;
    if (useMarkerClustering) {
        return (React.createElement(react_leaflet_1.LayerGroup, null,
            React.createElement(react_leaflet_markercluster_1.default, null, mapMarkers.map(function (mapMarker) {
                if (mapMarker.id !== 'ownPositionMarker') {
                    return (React.createElement(react_leaflet_1.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_1.createDivIcon(mapMarker), onClick: function () {
                            onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                                id: mapMarker.id
                            });
                        } }, mapMarker.title && React.createElement(react_leaflet_1.Popup, null, mapMarker.title)));
                }
                else {
                    return null;
                }
            })),
            mapMarkers.map(function (mapMarker) {
                if (mapMarker.id === 'ownPositionMarker') {
                    return (React.createElement(react_leaflet_1.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_1.createDivIcon(mapMarker), onClick: function () {
                            onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                                id: mapMarker.id
                            });
                        } }, mapMarker.title && React.createElement(react_leaflet_1.Popup, null, mapMarker.title)));
                }
                else {
                    return null;
                }
            })));
    }
    else {
        return (React.createElement(react_leaflet_1.LayerGroup, null, mapMarkers.map(function (marker) {
            return (React.createElement(react_leaflet_1.Marker, { key: marker.id, position: marker.coords, icon: marker.divIcon, onClick: function () {
                    onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                        id: marker.id
                    });
                } }, marker.title && React.createElement(react_leaflet_1.Popup, null, marker.title)));
        })));
    }
};
exports.default = MapMarkers;
//# sourceMappingURL=Markers.js.map