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
var mockVectorLayers_1 = require("./mocks/mockVectorLayers");
var mockRasterLayers_1 = require("./mocks/mockRasterLayers");
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
var ENABLE_BROWSER_TESTING = true;
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
                        msg: 'MAP_READY'
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
                // this.setState({ ...this.state, ...event.data });
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
                    /* this.printElement(
                      `onMapEvent: event = ${event}, payload = ${JSON.stringify(payload)}`
                    ); */
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
                mapMarkers: [],
                ownPositionMarker: {
                    coords: new leaflet_1.LatLng(36.56, -76.17),
                    icon: '🎃',
                    size: [24, 24],
                    animation: {
                        duration: 0.5,
                        delay: 0,
                        iterationCount: 'infinite',
                        type: models_1.AnimationType.BOUNCE
                    }
                },
                vectorLayers: mockVectorLayers_1.default,
                rasterLayers: mockRasterLayers_1.default,
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
            bounds: null,
            debugMessages: ['test'],
            isLoaded: false,
            lat: 51.505,
            lng: -0.09,
            mapCenterCoords: null,
            mapMarkers: [],
            ownPositionMarker: null,
            panToLocation: null,
            rasterLayers: [],
            showAttributionControl: false,
            showZoomControl: false,
            useMarkerClustering: true,
            vectorLayers: [],
            zoom: 13,
            boundsOptions: null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJlY29tcGlsZS9NYXBDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0IsK0NBQTRDO0FBQzVDLG1DQUtpQjtBQUNqQixtQ0FXa0I7QUFDbEIsNkRBQXdEO0FBQ3hELDZEQUFxRDtBQUVyRCx5REFBbUQ7QUFFbkQsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7QUFDM0QsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLElBQVksb0JBT1g7QUFQRCxXQUFZLG9CQUFvQjtJQUM5Qix1RUFBK0MsQ0FBQTtJQUMvQyx1RkFBK0QsQ0FBQTtJQUMvRCxtRkFBMkQsQ0FBQTtJQUMzRCxxRkFBNkQsQ0FBQTtJQUM3RCwyRkFBbUUsQ0FBQTtJQUNuRSx1RkFBK0QsQ0FBQTtBQUNqRSxDQUFDLEVBUFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFPL0I7QUE0QkQsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7QUFDcEMsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7QUFFcEM7SUFBMkIsZ0NBQTZCO0lBR3RELHNCQUFZLEtBQVk7UUFBeEIsWUFDRSxrQkFBTSxLQUFLLENBQUMsU0FvQmI7UUF0Qk8sWUFBTSxHQUFRLElBQUksQ0FBQztRQXdCM0IsdUJBQWlCLEdBQUc7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQ1gsRUFBRSxhQUFhLGlCQUFNLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFFLG1CQUFtQixFQUFDLEVBQUUsRUFDckU7Z0JBQ0UsSUFBSTtvQkFDRixLQUFJLENBQUMsV0FBVyxDQUFDO3dCQUNmLEdBQUcsRUFBRSxXQUFXO3FCQUNqQixD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bnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB3aXRoTGVhZmxldCB9IGZyb20gJ3JlYWN0LWxlYWZsZXQnO1xyXG5pbXBvcnQge1xyXG4gIExhdExuZ0V4cHJlc3Npb24sXHJcbiAgTGVhZmxldE1vdXNlRXZlbnQsXHJcbiAgTGF0TG5nLFxyXG4gIExhdExuZ0JvdW5kc1xyXG59IGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQge1xyXG4gIFdlYnZpZXdMZWFmbGV0TWVzc2FnZSxcclxuICBNYXBNYXJrZXIsXHJcbiAgTWFwRXZlbnQsXHJcbiAgTWFwVmVjdG9yTGF5ZXJDaXJjbGUsXHJcbiAgTWFwVmVjdG9yTGF5ZXJDaXJjbGVNYXJrZXIsXHJcbiAgTWFwVmVjdG9yTGF5ZXJQb2x5bGluZSxcclxuICBNYXBWZWN0b3JMYXllclBvbHlnb24sXHJcbiAgTWFwVmVjdG9yTGF5ZXJSZWN0YW5nbGUsXHJcbiAgTWFwUmFzdGVyTGF5ZXIsXHJcbiAgQW5pbWF0aW9uVHlwZVxyXG59IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IG1vY2tWZWN0b3JMYXllcnMgZnJvbSAnLi9tb2Nrcy9tb2NrVmVjdG9yTGF5ZXJzJztcclxuaW1wb3J0IG1vY2tNYXBMYXllcnMgZnJvbSAnLi9tb2Nrcy9tb2NrUmFzdGVyTGF5ZXJzJztcclxuaW1wb3J0IG1vY2tNYXBNYXJrZXJzIGZyb20gJy4vbW9ja3MvbW9ja01hcE1hcmtlcnMnO1xyXG5pbXBvcnQgTWFwQ29tcG9uZW50VmlldyBmcm9tICcuL01hcENvbXBvbmVudC52aWV3JztcclxuXHJcbnJlcXVpcmUoJ3JlYWN0LWxlYWZsZXQtbWFya2VyY2x1c3Rlci9kaXN0L3N0eWxlcy5taW4uY3NzJyk7XHJcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XHJcblxyXG5leHBvcnQgZW51bSBNYXBDb21wb25lbnRNZXNzYWdlcyB7XHJcbiAgTUFQX0NPTVBPTkVOVF9NT1VOVEVEID0gJ01BUF9DT01QT05FTlRfTU9VTlRFRCcsXHJcbiAgRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfQURERUQgPSAnRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfQURERUQnLFxyXG4gIFdJTkRPV19FVkVOVF9MSVNURU5FUl9BRERFRCA9ICdXSU5ET1dfRVZFTlRfTElTVEVORVJfQURERUQnLFxyXG4gIFVOQUJMRV9UT19BRERfRVZFTlRfTElTVEVORVIgPSAnVU5BQkxFX1RPX0FERF9FVkVOVF9MSVNURU5FUicsXHJcbiAgRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCA9ICdET0NVTUVOVF9FVkVOVF9MSVNURU5FUl9SRU1PVkVEJyxcclxuICBXSU5ET1dfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCA9ICdXSU5ET1dfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCdcclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXRlIHtcclxuICB2ZWN0b3JMYXllcnM6IChcclxuICAgIHwgTWFwVmVjdG9yTGF5ZXJDaXJjbGVcclxuICAgIHwgTWFwVmVjdG9yTGF5ZXJDaXJjbGVNYXJrZXJcclxuICAgIHwgTWFwVmVjdG9yTGF5ZXJQb2x5bGluZVxyXG4gICAgfCBNYXBWZWN0b3JMYXllclBvbHlnb25cclxuICAgIHwgTWFwVmVjdG9yTGF5ZXJSZWN0YW5nbGVcclxuICApW107XHJcbiAgYm91bmRzT3B0aW9uczogYW55O1xyXG4gIGJvdW5kczogTGF0TG5nQm91bmRzIHwgbnVsbDtcclxuICBwYW5Ub0xvY2F0aW9uOiBhbnk7XHJcbiAgc2hvd1pvb21Db250cm9sOiBib29sZWFuO1xyXG4gIHNob3dBdHRyaWJ1dGlvbkNvbnRyb2w6IGJvb2xlYW47XHJcbiAgbWFwQ2VudGVyQ29vcmRzOiBMYXRMbmcgfCBudWxsO1xyXG4gIGRlYnVnTWVzc2FnZXM6IHN0cmluZ1tdO1xyXG4gIGlzTG9hZGVkOiBib29sZWFuO1xyXG4gIGxhdDogbnVtYmVyO1xyXG4gIGxuZzogbnVtYmVyO1xyXG4gIHJhc3RlckxheWVycz86IE1hcFJhc3RlckxheWVyW107XHJcbiAgbWFwTWFya2Vycz86IE1hcE1hcmtlcltdO1xyXG4gIG93blBvc2l0aW9uTWFya2VyOiBNYXBNYXJrZXIgfCBudWxsO1xyXG4gIHVzZU1hcmtlckNsdXN0ZXJpbmc6IGJvb2xlYW47XHJcbiAgem9vbTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge31cclxuY29uc3QgU0hPV19ERUJVR19JTkZPUk1BVElPTiA9IHRydWU7XHJcbmNvbnN0IEVOQUJMRV9CUk9XU0VSX1RFU1RJTkcgPSB0cnVlO1xyXG5cclxuY2xhc3MgTWFwQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xyXG4gIHN0YXRlOiBTdGF0ZTtcclxuICBwcml2YXRlIG1hcFJlZjogYW55ID0gbnVsbDtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgwqDCoMKgwqDCoMKgYm91bmRzOsKgbnVsbCxcclxuwqDCoMKgwqDCoMKgZGVidWdNZXNzYWdlczrCoFsndGVzdCddLFxyXG7CoMKgwqDCoMKgwqBpc0xvYWRlZDrCoGZhbHNlLFxyXG7CoMKgwqDCoMKgwqBsYXQ6wqA1MS41MDUsXHJcbsKgwqDCoMKgwqDCoGxuZzrCoC0wLjA5LFxyXG7CoMKgwqDCoMKgwqBtYXBDZW50ZXJDb29yZHM6wqBudWxsLFxyXG7CoMKgwqDCoMKgwqBtYXBNYXJrZXJzOsKgW10sXHJcbsKgwqDCoMKgwqDCoG93blBvc2l0aW9uTWFya2VyOsKgbnVsbCxcclxuwqDCoMKgwqDCoMKgcGFuVG9Mb2NhdGlvbjrCoG51bGwsXHJcbsKgwqDCoMKgwqDCoHJhc3RlckxheWVyczrCoFtdLFxyXG7CoMKgwqDCoMKgwqBzaG93QXR0cmlidXRpb25Db250cm9sOsKgZmFsc2UsXHJcbsKgwqDCoMKgwqDCoHNob3dab29tQ29udHJvbDrCoGZhbHNlLFxyXG7CoMKgwqDCoMKgwqB1c2VNYXJrZXJDbHVzdGVyaW5nOsKgdHJ1ZSxcclxuwqDCoMKgwqDCoMKgdmVjdG9yTGF5ZXJzOsKgW10sXHJcbsKgwqDCoMKgwqDCoHpvb206wqAxM1xyXG7CoGJvdW5kc09wdGlvbnM6wqBudWxsLFxyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKCdIZXJlJyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnREaWRNb3VudCcpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgeyBkZWJ1Z01lc3NhZ2VzOiBbLi4udGhpcy5zdGF0ZS5kZWJ1Z01lc3NhZ2VzLCAnY29tcG9uZW50RGlkTW91bnQnXSB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtc2c6ICdNQVBfUkVBRFknXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdGhpcy5hZGREZWJ1Z01lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50KSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5oYW5kbGVNZXNzYWdlKSwgZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmFkZERlYnVnTWVzc2FnZSgnc2V0IGRvY3VtZW50IGxpc3RlbmVycycpO1xyXG4gICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1zZzogJ0RPQ1VNRU5UX0VWRU5UX0xJU1RFTkVSX0FEREVEJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5oYW5kbGVNZXNzYWdlKTtcclxuICAgICAgICAgIHRoaXMuYWRkRGVidWdNZXNzYWdlKCdzZXR0aW5nIFdpbmRvdycpO1xyXG4gICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1zZzogJ1dJTkRPV19FVkVOVF9MSVNURU5FUl9BRERFRCdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRvY3VtZW50ICYmICF3aW5kb3cpIHtcclxuICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBlcnJvcjogJ1VOQUJMRV9UT19BRERfRVZFTlRfTElTVEVORVInXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKEVOQUJMRV9CUk9XU0VSX1RFU1RJTkcpIHtcclxuICAgICAgdGhpcy5zZXR1cEJyb3dzZXJUZXN0aW5nKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wczogUHJvcHMsIHByZXZTdGF0ZTogU3RhdGUpID0+IHtcclxuICAgIGNvbnN0IHsgZGVidWdNZXNzYWdlcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmIChkZWJ1Z01lc3NhZ2VzICE9PSBwcmV2U3RhdGUuZGVidWdNZXNzYWdlcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhkZWJ1Z01lc3NhZ2VzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcclxuICAgIGlmIChkb2N1bWVudCkge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5oYW5kbGVNZXNzYWdlKTtcclxuICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgbXNnOiAnRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCdcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93KSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5oYW5kbGVNZXNzYWdlKTtcclxuICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgbXNnOiAnV0lORE9XX0VWRU5UX0xJU1RFTkVSX1JFTU9WRUQnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgYWRkRGVidWdNZXNzYWdlID0gKG1zZzogYW55KSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5hZGREZWJ1Z01lc3NhZ2UoJ1NUUklOR0lGSUVEJyk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRlYnVnTWVzc2FnZXM6IFtcclxuICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZGVidWdNZXNzYWdlcyxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1zZywgbnVsbCwgNClcclxuICAgICAgICBdXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRlYnVnTWVzc2FnZXM6IFsuLi50aGlzLnN0YXRlLmRlYnVnTWVzc2FnZXMsIG1zZ10gfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0aGlzLmFkZERlYnVnTWVzc2FnZShldmVudC5kYXRhKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnN0YXRlLCAuLi5ldmVudC5kYXRhIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5hZGREZWJ1Z01lc3NhZ2UoeyBlcnJvcjogSlNPTi5zdHJpbmdpZnkoZXJyb3IpIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByb3RlY3RlZCBzZW5kTWVzc2FnZSA9IChtZXNzYWdlOiBXZWJ2aWV3TGVhZmxldE1lc3NhZ2UpID0+IHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGlmICh3aW5kb3cuUmVhY3ROYXRpdmVXZWJWaWV3KSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgd2luZG93LlJlYWN0TmF0aXZlV2ViVmlldy5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzZW5kTWVzc2FnZSAgJywgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgb25NYXBFdmVudCA9IChldmVudDogTWFwRXZlbnQsIHBheWxvYWQ/OiBhbnkpID0+IHtcclxuICAgIC8vIGJ1aWxkIGEgcGF5bG9hZCBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXHJcbiAgICBpZiAodGhpcy5tYXBSZWYgJiYgdGhpcy5zdGF0ZS5pc0xvYWRlZCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG1hcENlbnRlclBvc2l0aW9uOiBMYXRMbmdFeHByZXNzaW9uID0gW1xyXG4gICAgICAgICAgdGhpcy5tYXBSZWYubGVhZmxldEVsZW1lbnQuZ2V0Q2VudGVyKCkubGF0LFxyXG4gICAgICAgICAgdGhpcy5tYXBSZWYubGVhZmxldEVsZW1lbnQuZ2V0Q2VudGVyKCkubG5nXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgY29uc3QgbWFwQm91bmRzID0gdGhpcy5tYXBSZWYubGVhZmxldEVsZW1lbnQuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgY29uc3QgbWFwWm9vbSA9IHRoaXMubWFwUmVmLmxlYWZsZXRFbGVtZW50LmdldFpvb20oKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYXlsb2FkKSB7XHJcbiAgICAgICAgICBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IG1hcENlbnRlclBvc2l0aW9uLFxyXG4gICAgICAgICAgICBib3VuZHM6IG1hcEJvdW5kcyxcclxuICAgICAgICAgICAgem9vbTogbWFwWm9vbVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdGhpcy5wcmludEVsZW1lbnQoXHJcbiAgICAgICAgICBgb25NYXBFdmVudDogZXZlbnQgPSAke2V2ZW50fSwgcGF5bG9hZCA9ICR7SlNPTi5zdHJpbmdpZnkocGF5bG9hZCl9YFxyXG4gICAgICAgICk7ICovXHJcblxyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXlsb2FkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWFwJ3MgY2VudGVyIGluIHN0YXRlIGlmIGl0IGhhcyBtb3ZlZFxyXG4gICAgICAgIC8vIFRoZSBtYXAncyBjZW50ZXIgaW4gc3RhdGUgKG1hcENlbnRlckNvb3JkcykgaXMgdXNlZCBieSByZWFjdC5sZWFmbGV0XHJcbiAgICAgICAgLy8gdG8gY2VudGVyIHRoZSBtYXAuICBDZW50ZXJpbmcgdGhlIG1hcCBjb21wb25lbnQgb24gdGhlIGFjdHVhbFxyXG4gICAgICAgIC8vIG1hcCBjZW50ZXIgd2lsbCBhbGxvdyB1cyB0byByZWNlbnRlciB0aGUgbWFwIGJ5IHVwZGF0aW5nIHRoZSBtYXBDZW50ZXJDb29yZHNcclxuICAgICAgICAvLyBpdGVtIGluIHN0YXRlIG91cnNlbGZcclxuICAgICAgICBpZiAoZXZlbnQgPT09IE1hcEV2ZW50Lk9OX01PVkVfRU5EKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbWFwQ2VudGVyQ29vcmRzOiBuZXcgTGF0TG5nKFxyXG4gICAgICAgICAgICAgICAgbWFwQ2VudGVyUG9zaXRpb25bMF0sXHJcbiAgICAgICAgICAgICAgICBtYXBDZW50ZXJQb3NpdGlvblsxXVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8qICB0aGlzLnByaW50RWxlbWVudChcclxuICAgICAgICAgIGAqKioqKioqKioqKioqKiBVcGRhdGVkIG1hcENlbnRlckNvb3JkcyA9ICR7dGhpcy5zdGF0ZS5tYXBDZW50ZXJDb29yZHN9YFxyXG4gICAgICAgICk7ICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudCA9PT0gTWFwRXZlbnQuT05fWk9PTV9FTkQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB6b29tOiBtYXBab29tIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLyogIHRoaXMucHJpbnRFbGVtZW50KFxyXG4gICAgICAgICAgYCoqKioqKioqKioqKioqIFVwZGF0ZWQgbWFwWm9vbSA9ICR7dGhpcy5zdGF0ZS56b29tfWBcclxuICAgICAgICApOyAqL1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRVJST1Igb25NYXBFdmVudCcsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIHByaW50IHBhc3NlZCBpbmZvcm1hdGlvbiBpbiBhbiBodG1sIGVsZW1lbnQ7IHVzZWZ1bCBmb3IgZGVidWdnaW5nXHJcbiAgLy8gc2luY2UgY29uc29sZS5sb2cgYW5kIGRlYnVnIHN0YXRlbWVudHMgd29uJ3Qgd29yayBpbiBhIGNvbnZlbnRpb25hbCB3YXlcclxuICBwcml2YXRlIHByaW50RWxlbWVudCA9IChkYXRhKSA9PiB7XHJcbiAgICBpZiAoU0hPV19ERUJVR19JTkZPUk1BVElPTikge1xyXG4gICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IHV0aWwuaW5zcGVjdChkYXRhLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCB9KTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBtZXNzYWdlID0gZGF0YTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkZWJ1Z01lc3NhZ2VzOiBbLi4udGhpcy5zdGF0ZS5kZWJ1Z01lc3NhZ2VzLCBtZXNzYWdlXVxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBzZXR1cEJyb3dzZXJUZXN0aW5nID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1hcE1hcmtlcnM6IFtdIGFzIE1hcE1hcmtlcltdLFxyXG4gICAgICBvd25Qb3NpdGlvbk1hcmtlcjoge1xyXG4gICAgICAgIGNvb3JkczogbmV3IExhdExuZygzNi41NiwgLTc2LjE3KSxcclxuICAgICAgICBpY29uOiAn8J+OgycsXHJcbiAgICAgICAgc2l6ZTogWzI0LCAyNF0sXHJcbiAgICAgICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgICAgICBkdXJhdGlvbjogMC41LFxyXG4gICAgICAgICAgZGVsYXk6IDAsXHJcbiAgICAgICAgICBpdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcclxuICAgICAgICAgIHR5cGU6IEFuaW1hdGlvblR5cGUuQk9VTkNFXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWN0b3JMYXllcnM6IG1vY2tWZWN0b3JMYXllcnMsXHJcbiAgICAgIHJhc3RlckxheWVyczogbW9ja01hcExheWVycyxcclxuICAgICAgdXNlTWFya2VyQ2x1c3RlcmluZzogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGJvdW5kczogbmV3IExhdExuZ0JvdW5kcyhcclxuICAgICAgICAgIFszNi44ODU5OTY1LCAtNzYuNDA5Njc5M10sXHJcbiAgICAgICAgICBbMzkuMDc0Njc2NTkzNTM0OTcsIC03Ni45MTI1MzAxMTk4ODAxMl1cclxuICAgICAgICApLFxyXG4gICAgICAgIGJvdW5kc09wdGlvbnM6IHsgcGFkZGluZzogWzAsIDBdIH1cclxuICAgICAgfSk7XHJcbiAgICB9LCA1MDAwKTtcclxuICB9O1xyXG5cclxuICBvbkNsaWNrID0gKGV2ZW50OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xyXG4gICAgdGhpcy5vbk1hcEV2ZW50KE1hcEV2ZW50Lk9OX01BUF9DTElDS0VELCB7XHJcbiAgICAgIGNvb3JkczogW2V2ZW50LmxhdGxuZy5sYXQsIGV2ZW50LmxhdGxuZy5sbmddXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBvbldoZW5SZWFkeSA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRlZDogdHJ1ZSB9KTtcclxuICAgIHRoaXMucHJpbnRFbGVtZW50KGAqKioqKioqIG1hcCBsb2FkZWQgKioqKioqKmApO1xyXG4gIH07XHJcblxyXG4gIG9uTWFwUmVmID0gKHJlZjogYW55KSA9PiB7XHJcbiAgICBpZiAodGhpcy5tYXBSZWYgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5tYXBSZWYgPSByZWY7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE1hcENvbXBvbmVudFZpZXdcclxuICAgICAgICBhZGREZWJ1Z01lc3NhZ2U9e3RoaXMuYWRkRGVidWdNZXNzYWdlfVxyXG4gICAgICAgIGJvdW5kc09wdGlvbnM9e3RoaXMuc3RhdGUuYm91bmRzT3B0aW9uc31cclxuICAgICAgICBib3VuZHM9e3RoaXMuc3RhdGUuYm91bmRzfVxyXG4gICAgICAgIHBhblRvTG9jYXRpb249e3RoaXMuc3RhdGUucGFuVG9Mb2NhdGlvbn1cclxuICAgICAgICBzaG93Wm9vbUNvbnRyb2w9e3RoaXMuc3RhdGUuc2hvd1pvb21Db250cm9sfVxyXG4gICAgICAgIHNob3dBdHRyaWJ1dGlvbkNvbnRyb2w9e3RoaXMuc3RhdGUuc2hvd0F0dHJpYnV0aW9uQ29udHJvbH1cclxuICAgICAgICBtYXBDZW50ZXJDb29yZHM9e3RoaXMuc3RhdGUubWFwQ2VudGVyQ29vcmRzfVxyXG4gICAgICAgIGRlYnVnTWVzc2FnZXM9e3RoaXMuc3RhdGUuZGVidWdNZXNzYWdlc31cclxuICAgICAgICBpc0xvYWRlZD17dGhpcy5zdGF0ZS5pc0xvYWRlZH1cclxuICAgICAgICBsYXQ9e3RoaXMuc3RhdGUubGF0fVxyXG4gICAgICAgIGxuZz17dGhpcy5zdGF0ZS5sbmd9XHJcbiAgICAgICAgbWFwUmFzdGVyTGF5ZXJzPXt0aGlzLnN0YXRlLnJhc3RlckxheWVyc31cclxuICAgICAgICBtYXBNYXJrZXJzPXt0aGlzLnN0YXRlLm1hcE1hcmtlcnN9XHJcbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrfVxyXG4gICAgICAgIG9uV2hlblJlYWR5PXt0aGlzLm9uV2hlblJlYWR5fVxyXG4gICAgICAgIG9uTWFwRXZlbnQ9e3RoaXMub25NYXBFdmVudH1cclxuICAgICAgICBvbk1hcFJlZj17dGhpcy5vbk1hcFJlZn1cclxuICAgICAgICBvd25Qb3NpdGlvbk1hcmtlcj17dGhpcy5zdGF0ZS5vd25Qb3NpdGlvbk1hcmtlcn1cclxuICAgICAgICB1c2VNYXJrZXJDbHVzdGVyaW5nPXt0aGlzLnN0YXRlLnVzZU1hcmtlckNsdXN0ZXJpbmd9XHJcbiAgICAgICAgdmVjdG9yTGF5ZXJzPXt0aGlzLnN0YXRlLnZlY3RvckxheWVyc31cclxuICAgICAgICB6b29tPXt0aGlzLnN0YXRlLnpvb219XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aExlYWZsZXQoTWFwQ29tcG9uZW50KTtcclxuIl19