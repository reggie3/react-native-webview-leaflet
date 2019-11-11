"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var L = require('leaflet');
var webBase64Image_1 = require("./webBase64Image");
exports.createDivIcon = function (mapMarker) {
    var divIcon = L.divIcon({
        className: 'clearMarkerContainer',
        html: mapMarker.animation
            ? getAnimatedHTMLString(mapMarker.icon || '📍', mapMarker.animation || null, mapMarker.size || [24, 24])
            : getUnanimatedHTMLString(mapMarker.icon, mapMarker.size),
        iconAnchor: mapMarker.iconAnchor || null
    });
    return divIcon;
};
/*
  Get the HTML string containing the icon div, and animation parameters
  */
var getAnimatedHTMLString = function (icon, animation, size) {
    if (size === void 0) { size = [24, 24]; }
    return "<div class='animationContainer' style=\"\n    animation-name: " + (animation.name ? animation.name : 'bounce') + "; \n    animation-duration: " + (animation.duration ? animation.duration : 1) + "s ;\n    animation-delay: " + (animation.delay ? animation.delay : 0) + "s;\n    animation-direction: " + (animation.direction ? animation.direction : 'normal') + ";\n    animation-iteration-count: " + (animation.iterationCount ? animation.iterationCount : 'infinite') + "\">\n    " + getIconFromEmojiOrImageOrSVG(icon, size) + "\n    </div>";
};
var getUnanimatedHTMLString = function (icon, size) {
    if (size === void 0) { size = [24, 24]; }
    return "<div class='unanimatedIconContainer' >\n    " + getIconFromEmojiOrImageOrSVG(icon, size) + "\n    </div>";
};
var getIconFromEmojiOrImageOrSVG = function (icon, size) {
    if (icon.includes('svg') || icon.includes('SVG')) {
        return " <div style='font-size: " + Math.max(size[0], size[1]) + "px'>\n    " + icon + "\n    </div>";
    }
    else if (icon.includes('//') || icon.includes('base64')) {
        return "<img src=\"" + webBase64Image_1.default + "\" style=\"width:" + size[0] + "px;height:" + size[1] + "px;\">";
    }
    else {
        return " <div style='font-size: " + Math.max(size[0], size[1]) + "px'>\n  " + icon + "\n  </div>";
    }
};
exports.convertSingleLatLngToNumberArray = function (latLng) {
    return [latLng.lat, latLng.lng];
};
exports.convertLatLngArrayToNumberArray = function (latLngs) {
    return latLngs.map(function (latLng) {
        return exports.convertSingleLatLngToNumberArray(latLng);
    });
};
exports.convertWebViewLeafletLatLngToNumberArray = function (latLngs) {
    // received a signle LatLng
    if (!Array.isArray(latLngs)) {
        return exports.convertSingleLatLngToNumberArray(latLngs);
    }
    else {
        // @ts-ignore TS doesn't like that I'm mapping this.
        return latLngs.map(function (latLng) {
            return exports.convertWebViewLeafletLatLngToNumberArray(latLng);
        });
    }
};
exports.convertWebViewLeafletLatLngBoundsToLeaftletBounds = function (bounds) {
    var convertedBounds = null;
    if (bounds.hasOwnProperty('southWest')) {
        var _a = bounds, southWest = _a.southWest, northEast = _a.northEast;
        convertedBounds = {
            southWest: exports.convertWebViewLeafletLatLngToNumberArray(southWest),
            northEast: exports.convertWebViewLeafletLatLngToNumberArray(northEast)
        };
    }
    else {
        convertedBounds = exports.convertWebViewLeafletLatLngToNumberArray(bounds);
    }
    console.log(convertedBounds);
    return convertedBounds;
};
//# sourceMappingURL=utilities.js.map