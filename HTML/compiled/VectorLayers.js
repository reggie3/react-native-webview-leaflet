"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_leaflet_1 = require("react-leaflet");
var models_1 = require("./models");
var VectorLayers = function (_a) {
    var vectorLayers = _a.vectorLayers;
    return (React.createElement(react_leaflet_1.LayerGroup, null, vectorLayers.map(function (mapVectorLayer) {
        switch (mapVectorLayer.type) {
            case models_1.MapVectorLayerType.CIRCLE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Circle, { key: layer.id, color: layer.color || 'white', center: layer.center, radius: layer.radius, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.CIRCLE_MARKER: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.CircleMarker, { key: layer.id, color: layer.color || 'white', center: layer.center, radius: layer.radius, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.POLYGON: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Polygon, { key: layer.id, color: layer.color || 'white', positions: layer.positions, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.POLYLINE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Polyline, { key: layer.id, color: layer.color || 'white', positions: layer.positions, attribution: layer.attribution || null }));
            }
            case models_1.MapVectorLayerType.RECTANGLE: {
                var layer = mapVectorLayer;
                return (React.createElement(react_leaflet_1.Rectangle, { key: layer.id, color: layer.color || 'white', bounds: layer.bounds, attribution: layer.attribution || null }));
            }
            default:
                console.warn('Unknown vector layer type', mapVectorLayer.type);
        }
    })));
};
exports.default = VectorLayers;
//# sourceMappingURL=VectorLayers.js.map