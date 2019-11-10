"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var models_1 = require("./models");
var react_leaflet_1 = require("react-leaflet");
var RasterLayer = function (props) {
    var addDebugMessage = props.addDebugMessage, layer = props.layer;
    if (layer) {
        if (layer.type === models_1.MapLayerTypes.TILE_LAYER) {
            return (React.createElement(react_leaflet_1.TileLayer, __assign({ attribution: layer.attribution, url: layer.url, zIndex: layer.zIndex || 0 }, props)));
        }
        else if (layer.type === models_1.MapLayerTypes.WMS_TILE_LAYER) {
            return React.createElement(react_leaflet_1.WMSTileLayer, __assign({ url: layer.url }, props));
        }
        else if (layer.type === models_1.MapLayerTypes.IMAGE_LAYER) {
            return (React.createElement(react_leaflet_1.ImageOverlay, __assign({ url: layer.url, opacity: layer.opacity || 1, zIndex: layer.zIndex || 0 }, props)));
        }
        else if (layer.type === models_1.MapLayerTypes.VIDEO_LAYER) {
            return (React.createElement(react_leaflet_1.VideoOverlay, __assign({ url: layer.url, bounds: layer.bounds, opacity: layer.opacity || 1, play: layer.play || true, zIndex: layer.zIndex || 0 }, props)));
        }
    }
    return null;
};
exports.default = RasterLayer;
//# sourceMappingURL=RasterLayer.js.map