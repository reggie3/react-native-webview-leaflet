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
                React.createElement(RasterLayer_1.default, __assign({ addDebugMessage: props.addDebugMessage, layer: layer }, props))));
        }
        else {
            return (React.createElement(react_leaflet_1.LayersControl.Overlay, __assign({ name: layer.name, checked: layer.isChecked || false, key: index }, props),
                React.createElement(RasterLayer_1.default, __assign({ addDebugMessage: props.addDebugMessage, layer: layer }, props))));
        }
    })));
};
exports.default = ControlsLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbHNMYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ByZWNvbXBpbGUvQ29udHJvbHNMYXllci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwrQ0FBOEM7QUFDOUMsNkNBQXdDO0FBUXhDLElBQU0sYUFBYSxHQUFHLFVBQUMsS0FBWTtJQUNqQyxPQUFPLENBQ0wsMENBQ0csS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztRQUN0QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxDQUNMLG9CQUFDLDZCQUFhLENBQUMsU0FBUyxhQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDaEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxFQUNqQyxHQUFHLEVBQUUsS0FBSyxJQUNOLEtBQUs7Z0JBRVQsb0JBQUMscUJBQVcsYUFDVixlQUFlLEVBQUUsS0FBSyxDQUFDLGVBQWUsRUFDdEMsS0FBSyxFQUFFLEtBQUssSUFDUixLQUFLLEVBQ1QsQ0FDc0IsQ0FDM0IsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQ0wsb0JBQUMsNkJBQWEsQ0FBQyxPQUFPLGFBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUNoQixPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQ2pDLEdBQUcsRUFBRSxLQUFLLElBQ04sS0FBSztnQkFFVCxvQkFBQyxxQkFBVyxhQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsZUFBZSxFQUN0QyxLQUFLLEVBQUUsS0FBSyxJQUNSLEtBQUssRUFDVCxDQUNvQixDQUN6QixDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FDRCxDQUNKLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExheWVyc0NvbnRyb2wgfSBmcm9tICdyZWFjdC1sZWFmbGV0JztcclxuaW1wb3J0IFJhc3RlckxheWVyIGZyb20gJy4vUmFzdGVyTGF5ZXInO1xyXG5pbXBvcnQgeyBNYXBSYXN0ZXJMYXllciB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgYWRkRGVidWdNZXNzYWdlOiAobXNnOiBhbnkpID0+IHZvaWQ7XHJcbiAgbWFwUmFzdGVyTGF5ZXJzOiBNYXBSYXN0ZXJMYXllcltdO1xyXG59XHJcblxyXG5jb25zdCBDb250cm9sc0xheWVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cHJvcHMubWFwUmFzdGVyTGF5ZXJzLm1hcCgobGF5ZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGxheWVyLmlzQmFzZUxheWVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TGF5ZXJzQ29udHJvbC5CYXNlTGF5ZXJcclxuICAgICAgICAgICAgICBuYW1lPXtsYXllci5uYW1lfVxyXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2xheWVyLmlzQ2hlY2tlZCB8fCBmYWxzZX1cclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxSYXN0ZXJMYXllclxyXG4gICAgICAgICAgICAgICAgYWRkRGVidWdNZXNzYWdlPXtwcm9wcy5hZGREZWJ1Z01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XHJcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9MYXllcnNDb250cm9sLkJhc2VMYXllcj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMYXllcnNDb250cm9sLk92ZXJsYXlcclxuICAgICAgICAgICAgICBuYW1lPXtsYXllci5uYW1lfVxyXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2xheWVyLmlzQ2hlY2tlZCB8fCBmYWxzZX1cclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxSYXN0ZXJMYXllclxyXG4gICAgICAgICAgICAgICAgYWRkRGVidWdNZXNzYWdlPXtwcm9wcy5hZGREZWJ1Z01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XHJcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9MYXllcnNDb250cm9sLk92ZXJsYXk+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHNMYXllcjtcclxuIl19