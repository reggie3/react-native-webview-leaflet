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
var utilities_1 = require("./utilities");
var RasterLayer = function (props) {
    var layer = props.layer;
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
            return (React.createElement(react_leaflet_1.VideoOverlay, __assign({ url: layer.url, bounds: utilities_1.convertWebViewLeafletLatLngBoundsToLeaftletBounds(layer.bounds), opacity: layer.opacity || 1, play: layer.play || true, zIndex: layer.zIndex || 0 }, props)));
        }
    }
    return null;
};
exports.default = RasterLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFzdGVyTGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcmVjb21waWxlL1Jhc3RlckxheWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBQy9CLG1DQUF5RDtBQUN6RCwrQ0FLdUI7QUFDdkIseUNBRXFCO0FBT3JCLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBWTtJQUN2QixJQUFBLG1CQUFLLENBQVc7SUFFeEIsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssc0JBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDM0MsT0FBTyxDQUNMLG9CQUFDLHlCQUFTLGFBQ1IsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQzlCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUNkLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFDckIsS0FBSyxFQUNULENBQ0gsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLHNCQUFhLENBQUMsY0FBYyxFQUFFO1lBQ3RELE9BQU8sb0JBQUMsNEJBQVksYUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBTSxLQUFLLEVBQUksQ0FBQztTQUNwRDthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxzQkFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRCxPQUFPLENBQ0wsb0JBQUMsNEJBQVksYUFDWCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFDZCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQzNCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFDckIsS0FBSyxFQUNULENBQ0gsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLHNCQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25ELE9BQU8sQ0FDTCxvQkFBQyw0QkFBWSxhQUNYLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUNkLE1BQU0sRUFBRSw2REFBaUQsQ0FDdkQsS0FBSyxDQUFDLE1BQU0sQ0FDYixFQUNELE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDM0IsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxFQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQ3JCLEtBQUssRUFDVCxDQUNILENBQUM7U0FDSDtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE1hcExheWVyVHlwZXMsIE1hcFJhc3RlckxheWVyIH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQge1xyXG4gIFRpbGVMYXllcixcclxuICBXTVNUaWxlTGF5ZXIsXHJcbiAgSW1hZ2VPdmVybGF5LFxyXG4gIFZpZGVvT3ZlcmxheVxyXG59IGZyb20gJ3JlYWN0LWxlYWZsZXQnO1xyXG5pbXBvcnQge1xyXG4gIGNvbnZlcnRXZWJWaWV3TGVhZmxldExhdExuZ0JvdW5kc1RvTGVhZnRsZXRCb3VuZHNcclxufSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIGFkZERlYnVnTWVzc2FnZTogKG1zZzogYW55KSA9PiB2b2lkO1xyXG4gIGxheWVyOiBNYXBSYXN0ZXJMYXllcjtcclxufVxyXG5cclxuY29uc3QgUmFzdGVyTGF5ZXIgPSAocHJvcHM6IFByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyBsYXllciB9ID0gcHJvcHM7XHJcblxyXG4gIGlmIChsYXllcikge1xyXG4gICAgaWYgKGxheWVyLnR5cGUgPT09IE1hcExheWVyVHlwZXMuVElMRV9MQVlFUikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUaWxlTGF5ZXJcclxuICAgICAgICAgIGF0dHJpYnV0aW9uPXtsYXllci5hdHRyaWJ1dGlvbn1cclxuICAgICAgICAgIHVybD17bGF5ZXIudXJsfVxyXG4gICAgICAgICAgekluZGV4PXtsYXllci56SW5kZXggfHwgMH1cclxuICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChsYXllci50eXBlID09PSBNYXBMYXllclR5cGVzLldNU19USUxFX0xBWUVSKSB7XHJcbiAgICAgIHJldHVybiA8V01TVGlsZUxheWVyIHVybD17bGF5ZXIudXJsfSB7Li4ucHJvcHN9IC8+O1xyXG4gICAgfSBlbHNlIGlmIChsYXllci50eXBlID09PSBNYXBMYXllclR5cGVzLklNQUdFX0xBWUVSKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPEltYWdlT3ZlcmxheVxyXG4gICAgICAgICAgdXJsPXtsYXllci51cmx9XHJcbiAgICAgICAgICBvcGFjaXR5PXtsYXllci5vcGFjaXR5IHx8IDF9XHJcbiAgICAgICAgICB6SW5kZXg9e2xheWVyLnpJbmRleCB8fCAwfVxyXG4gICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKGxheWVyLnR5cGUgPT09IE1hcExheWVyVHlwZXMuVklERU9fTEFZRVIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VmlkZW9PdmVybGF5XHJcbiAgICAgICAgICB1cmw9e2xheWVyLnVybH1cclxuICAgICAgICAgIGJvdW5kcz17Y29udmVydFdlYlZpZXdMZWFmbGV0TGF0TG5nQm91bmRzVG9MZWFmdGxldEJvdW5kcyhcclxuICAgICAgICAgICAgbGF5ZXIuYm91bmRzXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgb3BhY2l0eT17bGF5ZXIub3BhY2l0eSB8fCAxfVxyXG4gICAgICAgICAgcGxheT17bGF5ZXIucGxheSB8fCB0cnVlfVxyXG4gICAgICAgICAgekluZGV4PXtsYXllci56SW5kZXggfHwgMH1cclxuICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhc3RlckxheWVyO1xyXG4iXX0=