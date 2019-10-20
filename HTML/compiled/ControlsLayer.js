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
var react_leaflet_1 = require("react-leaflet");
var RasterLayer_1 = require("./RasterLayer");
var ControlsLayer = function (props) {
    return (React.createElement(React.Fragment, null, props.mapRasterLayers.map(function (layer, index) {
        if (layer.isBaseLayer) {
            return (React.createElement(react_leaflet_1.LayersControl.BaseLayer, __assign({ name: layer.name, checked: layer.isChecked || false, key: index }, props),
                React.createElement(RasterLayer_1.default, __assign({ layer: layer }, props))));
        }
        else {
            return (React.createElement(react_leaflet_1.LayersControl.Overlay, __assign({ name: layer.name, checked: layer.isChecked || false, key: index }, props),
                React.createElement(RasterLayer_1.default, __assign({ layer: layer }, props))));
        }
    })));
};
exports.default = ControlsLayer;
//# sourceMappingURL=ControlsLayer.js.map