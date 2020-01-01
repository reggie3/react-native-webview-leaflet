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
var appVectorLayers_1 = require("./mocks/appVectorLayers");
var appRasterLayers_1 = require("./mocks/appRasterLayers");
var appMapMarkers_1 = require("./mocks/appMapMarkers");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJlY29tcGlsZS9NYXBDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwrQ0FBNEM7QUFDNUMsbUNBS2lCO0FBQ2pCLG1DQVVrQjtBQUNsQiwyREFBdUQ7QUFDdkQsMkRBQW9EO0FBQ3BELHVEQUFtRDtBQUNuRCx5REFBbUQ7QUFFbkQsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7QUFDM0QsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLElBQVksb0JBT1g7QUFQRCxXQUFZLG9CQUFvQjtJQUM5Qix1RUFBK0MsQ0FBQTtJQUMvQyx1RkFBK0QsQ0FBQTtJQUMvRCxtRkFBMkQsQ0FBQTtJQUMzRCxxRkFBNkQsQ0FBQTtJQUM3RCwyRkFBbUUsQ0FBQTtJQUNuRSx1RkFBK0QsQ0FBQTtBQUNqRSxDQUFDLEVBUFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFPL0I7QUEyQkQsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7QUFDcEMsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7QUFFcEM7SUFBMkIsZ0NBQTZCO0lBR3RELHNCQUFZLEtBQVk7UUFBeEIsWUFDRSxrQkFBTSxLQUFLLENBQUMsU0FvQmI7UUF0Qk8sWUFBTSxHQUFRLElBQUksQ0FBQztRQXdCM0IsdUJBQWlCLEdBQUc7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQ1gsRUFBRSxhQUFhLGlCQUFNLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFFLG1CQUFtQixFQUFDLEVBQUUsRUFDckU7Z0JBQ0UsSUFBSTtvQkFDRixLQUFJLENBQUMsV0FBVyxDQUFDO3dCQUNmLEdBQUcsRUFBRSxjQUFjO3FCQUNwQixDQUFDLENBQUM7aUJBQ0o7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7Z0JBRUQsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDO29CQUNoRSxLQUFJLENBQUMsZUFBZSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQy9DLEtBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ2YsR0FBRyxFQUFFLCtCQUErQjtxQkFDckMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELElBQUksTUFBTSxFQUFFO29CQUNWLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUN2RCxLQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ2YsR0FBRyxFQUFFLDZCQUE2QjtxQkFDbkMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLEtBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ2YsS0FBSyxFQUFFLDhCQUE4QjtxQkFDdEMsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1I7WUFDSCxDQUFDLENBQ0YsQ0FBQztZQUVGLElBQUksc0JBQXNCLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsd0JBQWtCLEdBQUcsVUFBQyxTQUFnQixFQUFFLFNBQWdCO1lBQzlDLElBQUEseUNBQWEsQ0FBZ0I7WUFDckMsSUFBSSxhQUFhLEtBQUssU0FBUyxDQUFDLGFBQWEsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQztRQUVGLDBCQUFvQixHQUFHO1lBQ3JCLElBQUksUUFBUSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1RCxLQUFJLENBQUMsV0FBVyxDQUFDO29CQUNmLEdBQUcsRUFBRSxpQ0FBaUM7aUJBQ3ZDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ2YsR0FBRyxFQUFFLCtCQUErQjtpQkFDckMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUM7UUFFTSxxQkFBZSxHQUFHLFVBQUMsR0FBUTtZQUNqQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixhQUFhLGlCQUNSLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTt3QkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztzQkFDN0I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsaUJBQU0sS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUUsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RFO1FBQ0gsQ0FBQyxDQUFDO1FBRU0sbUJBQWEsR0FBRyxVQUFDLEtBQUs7WUFDNUIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSTtnQkFDRixLQUFJLENBQUMsUUFBUSx1QkFBTSxLQUFJLENBQUMsS0FBSyxHQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUcsQ0FBQzthQUNqRDtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEtBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEQ7UUFDSCxDQUFDLENBQUM7UUFFUSxpQkFBVyxHQUFHLFVBQUMsT0FBOEI7WUFDckQsYUFBYTtZQUNiLElBQUksTUFBTSxDQUFDLGtCQUFrQixFQUFFO2dCQUM3QixhQUFhO2dCQUNiLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDdkQ7UUFDSCxDQUFDLENBQUM7UUFFTSxnQkFBVSxHQUFHLFVBQUMsS0FBZSxFQUFFLE9BQWE7WUFDbEQseUNBQXlDO1lBQ3pDLElBQUksS0FBSSxDQUFDLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsSUFBSTtvQkFDRixJQUFNLGlCQUFpQixHQUFxQjt3QkFDMUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRzt3QkFDMUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRztxQkFDM0MsQ0FBQztvQkFFRixJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDekQsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXJELElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ1osT0FBTyxHQUFHOzRCQUNSLE1BQU0sRUFBRSxpQkFBaUI7NEJBQ3pCLE1BQU0sRUFBRSxTQUFTOzRCQUNqQixJQUFJLEVBQUUsT0FBTzt5QkFDZCxDQUFDO3FCQUNIO29CQUNELEtBQUksQ0FBQyxZQUFZLENBQ2YseUJBQXVCLEtBQUssb0JBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUcsQ0FDckUsQ0FBQztvQkFFRixLQUFJLENBQUMsV0FBVyxDQUFDO3dCQUNmLEtBQUssT0FBQTt3QkFDTCxPQUFPLFNBQUE7cUJBQ1IsQ0FBQyxDQUFDO29CQUVILG1EQUFtRDtvQkFDbkQsdUVBQXVFO29CQUN2RSxnRUFBZ0U7b0JBQ2hFLCtFQUErRTtvQkFDL0Usd0JBQXdCO29CQUN4QixJQUFJLEtBQUssS0FBSyxpQkFBUSxDQUFDLFdBQVcsRUFBRTt3QkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FDWDs0QkFDRSxlQUFlLEVBQUUsSUFBSSxnQkFBTSxDQUN6QixpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFDcEIsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQ3JCO3lCQUNGLEVBQ0Q7NEJBQ0U7OzJCQUVEO3dCQUNELENBQUMsQ0FDRixDQUFDO3FCQUNIO29CQUNELElBQUksS0FBSyxLQUFLLGlCQUFRLENBQUMsV0FBVyxFQUFFO3dCQUNsQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFOzRCQUMvQjs7NkJBRUM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7aUJBQ0Y7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDekM7YUFDRjtRQUNILENBQUMsQ0FBQztRQUVGLG9FQUFvRTtRQUNwRSwwRUFBMEU7UUFDbEUsa0JBQVksR0FBRyxVQUFDLElBQUk7WUFDMUIsSUFBSSxzQkFBc0IsRUFBRTtnQkFDMUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDbEU7cUJBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2hCO2dCQUNELEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osYUFBYSxpQkFBTSxLQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRSxPQUFPLEVBQUM7aUJBQ3RELENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDO1FBRU0seUJBQW1CLEdBQUc7WUFDNUIsS0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixVQUFVLEVBQUcsdUJBQXlDO2dCQUN0RCxpQkFBaUIsRUFBRTtvQkFDakIsTUFBTSxFQUFFLElBQUksZ0JBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ2QsU0FBUyxFQUFFO3dCQUNULElBQUksRUFBRSxPQUFPO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3dCQUNkLEtBQUssRUFBRSxDQUFDO3dCQUNSLGNBQWMsRUFBRSxVQUFVO3FCQUMzQjtpQkFDRjtnQkFDRCxZQUFZLEVBQUUseUJBQWdCO2dCQUM5QixZQUFZLEVBQUUseUJBQWE7Z0JBQzNCLG1CQUFtQixFQUFFLElBQUk7YUFDMUIsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osTUFBTSxFQUFFLElBQUksc0JBQVksQ0FDdEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFDekIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQ3hDO29CQUNELGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtpQkFDbkMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBRUYsYUFBTyxHQUFHLFVBQUMsS0FBd0I7WUFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDdkMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDN0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsaUJBQVcsR0FBRztZQUNaLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDO1FBRUYsY0FBUSxHQUFHLFVBQUMsR0FBUTtZQUNsQixJQUFJLEtBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUN4QixLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQztRQS9PQSxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsYUFBYSxFQUFFLElBQUk7WUFDbkIsTUFBTSxFQUFFLElBQUk7WUFDWixlQUFlLEVBQUUsSUFBSTtZQUNyQixhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDdkIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEtBQUs7WUFDZixHQUFHLEVBQUUsTUFBTTtZQUNYLEdBQUcsRUFBRSxDQUFDLElBQUk7WUFDVixZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsRUFBRTtZQUNkLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLElBQUk7WUFDbkIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsc0JBQXNCLEVBQUUsS0FBSztZQUM3QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O0lBQ3RCLENBQUM7SUE4TkQsNkJBQU0sR0FBTjtRQUNFLE9BQU8sQ0FDTCxvQkFBQywyQkFBZ0IsSUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUN2QyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3pCLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFDdkMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUMzQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUN6RCxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQzNDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFDdkMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUN4QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ2pDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUN2QixpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUMvQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUNuRCxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQ3JDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FDckIsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQWpSRCxDQUEyQixLQUFLLENBQUMsU0FBUyxHQWlSekM7QUFFRCxrQkFBZSwyQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB3aXRoTGVhZmxldCB9IGZyb20gJ3JlYWN0LWxlYWZsZXQnO1xyXG5pbXBvcnQge1xyXG4gIExhdExuZ0V4cHJlc3Npb24sXHJcbiAgTGVhZmxldE1vdXNlRXZlbnQsXHJcbiAgTGF0TG5nLFxyXG4gIExhdExuZ0JvdW5kc1xyXG59IGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQge1xyXG4gIFdlYnZpZXdMZWFmbGV0TWVzc2FnZSxcclxuICBNYXBNYXJrZXIsXHJcbiAgTWFwRXZlbnQsXHJcbiAgTWFwVmVjdG9yTGF5ZXJDaXJjbGUsXHJcbiAgTWFwVmVjdG9yTGF5ZXJDaXJjbGVNYXJrZXIsXHJcbiAgTWFwVmVjdG9yTGF5ZXJQb2x5bGluZSxcclxuICBNYXBWZWN0b3JMYXllclBvbHlnb24sXHJcbiAgTWFwVmVjdG9yTGF5ZXJSZWN0YW5nbGUsXHJcbiAgTWFwUmFzdGVyTGF5ZXJcclxufSBmcm9tICcuL21vZGVscyc7XHJcbmltcG9ydCBtb2NrVmVjdG9yTGF5ZXJzIGZyb20gJy4vbW9ja3MvYXBwVmVjdG9yTGF5ZXJzJztcclxuaW1wb3J0IG1vY2tNYXBMYXllcnMgZnJvbSAnLi9tb2Nrcy9hcHBSYXN0ZXJMYXllcnMnO1xyXG5pbXBvcnQgbW9ja01hcE1hcmtlcnMgZnJvbSAnLi9tb2Nrcy9hcHBNYXBNYXJrZXJzJztcclxuaW1wb3J0IE1hcENvbXBvbmVudFZpZXcgZnJvbSAnLi9NYXBDb21wb25lbnQudmlldyc7XHJcblxyXG5yZXF1aXJlKCdyZWFjdC1sZWFmbGV0LW1hcmtlcmNsdXN0ZXIvZGlzdC9zdHlsZXMubWluLmNzcycpO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xyXG5cclxuZXhwb3J0IGVudW0gTWFwQ29tcG9uZW50TWVzc2FnZXMge1xyXG4gIE1BUF9DT01QT05FTlRfTU9VTlRFRCA9ICdNQVBfQ09NUE9ORU5UX01PVU5URUQnLFxyXG4gIERPQ1VNRU5UX0VWRU5UX0xJU1RFTkVSX0FEREVEID0gJ0RPQ1VNRU5UX0VWRU5UX0xJU1RFTkVSX0FEREVEJyxcclxuICBXSU5ET1dfRVZFTlRfTElTVEVORVJfQURERUQgPSAnV0lORE9XX0VWRU5UX0xJU1RFTkVSX0FEREVEJyxcclxuICBVTkFCTEVfVE9fQUREX0VWRU5UX0xJU1RFTkVSID0gJ1VOQUJMRV9UT19BRERfRVZFTlRfTElTVEVORVInLFxyXG4gIERPQ1VNRU5UX0VWRU5UX0xJU1RFTkVSX1JFTU9WRUQgPSAnRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCcsXHJcbiAgV0lORE9XX0VWRU5UX0xJU1RFTkVSX1JFTU9WRUQgPSAnV0lORE9XX0VWRU5UX0xJU1RFTkVSX1JFTU9WRUQnXHJcbn1cclxuXHJcbmludGVyZmFjZSBTdGF0ZSB7XHJcbiAgdmVjdG9yTGF5ZXJzOiAoXHJcbiAgICB8IE1hcFZlY3RvckxheWVyQ2lyY2xlXHJcbiAgICB8IE1hcFZlY3RvckxheWVyQ2lyY2xlTWFya2VyXHJcbiAgICB8IE1hcFZlY3RvckxheWVyUG9seWxpbmVcclxuICAgIHwgTWFwVmVjdG9yTGF5ZXJQb2x5Z29uXHJcbiAgICB8IE1hcFZlY3RvckxheWVyUmVjdGFuZ2xlKVtdO1xyXG4gIGJvdW5kc09wdGlvbnM6IGFueTtcclxuICBib3VuZHM6IExhdExuZ0JvdW5kcyB8IG51bGw7XHJcbiAgcGFuVG9Mb2NhdGlvbjogYW55O1xyXG4gIHNob3dab29tQ29udHJvbDogYm9vbGVhbjtcclxuICBzaG93QXR0cmlidXRpb25Db250cm9sOiBib29sZWFuO1xyXG4gIG1hcENlbnRlckNvb3JkczogTGF0TG5nIHwgbnVsbDtcclxuICBkZWJ1Z01lc3NhZ2VzOiBzdHJpbmdbXTtcclxuICBpc0xvYWRlZDogYm9vbGVhbjtcclxuICBsYXQ6IG51bWJlcjtcclxuICBsbmc6IG51bWJlcjtcclxuICByYXN0ZXJMYXllcnM/OiBNYXBSYXN0ZXJMYXllcltdO1xyXG4gIG1hcE1hcmtlcnM/OiBNYXBNYXJrZXJbXTtcclxuICBvd25Qb3NpdGlvbk1hcmtlcjogTWFwTWFya2VyIHwgbnVsbDtcclxuICB1c2VNYXJrZXJDbHVzdGVyaW5nOiBib29sZWFuO1xyXG4gIHpvb206IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFByb3BzIHt9XHJcbmNvbnN0IFNIT1dfREVCVUdfSU5GT1JNQVRJT04gPSB0cnVlO1xyXG5jb25zdCBFTkFCTEVfQlJPV1NFUl9URVNUSU5HID0gdHJ1ZTtcclxuXHJcbmNsYXNzIE1hcENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcclxuICBzdGF0ZTogU3RhdGU7XHJcbiAgcHJpdmF0ZSBtYXBSZWY6IGFueSA9IG51bGw7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBib3VuZHNPcHRpb25zOiBudWxsLFxyXG4gICAgICBib3VuZHM6IG51bGwsXHJcbiAgICAgIG1hcENlbnRlckNvb3JkczogbnVsbCxcclxuICAgICAgZGVidWdNZXNzYWdlczogWyd0ZXN0J10sXHJcbiAgICAgIHZlY3RvckxheWVyczogW10sXHJcbiAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgICAgbGF0OiA1MS41MDUsXHJcbiAgICAgIGxuZzogLTAuMDksXHJcbiAgICAgIHJhc3RlckxheWVyczogW10sXHJcbiAgICAgIG1hcE1hcmtlcnM6IFtdLFxyXG4gICAgICBvd25Qb3NpdGlvbk1hcmtlcjogbnVsbCxcclxuICAgICAgcGFuVG9Mb2NhdGlvbjogbnVsbCxcclxuICAgICAgc2hvd1pvb21Db250cm9sOiBmYWxzZSxcclxuICAgICAgc2hvd0F0dHJpYnV0aW9uQ29udHJvbDogZmFsc2UsXHJcbiAgICAgIHVzZU1hcmtlckNsdXN0ZXJpbmc6IHRydWUsXHJcbiAgICAgIHpvb206IDEzXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coJ0hlcmUnKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2NvbXBvbmVudERpZE1vdW50Jyk7XHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB7IGRlYnVnTWVzc2FnZXM6IFsuLi50aGlzLnN0YXRlLmRlYnVnTWVzc2FnZXMsICdjb21wb25lbnREaWRNb3VudCddIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1zZzogJ01BUF9DT01SRUFEWSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZERlYnVnTWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2UpLCBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuYWRkRGVidWdNZXNzYWdlKCdzZXQgZG9jdW1lbnQgbGlzdGVuZXJzJyk7XHJcbiAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgbXNnOiAnRE9DVU1FTlRfRVZFTlRfTElTVEVORVJfQURERUQnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdpbmRvdykge1xyXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgdGhpcy5hZGREZWJ1Z01lc3NhZ2UoJ3NldHRpbmcgV2luZG93Jyk7XHJcbiAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgbXNnOiAnV0lORE9XX0VWRU5UX0xJU1RFTkVSX0FEREVEJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZG9jdW1lbnQgJiYgIXdpbmRvdykge1xyXG4gICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIGVycm9yOiAnVU5BQkxFX1RPX0FERF9FVkVOVF9MSVNURU5FUidcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoRU5BQkxFX0JST1dTRVJfVEVTVElORykge1xyXG4gICAgICB0aGlzLnNldHVwQnJvd3NlclRlc3RpbmcoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzOiBQcm9wcywgcHJldlN0YXRlOiBTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgeyBkZWJ1Z01lc3NhZ2VzIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKGRlYnVnTWVzc2FnZXMgIT09IHByZXZTdGF0ZS5kZWJ1Z01lc3NhZ2VzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRlYnVnTWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xyXG4gICAgaWYgKGRvY3VtZW50KSB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBtc2c6ICdET0NVTUVOVF9FVkVOVF9MSVNURU5FUl9SRU1PVkVEJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBtc2c6ICdXSU5ET1dfRVZFTlRfTElTVEVORVJfUkVNT1ZFRCdcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBhZGREZWJ1Z01lc3NhZ2UgPSAobXNnOiBhbnkpID0+IHtcclxuICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmFkZERlYnVnTWVzc2FnZSgnU1RSSU5HSUZJRUQnKTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZGVidWdNZXNzYWdlczogW1xyXG4gICAgICAgICAgLi4udGhpcy5zdGF0ZS5kZWJ1Z01lc3NhZ2VzLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobXNnLCBudWxsLCA0KVxyXG4gICAgICAgIF1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgZGVidWdNZXNzYWdlczogWy4uLnRoaXMuc3RhdGUuZGVidWdNZXNzYWdlcywgbXNnXSB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgIHRoaXMuYWRkRGVidWdNZXNzYWdlKGV2ZW50LmRhdGEpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMuc3RhdGUsIC4uLmV2ZW50LmRhdGEgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmFkZERlYnVnTWVzc2FnZSh7IGVycm9yOiBKU09OLnN0cmluZ2lmeShlcnJvcikgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJvdGVjdGVkIHNlbmRNZXNzYWdlID0gKG1lc3NhZ2U6IFdlYnZpZXdMZWFmbGV0TWVzc2FnZSkgPT4ge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaWYgKHdpbmRvdy5SZWFjdE5hdGl2ZVdlYlZpZXcpIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICB3aW5kb3cuUmVhY3ROYXRpdmVXZWJWaWV3LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgY29uc29sZS5sb2coJ3NlbmRNZXNzYWdlICAnLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50ID0gKGV2ZW50OiBNYXBFdmVudCwgcGF5bG9hZD86IGFueSkgPT4ge1xyXG4gICAgLy8gYnVpbGQgYSBwYXlsb2FkIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcclxuICAgIGlmICh0aGlzLm1hcFJlZiAmJiB0aGlzLnN0YXRlLmlzTG9hZGVkKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbWFwQ2VudGVyUG9zaXRpb246IExhdExuZ0V4cHJlc3Npb24gPSBbXHJcbiAgICAgICAgICB0aGlzLm1hcFJlZi5sZWFmbGV0RWxlbWVudC5nZXRDZW50ZXIoKS5sYXQsXHJcbiAgICAgICAgICB0aGlzLm1hcFJlZi5sZWFmbGV0RWxlbWVudC5nZXRDZW50ZXIoKS5sbmdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBtYXBCb3VuZHMgPSB0aGlzLm1hcFJlZi5sZWFmbGV0RWxlbWVudC5nZXRCb3VuZHMoKTtcclxuICAgICAgICBjb25zdCBtYXBab29tID0gdGhpcy5tYXBSZWYubGVhZmxldEVsZW1lbnQuZ2V0Wm9vbSgpO1xyXG5cclxuICAgICAgICBpZiAoIXBheWxvYWQpIHtcclxuICAgICAgICAgIHBheWxvYWQgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbWFwQ2VudGVyUG9zaXRpb24sXHJcbiAgICAgICAgICAgIGJvdW5kczogbWFwQm91bmRzLFxyXG4gICAgICAgICAgICB6b29tOiBtYXBab29tXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByaW50RWxlbWVudChcclxuICAgICAgICAgIGBvbk1hcEV2ZW50OiBldmVudCA9ICR7ZXZlbnR9LCBwYXlsb2FkID0gJHtKU09OLnN0cmluZ2lmeShwYXlsb2FkKX1gXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHBheWxvYWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtYXAncyBjZW50ZXIgaW4gc3RhdGUgaWYgaXQgaGFzIG1vdmVkXHJcbiAgICAgICAgLy8gVGhlIG1hcCdzIGNlbnRlciBpbiBzdGF0ZSAobWFwQ2VudGVyQ29vcmRzKSBpcyB1c2VkIGJ5IHJlYWN0LmxlYWZsZXRcclxuICAgICAgICAvLyB0byBjZW50ZXIgdGhlIG1hcC4gIENlbnRlcmluZyB0aGUgbWFwIGNvbXBvbmVudCBvbiB0aGUgYWN0dWFsXHJcbiAgICAgICAgLy8gbWFwIGNlbnRlciB3aWxsIGFsbG93IHVzIHRvIHJlY2VudGVyIHRoZSBtYXAgYnkgdXBkYXRpbmcgdGhlIG1hcENlbnRlckNvb3Jkc1xyXG4gICAgICAgIC8vIGl0ZW0gaW4gc3RhdGUgb3Vyc2VsZlxyXG4gICAgICAgIGlmIChldmVudCA9PT0gTWFwRXZlbnQuT05fTU9WRV9FTkQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtYXBDZW50ZXJDb29yZHM6IG5ldyBMYXRMbmcoXHJcbiAgICAgICAgICAgICAgICBtYXBDZW50ZXJQb3NpdGlvblswXSxcclxuICAgICAgICAgICAgICAgIG1hcENlbnRlclBvc2l0aW9uWzFdXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgLyogIHRoaXMucHJpbnRFbGVtZW50KFxyXG4gICAgICAgICAgYCoqKioqKioqKioqKioqIFVwZGF0ZWQgbWFwQ2VudGVyQ29vcmRzID0gJHt0aGlzLnN0YXRlLm1hcENlbnRlckNvb3Jkc31gXHJcbiAgICAgICAgKTsgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSBNYXBFdmVudC5PTl9aT09NX0VORCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHpvb206IG1hcFpvb20gfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvKiAgdGhpcy5wcmludEVsZW1lbnQoXHJcbiAgICAgICAgICBgKioqKioqKioqKioqKiogVXBkYXRlZCBtYXBab29tID0gJHt0aGlzLnN0YXRlLnpvb219YFxyXG4gICAgICAgICk7ICovXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdFUlJPUiBvbk1hcEV2ZW50JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gcHJpbnQgcGFzc2VkIGluZm9ybWF0aW9uIGluIGFuIGh0bWwgZWxlbWVudDsgdXNlZnVsIGZvciBkZWJ1Z2dpbmdcclxuICAvLyBzaW5jZSBjb25zb2xlLmxvZyBhbmQgZGVidWcgc3RhdGVtZW50cyB3b24ndCB3b3JrIGluIGEgY29udmVudGlvbmFsIHdheVxyXG4gIHByaXZhdGUgcHJpbnRFbGVtZW50ID0gKGRhdGEpID0+IHtcclxuICAgIGlmIChTSE9XX0RFQlVHX0lORk9STUFUSU9OKSB7XHJcbiAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBtZXNzYWdlID0gdXRpbC5pbnNwZWN0KGRhdGEsIHsgc2hvd0hpZGRlbjogZmFsc2UsIGRlcHRoOiBudWxsIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBkYXRhO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRlYnVnTWVzc2FnZXM6IFsuLi50aGlzLnN0YXRlLmRlYnVnTWVzc2FnZXMsIG1lc3NhZ2VdXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIHNldHVwQnJvd3NlclRlc3RpbmcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbWFwTWFya2VyczogKG1vY2tNYXBNYXJrZXJzIGFzIHVua25vd24pIGFzIE1hcE1hcmtlcltdLFxyXG4gICAgICBvd25Qb3NpdGlvbk1hcmtlcjoge1xyXG4gICAgICAgIGNvb3JkczogbmV3IExhdExuZygzNi41NiwgLTc2LjE3KSxcclxuICAgICAgICBpY29uOiAn8J+OgycsXHJcbiAgICAgICAgc2l6ZTogWzI0LCAyNF0sXHJcbiAgICAgICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgICAgICBuYW1lOiAncHVsc2UnLFxyXG4gICAgICAgICAgZHVyYXRpb246ICcuNScsXHJcbiAgICAgICAgICBkZWxheTogMCxcclxuICAgICAgICAgIGl0ZXJhdGlvbkNvdW50OiAnaW5maW5pdGUnXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWN0b3JMYXllcnM6IG1vY2tWZWN0b3JMYXllcnMsXHJcbiAgICAgIHJhc3RlckxheWVyczogbW9ja01hcExheWVycyxcclxuICAgICAgdXNlTWFya2VyQ2x1c3RlcmluZzogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGJvdW5kczogbmV3IExhdExuZ0JvdW5kcyhcclxuICAgICAgICAgIFszNi44ODU5OTY1LCAtNzYuNDA5Njc5M10sXHJcbiAgICAgICAgICBbMzkuMDc0Njc2NTkzNTM0OTcsIC03Ni45MTI1MzAxMTk4ODAxMl1cclxuICAgICAgICApLFxyXG4gICAgICAgIGJvdW5kc09wdGlvbnM6IHsgcGFkZGluZzogWzAsIDBdIH1cclxuICAgICAgfSk7XHJcbiAgICB9LCA1MDAwKTtcclxuICB9O1xyXG5cclxuICBvbkNsaWNrID0gKGV2ZW50OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xyXG4gICAgdGhpcy5vbk1hcEV2ZW50KE1hcEV2ZW50Lk9OX01BUF9DTElDS0VELCB7XHJcbiAgICAgIGNvb3JkczogW2V2ZW50LmxhdGxuZy5sYXQsIGV2ZW50LmxhdGxuZy5sbmddXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBvbldoZW5SZWFkeSA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRlZDogdHJ1ZSB9KTtcclxuICAgIHRoaXMucHJpbnRFbGVtZW50KGAqKioqKioqIG1hcCBsb2FkZWQgKioqKioqKmApO1xyXG4gIH07XHJcblxyXG4gIG9uTWFwUmVmID0gKHJlZjogYW55KSA9PiB7XHJcbiAgICBpZiAodGhpcy5tYXBSZWYgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5tYXBSZWYgPSByZWY7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE1hcENvbXBvbmVudFZpZXdcclxuICAgICAgICBhZGREZWJ1Z01lc3NhZ2U9e3RoaXMuYWRkRGVidWdNZXNzYWdlfVxyXG4gICAgICAgIGJvdW5kc09wdGlvbnM9e3RoaXMuc3RhdGUuYm91bmRzT3B0aW9uc31cclxuICAgICAgICBib3VuZHM9e3RoaXMuc3RhdGUuYm91bmRzfVxyXG4gICAgICAgIHBhblRvTG9jYXRpb249e3RoaXMuc3RhdGUucGFuVG9Mb2NhdGlvbn1cclxuICAgICAgICBzaG93Wm9vbUNvbnRyb2w9e3RoaXMuc3RhdGUuc2hvd1pvb21Db250cm9sfVxyXG4gICAgICAgIHNob3dBdHRyaWJ1dGlvbkNvbnRyb2w9e3RoaXMuc3RhdGUuc2hvd0F0dHJpYnV0aW9uQ29udHJvbH1cclxuICAgICAgICBtYXBDZW50ZXJDb29yZHM9e3RoaXMuc3RhdGUubWFwQ2VudGVyQ29vcmRzfVxyXG4gICAgICAgIGRlYnVnTWVzc2FnZXM9e3RoaXMuc3RhdGUuZGVidWdNZXNzYWdlc31cclxuICAgICAgICBpc0xvYWRlZD17dGhpcy5zdGF0ZS5pc0xvYWRlZH1cclxuICAgICAgICBsYXQ9e3RoaXMuc3RhdGUubGF0fVxyXG4gICAgICAgIGxuZz17dGhpcy5zdGF0ZS5sbmd9XHJcbiAgICAgICAgbWFwUmFzdGVyTGF5ZXJzPXt0aGlzLnN0YXRlLnJhc3RlckxheWVyc31cclxuICAgICAgICBtYXBNYXJrZXJzPXt0aGlzLnN0YXRlLm1hcE1hcmtlcnN9XHJcbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrfVxyXG4gICAgICAgIG9uV2hlblJlYWR5PXt0aGlzLm9uV2hlblJlYWR5fVxyXG4gICAgICAgIG9uTWFwRXZlbnQ9e3RoaXMub25NYXBFdmVudH1cclxuICAgICAgICBvbk1hcFJlZj17dGhpcy5vbk1hcFJlZn1cclxuICAgICAgICBvd25Qb3NpdGlvbk1hcmtlcj17dGhpcy5zdGF0ZS5vd25Qb3NpdGlvbk1hcmtlcn1cclxuICAgICAgICB1c2VNYXJrZXJDbHVzdGVyaW5nPXt0aGlzLnN0YXRlLnVzZU1hcmtlckNsdXN0ZXJpbmd9XHJcbiAgICAgICAgdmVjdG9yTGF5ZXJzPXt0aGlzLnN0YXRlLnZlY3RvckxheWVyc31cclxuICAgICAgICB6b29tPXt0aGlzLnN0YXRlLnpvb219XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aExlYWZsZXQoTWFwQ29tcG9uZW50KTtcclxuIl19