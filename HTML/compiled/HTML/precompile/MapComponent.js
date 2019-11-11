"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_leaflet_1 = require("react-leaflet");
var leaflet_1 = require("leaflet");
var models_1 = require("./models");
var appVectorLayers_1 = require("../../appData/appVectorLayers");
var appRasterLayers_1 = require("../../appData/appRasterLayers");
var appMapMarkers_1 = require("../../appData/appMapMarkers");
var MapComponent_view_1 = require("./MapComponent.view");
require('react-leaflet-markercluster/dist/styles.min.css');
var util = require('util');
var MapComponentMessages;
(function (MapComponentMessages) {
    MapComponentMessages["MAP_COMPONENT_MOUNTED"] = "MAP_COMPONENT_MOUNTED";
    MapComponentMessages["DOCUMENT_EVENT_LISTENER_ADDED"] = "DOCUMENT_EVENT_LISTENER_ADDED";
    MapComponentMessages["WINDOW_EVENT_LISTENER_ADDED"] = "WINDOW_EVENT_LISTENER_ADDED";
    MapComponentMessages["UNABLE_TO_ADD_EVENT_LISTENER"] = "UNABLE_TO_ADD_EVENT_LISTENER";
    MapComponentMessages["DOCUMENT_EVENT_LISTENER_REMOVED"] = "DOCUMENT_EVENT_LISTENER_REMOVED";
    MapComponentMessages["WINDOW_EVENT_LISTENER_REMOVED"] = "WINDOW_EVENT_LISTENER_REMOVED";
})(MapComponentMessages = exports.MapComponentMessages || (exports.MapComponentMessages = {}));
var SHOW_DEBUG_INFORMATION = true;
var ENABLE_BROWSER_TESTING = false;
var MapComponent = /** @class */ (function (_super) {
    __extends(MapComponent, _super);
    function MapComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.mapRef = null;
        _this.componentDidMount = function () {
            console.log('componentDidMount');
            _this.setState({ debugMessages: __spreadArrays(_this.state.debugMessages, ['componentDidMount']) }, function () {
                try {
                    _this.sendMessage({
                        msg: 'MAP_COMREADY'
                    });
                }
                catch (error) {
                    _this.addDebugMessage(error);
                }
                if (document) {
                    document.addEventListener('message', _this.handleMessage), false;
                    _this.addDebugMessage('set document listeners');
                    _this.sendMessage({
                        msg: 'DOCUMENT_EVENT_LISTENER_ADDED'
                    });
                }
                if (window) {
                    window.addEventListener('message', _this.handleMessage);
                    _this.addDebugMessage('setting Window');
                    _this.sendMessage({
                        msg: 'WINDOW_EVENT_LISTENER_ADDED'
                    });
                }
                if (!document && !window) {
                    _this.sendMessage({
                        error: 'UNABLE_TO_ADD_EVENT_LISTENER'
                    });
                    return;
                }
            });
            if (ENABLE_BROWSER_TESTING) {
                _this.setupBrowserTesting();
            }
        };
        _this.componentDidUpdate = function (prevProps, prevState) {
            var debugMessages = _this.state.debugMessages;
            if (debugMessages !== prevState.debugMessages) {
                console.log(debugMessages);
            }
        };
        _this.componentWillUnmount = function () {
            if (document) {
                document.removeEventListener('message', _this.handleMessage);
                _this.sendMessage({
                    msg: 'DOCUMENT_EVENT_LISTENER_REMOVED'
                });
            }
            if (window) {
                window.removeEventListener('message', _this.handleMessage);
                _this.sendMessage({
                    msg: 'WINDOW_EVENT_LISTENER_REMOVED'
                });
            }
        };
        _this.addDebugMessage = function (msg) {
            if (typeof msg === 'object') {
                _this.addDebugMessage('STRINGIFIED');
                _this.setState({
                    debugMessages: __spreadArrays(_this.state.debugMessages, [
                        JSON.stringify(msg, null, 4)
                    ])
                });
            }
            else {
                _this.setState({ debugMessages: __spreadArrays(_this.state.debugMessages, [msg]) });
            }
        };
        _this.handleMessage = function (event) {
            _this.addDebugMessage(event.data);
            try {
                _this.setState(__assign(__assign({}, _this.state), event.data));
            }
            catch (error) {
                _this.addDebugMessage({ error: JSON.stringify(error) });
            }
        };
        _this.sendMessage = function (message) {
            // @ts-ignore
            if (window.ReactNativeWebView) {
                // @ts-ignore
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
                console.log('sendMessage  ', JSON.stringify(message));
            }
        };
        _this.onMapEvent = function (event, payload) {
            // build a payload if one is not provided
            if (_this.mapRef && _this.state.isLoaded) {
                try {
                    var mapCenterPosition = [
                        _this.mapRef.leafletElement.getCenter().lat,
                        _this.mapRef.leafletElement.getCenter().lng
                    ];
                    var mapBounds = _this.mapRef.leafletElement.getBounds();
                    var mapZoom = _this.mapRef.leafletElement.getZoom();
                    if (!payload) {
                        payload = {
                            center: mapCenterPosition,
                            bounds: mapBounds,
                            zoom: mapZoom
                        };
                    }
                    _this.printElement("onMapEvent: event = " + event + ", payload = " + JSON.stringify(payload));
                    _this.sendMessage({
                        event: event,
                        payload: payload
                    });
                    // update the map's center in state if it has moved
                    // The map's center in state (mapCenterCoords) is used by react.leaflet
                    // to center the map.  Centering the map component on the actual
                    // map center will allow us to recenter the map by updating the mapCenterCoords
                    // item in state ourself
                    if (event === models_1.MapEvent.ON_MOVE_END) {
                        _this.setState({
                            mapCenterCoords: new leaflet_1.LatLng(mapCenterPosition[0], mapCenterPosition[1])
                        }, function () {
                            /*  this.printElement(
                        `************** Updated mapCenterCoords = ${this.state.mapCenterCoords}`
                      ); */
                        });
                    }
                    if (event === models_1.MapEvent.ON_ZOOM_END) {
                        _this.setState({ zoom: mapZoom }, function () {
                            /*  this.printElement(
                          `************** Updated mapZoom = ${this.state.zoom}`
                        ); */
                        });
                    }
                }
                catch (error) {
                    console.warn('ERROR onMapEvent', error);
                }
            }
        };
        // print passed information in an html element; useful for debugging
        // since console.log and debug statements won't work in a conventional way
        _this.printElement = function (data) {
            if (SHOW_DEBUG_INFORMATION) {
                var message = '';
                if (typeof data === 'object') {
                    message = util.inspect(data, { showHidden: false, depth: null });
                }
                else if (typeof data === 'string') {
                    message = data;
                }
                _this.setState({
                    debugMessages: __spreadArrays(_this.state.debugMessages, [message])
                });
                console.log(message);
            }
        };
        _this.setupBrowserTesting = function () {
            _this.setState({
                mapMarkers: appMapMarkers_1.default,
                ownPositionMarker: {
                    coords: new leaflet_1.LatLng(36.56, -76.17),
                    icon: '🎃',
                    size: [24, 24],
                    animation: {
                        name: 'pulse',
                        duration: '.5',
                        delay: 0,
                        iterationCount: 'infinite'
                    }
                },
                vectorLayers: appVectorLayers_1.default,
                rasterLayers: appRasterLayers_1.default,
                useMarkerClustering: true
            });
            setTimeout(function () {
                _this.setState({
                    bounds: new leaflet_1.LatLngBounds([36.8859965, -76.4096793], [39.07467659353497, -76.91253011988012]),
                    boundsOptions: { padding: [0, 0] }
                });
            }, 5000);
        };
        _this.onClick = function (event) {
            _this.onMapEvent(models_1.MapEvent.ON_MAP_CLICKED, {
                coords: [event.latlng.lat, event.latlng.lng]
            });
        };
        _this.onWhenReady = function () {
            _this.setState({ isLoaded: true });
            _this.printElement("******* map loaded *******");
        };
        _this.onMapRef = function (ref) {
            if (_this.mapRef === null) {
                _this.mapRef = ref;
            }
        };
        _this.state = {
            boundsOptions: null,
            bounds: null,
            mapCenterCoords: null,
            debugMessages: ['test'],
            vectorLayers: [],
            isLoaded: false,
            lat: 51.505,
            lng: -0.09,
            rasterLayers: [],
            mapMarkers: [],
            ownPositionMarker: null,
            panToLocation: null,
            showZoomControl: false,
            showAttributionControl: false,
            useMarkerClustering: true,
            zoom: 13
        };
        console.log('Here');
        return _this;
    }
    MapComponent.prototype.render = function () {
        return (React.createElement(MapComponent_view_1.default, { addDebugMessage: this.addDebugMessage, boundsOptions: this.state.boundsOptions, bounds: this.state.bounds, panToLocation: this.state.panToLocation, showZoomControl: this.state.showZoomControl, showAttributionControl: this.state.showAttributionControl, mapCenterCoords: this.state.mapCenterCoords, debugMessages: this.state.debugMessages, isLoaded: this.state.isLoaded, lat: this.state.lat, lng: this.state.lng, mapRasterLayers: this.state.rasterLayers, mapMarkers: this.state.mapMarkers, onClick: this.onClick, onWhenReady: this.onWhenReady, onMapEvent: this.onMapEvent, onMapRef: this.onMapRef, ownPositionMarker: this.state.ownPositionMarker, useMarkerClustering: this.state.useMarkerClustering, vectorLayers: this.state.vectorLayers, zoom: this.state.zoom }));
    };
    return MapComponent;
}(React.Component));
exports.default = react_leaflet_1.withLeaflet(MapComponent);
//# sourceMappingURL=MapComponent.js.map