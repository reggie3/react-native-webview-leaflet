"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_leaflet_1 = require("react-leaflet");
var models_1 = require("./models");
var utilities_1 = require("./utilities");
var VectorLayers = function (_a) {
    var vectorLayers = _a.vectorLayers;
    return (React.createElement(react_leaflet_1.LayerGroup, null, vectorLayers.map(function (mapVectorLayer, index) {
        var layerId = mapVectorLayer.id || index;
        switch (mapVectorLayer.type) {
            case models_1.MapVectorLayerType.CIRCLE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Circle, { key: mapVectorLayer.id, color: layer.color || 'white', 
                    // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                    center: utilities_1.convertWebViewLeafletLatLngToNumberArray(layer.center), radius: layer.radius, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.CIRCLE_MARKER: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.CircleMarker, { key: mapVectorLayer.id, color: layer.color || 'white', 
                    // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                    center: convertSingleLatLngToNumberArray(layer.center), radius: layer.radius, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.POLYGON: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Polygon, { key: mapVectorLayer.id, color: layer.color || 'white', 
                    // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                    positions: utilities_1.convertWebViewLeafletLatLngToNumberArray(layer.positions), attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.POLYLINE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Polyline, { key: mapVectorLayer.id, color: layer.color || 'white', 
                    // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                    positions: utilities_1.convertWebViewLeafletLatLngToNumberArray(layer.positions), attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.RECTANGLE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Rectangle, { key: mapVectorLayer.id, color: layer.color || 'white', 
                    // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                    bounds: utilities_1.convertWebViewLeafletLatLngToNumberArray(layer.bounds), attribution: layer.attribution || null }));
            }
            default:
                console.warn('Unknown vector layer type', mapVectorLayer.type);
        }
    })));
};
exports.default = VectorLayers;
//# sourceMappingURL=VectorLayers.js.map