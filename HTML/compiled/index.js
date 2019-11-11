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
System.register("HTML/precompile/models", [], function (exports_1, context_1) {
    "use strict";
    var MapComponentMessages, MapEvent, MapVectorLayerType, MapLayerTypes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (MapComponentMessages) {
                MapComponentMessages["MAP_COMPONENT_MOUNTED"] = "MAP_COMPONENT_MOUNTED";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_ADDED"] = "DOCUMENT_EVENT_LISTENER_ADDED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_ADDED"] = "WINDOW_EVENT_LISTENER_ADDED";
                MapComponentMessages["UNABLE_TO_ADD_EVENT_LISTENER"] = "UNABLE_TO_ADD_EVENT_LISTENER";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_REMOVED"] = "DOCUMENT_EVENT_LISTENER_REMOVED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_REMOVED"] = "WINDOW_EVENT_LISTENER_REMOVED";
            })(MapComponentMessages || (MapComponentMessages = {}));
            exports_1("MapComponentMessages", MapComponentMessages);
            (function (MapEvent) {
                MapEvent["ON_MOVE_END"] = "onMoveEnd";
                MapEvent["ON_MOVE_START"] = "onMoveStart";
                MapEvent["ON_MOVE"] = "onMove";
                MapEvent["ON_RESIZE"] = "onResize";
                MapEvent["ON_UNLOAD"] = "onUnload";
                MapEvent["ON_VIEW_RESET"] = "onViewReset";
                MapEvent["ON_ZOOM_END"] = "onZoomEnd";
                MapEvent["ON_ZOOM_LEVELS_CHANGE"] = "onZoomLevelsChange";
                MapEvent["ON_ZOOM_START"] = "onZoomStart";
                MapEvent["ON_ZOOM"] = "onZoom";
                MapEvent["ON_MAP_CLICKED"] = "onMapClicked";
                MapEvent["ON_MAP_MARKER_CLICKED"] = "onMapMarkerClicked";
            })(MapEvent || (MapEvent = {}));
            exports_1("MapEvent", MapEvent);
            (function (MapVectorLayerType) {
                MapVectorLayerType["CIRCLE"] = "Circle";
                MapVectorLayerType["CIRCLE_MARKER"] = "CircleMarker";
                MapVectorLayerType["POLYLINE"] = "Polyline";
                MapVectorLayerType["POLYGON"] = "Polygon";
                MapVectorLayerType["RECTANGLE"] = "Rectangle";
            })(MapVectorLayerType || (MapVectorLayerType = {}));
            exports_1("MapVectorLayerType", MapVectorLayerType);
            (function (MapLayerTypes) {
                MapLayerTypes["IMAGE_LAYER"] = "ImageOverlay";
                MapLayerTypes["TILE_LAYER"] = "TileLayer";
                MapLayerTypes["VECTOR_LAYER"] = "VectorLayer";
                MapLayerTypes["VIDEO_LAYER"] = "VideoOverlay";
                MapLayerTypes["WMS_TILE_LAYER"] = "WMSTileLayer";
            })(MapLayerTypes || (MapLayerTypes = {}));
            exports_1("MapLayerTypes", MapLayerTypes);
        }
    };
});
System.register("HTML/precompile/webBase64Image", [], function (exports_2, context_2) {
    "use strict";
    var base64Image;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            base64Image = 'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw==';
            exports_2("default", base64Image);
        }
    };
});
System.register("WebViewLeaflet/models", [], function (exports_3, context_3) {
    "use strict";
    var MapComponentMessages, MapEvent, MapVectorLayerType, MapLayerTypes;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            (function (MapComponentMessages) {
                MapComponentMessages["MAP_COMPONENT_MOUNTED"] = "MAP_COMPONENT_MOUNTED";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_ADDED"] = "DOCUMENT_EVENT_LISTENER_ADDED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_ADDED"] = "WINDOW_EVENT_LISTENER_ADDED";
                MapComponentMessages["UNABLE_TO_ADD_EVENT_LISTENER"] = "UNABLE_TO_ADD_EVENT_LISTENER";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_REMOVED"] = "DOCUMENT_EVENT_LISTENER_REMOVED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_REMOVED"] = "WINDOW_EVENT_LISTENER_REMOVED";
            })(MapComponentMessages || (MapComponentMessages = {}));
            exports_3("MapComponentMessages", MapComponentMessages);
            (function (MapEvent) {
                MapEvent["ON_MOVE_END"] = "onMoveEnd";
                MapEvent["ON_MOVE_START"] = "onMoveStart";
                MapEvent["ON_MOVE"] = "onMove";
                MapEvent["ON_RESIZE"] = "onResize";
                MapEvent["ON_UNLOAD"] = "onUnload";
                MapEvent["ON_VIEW_RESET"] = "onViewReset";
                MapEvent["ON_ZOOM_END"] = "onZoomEnd";
                MapEvent["ON_ZOOM_LEVELS_CHANGE"] = "onZoomLevelsChange";
                MapEvent["ON_ZOOM_START"] = "onZoomStart";
                MapEvent["ON_ZOOM"] = "onZoom";
                MapEvent["ON_MAP_CLICKED"] = "onMapClicked";
                MapEvent["ON_MAP_MARKER_CLICKED"] = "onMapMarkerClicked";
            })(MapEvent || (MapEvent = {}));
            exports_3("MapEvent", MapEvent);
            (function (MapVectorLayerType) {
                MapVectorLayerType["CIRCLE"] = "Circle";
                MapVectorLayerType["CIRCLE_MARKER"] = "CircleMarker";
                MapVectorLayerType["POLYLINE"] = "Polyline";
                MapVectorLayerType["POLYGON"] = "Polygon";
                MapVectorLayerType["RECTANGLE"] = "Rectangle";
            })(MapVectorLayerType || (MapVectorLayerType = {}));
            exports_3("MapVectorLayerType", MapVectorLayerType);
            (function (MapLayerTypes) {
                MapLayerTypes["IMAGE_LAYER"] = "ImageOverlay";
                MapLayerTypes["TILE_LAYER"] = "TileLayer";
                MapLayerTypes["VECTOR_LAYER"] = "VectorLayer";
                MapLayerTypes["VIDEO_LAYER"] = "VideoOverlay";
                MapLayerTypes["WMS_TILE_LAYER"] = "WMSTileLayer";
            })(MapLayerTypes || (MapLayerTypes = {}));
            exports_3("MapLayerTypes", MapLayerTypes);
        }
    };
});
System.register("HTML/precompile/utilities", ["HTML/precompile/webBase64Image"], function (exports_4, context_4) {
    "use strict";
    var L, webBase64Image_1, createDivIcon, getAnimatedHTMLString, getUnanimatedHTMLString, getIconFromEmojiOrImageOrSVG, convertSingleLatLngToNumberArray, convertLatLngArrayToNumberArray, convertWebViewLeafletLatLngToNumberArray, convertWebViewLeafletLatLngBoundsToLeaftletBounds;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (webBase64Image_1_1) {
                webBase64Image_1 = webBase64Image_1_1;
            }
        ],
        execute: function () {
            L = require('leaflet');
            exports_4("createDivIcon", createDivIcon = function (mapMarker) {
                var divIcon = L.divIcon({
                    className: 'clearMarkerContainer',
                    html: mapMarker.animation
                        ? getAnimatedHTMLString(mapMarker.icon || '📍', mapMarker.animation || null, mapMarker.size || [24, 24])
                        : getUnanimatedHTMLString(mapMarker.icon, mapMarker.size),
                    iconAnchor: mapMarker.iconAnchor || null
                });
                return divIcon;
            });
            /*
              Get the HTML string containing the icon div, and animation parameters
              */
            getAnimatedHTMLString = function (icon, animation, size) {
                if (size === void 0) { size = [24, 24]; }
                return "<div class='animationContainer' style=\"\n    animation-name: " + (animation.name ? animation.name : 'bounce') + "; \n    animation-duration: " + (animation.duration ? animation.duration : 1) + "s ;\n    animation-delay: " + (animation.delay ? animation.delay : 0) + "s;\n    animation-direction: " + (animation.direction ? animation.direction : 'normal') + ";\n    animation-iteration-count: " + (animation.iterationCount ? animation.iterationCount : 'infinite') + "\">\n    " + getIconFromEmojiOrImageOrSVG(icon, size) + "\n    </div>";
            };
            getUnanimatedHTMLString = function (icon, size) {
                if (size === void 0) { size = [24, 24]; }
                return "<div class='unanimatedIconContainer' >\n    " + getIconFromEmojiOrImageOrSVG(icon, size) + "\n    </div>";
            };
            getIconFromEmojiOrImageOrSVG = function (icon, size) {
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
            exports_4("convertSingleLatLngToNumberArray", convertSingleLatLngToNumberArray = function (latLng) {
                return [latLng.lat, latLng.lng];
            });
            exports_4("convertLatLngArrayToNumberArray", convertLatLngArrayToNumberArray = function (latLngs) {
                return latLngs.map(function (latLng) {
                    return convertSingleLatLngToNumberArray(latLng);
                });
            });
            exports_4("convertWebViewLeafletLatLngToNumberArray", convertWebViewLeafletLatLngToNumberArray = function (latLngs) {
                // received a signle LatLng
                if (!Array.isArray(latLngs)) {
                    return convertSingleLatLngToNumberArray(latLngs);
                }
                else {
                    // @ts-ignore TS doesn't like that I'm mapping this.
                    return latLngs.map(function (latLng) {
                        return convertWebViewLeafletLatLngToNumberArray(latLng);
                    });
                }
            });
            exports_4("convertWebViewLeafletLatLngBoundsToLeaftletBounds", convertWebViewLeafletLatLngBoundsToLeaftletBounds = function (bounds) {
                var convertedBounds = null;
                if (bounds.hasOwnProperty('southWest')) {
                    var _a = bounds, southWest = _a.southWest, northEast = _a.northEast;
                    convertedBounds = {
                        southWest: convertWebViewLeafletLatLngToNumberArray(southWest),
                        northEast: convertWebViewLeafletLatLngToNumberArray(northEast)
                    };
                }
                else {
                    convertedBounds = convertWebViewLeafletLatLngToNumberArray(bounds);
                }
                console.log(convertedBounds);
                return convertedBounds;
            });
        }
    };
});
System.register("HTML/precompile/RasterLayer", ["react", "HTML/precompile/models", "react-leaflet", "HTML/precompile/utilities"], function (exports_5, context_5) {
    "use strict";
    var React, models_1, react_leaflet_1, utilities_1, RasterLayer;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (react_leaflet_1_1) {
                react_leaflet_1 = react_leaflet_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }
        ],
        execute: function () {
            RasterLayer = function (props) {
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
            exports_5("default", RasterLayer);
        }
    };
});
System.register("HTML/precompile/ControlsLayer", ["react", "react-leaflet", "HTML/precompile/RasterLayer"], function (exports_6, context_6) {
    "use strict";
    var React, react_leaflet_2, RasterLayer_1, ControlsLayer;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (React_2) {
                React = React_2;
            },
            function (react_leaflet_2_1) {
                react_leaflet_2 = react_leaflet_2_1;
            },
            function (RasterLayer_1_1) {
                RasterLayer_1 = RasterLayer_1_1;
            }
        ],
        execute: function () {
            ControlsLayer = function (props) {
                return (React.createElement(React.Fragment, null, props.mapRasterLayers.map(function (layer, index) {
                    if (layer.isBaseLayer) {
                        return (React.createElement(react_leaflet_2.LayersControl.BaseLayer, __assign({ name: layer.name, checked: layer.isChecked || false, key: index }, props),
                            React.createElement(RasterLayer_1.default, __assign({ addDebugMessage: props.addDebugMessage, layer: layer }, props))));
                    }
                    else {
                        return (React.createElement(react_leaflet_2.LayersControl.Overlay, __assign({ name: layer.name, checked: layer.isChecked || false, key: index }, props),
                            React.createElement(RasterLayer_1.default, __assign({ addDebugMessage: props.addDebugMessage, layer: layer }, props))));
                    }
                })));
            };
            exports_6("default", ControlsLayer);
        }
    };
});
System.register("appData/appVectorLayers", ["react-native-webview-leaflet"], function (exports_7, context_7) {
    "use strict";
    var react_native_webview_leaflet_1, circle, circleMarker, polygon, multiPolygon, polyline, multiPolyline, rectangle, mapVectorLayers;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (react_native_webview_leaflet_1_1) {
                react_native_webview_leaflet_1 = react_native_webview_leaflet_1_1;
            }
        ],
        execute: function () {
            exports_7("circle", circle = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.CIRCLE,
                color: '#123123',
                id: 1,
                center: { lat: 34.225727, lng: -77.94471 },
                radius: 2000
            });
            exports_7("circleMarker", circleMarker = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.CIRCLE_MARKER,
                color: 'red',
                id: 2,
                center: { lat: 38.437424, lng: -78.867912 },
                radius: 15
            });
            exports_7("polygon", polygon = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.POLYGON,
                color: 'blue',
                id: 3,
                positions: [
                    { lat: 38.80118939192329, lng: -74.69604492187501 },
                    { lat: 38.19502155795575, lng: -74.65209960937501 },
                    { lat: 39.07890809706475, lng: -71.46606445312501 }
                ]
            });
            exports_7("multiPolygon", multiPolygon = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.POLYGON,
                color: 'violet',
                id: 4,
                positions: [
                    [
                        { lat: 37.13842453422676, lng: -74.28955078125001 },
                        { lat: 36.4433803110554, lng: -74.26208496093751 },
                        { lat: 36.43896124085948, lng: -73.00964355468751 },
                        { lat: 36.43896124085948, lng: -73.00964355468751 }
                    ],
                    [
                        { lat: 37.505368263398104, lng: -72.38891601562501 },
                        { lat: 37.309014074275915, lng: -71.96594238281251 },
                        { lat: 36.69044623523481, lng: -71.87805175781251 },
                        { lat: 36.58024660149866, lng: -72.75146484375001 },
                        { lat: 37.36579146999664, lng: -72.88330078125001 }
                    ]
                ]
            });
            exports_7("polyline", polyline = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.POLYLINE,
                color: 'orange',
                id: 5,
                positions: [
                    { lat: 35.411438052435486, lng: -78.67858886718751 },
                    { lat: 35.9602229692967, lng: -79.18945312500001 },
                    { lat: 35.97356075349624, lng: -78.30505371093751 }
                ]
            });
            exports_7("multiPolyline", multiPolyline = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.POLYLINE,
                color: 'purple',
                id: '5a',
                positions: [
                    [
                        { lat: 36.36822190085111, lng: -79.26086425781251 },
                        { lat: 36.659606226479696, lng: -79.28833007812501 },
                        { lat: 36.721273880045004, lng: -79.81018066406251 }
                    ],
                    [
                        { lat: 35.43381992014202, lng: -79.79370117187501 },
                        { lat: 35.44277092585766, lng: -81.23840332031251 },
                        { lat: 35.007502842952896, lng: -80.837402343750017 }
                    ]
                ]
            });
            exports_7("rectangle", rectangle = {
                type: react_native_webview_leaflet_1.MapVectorLayerType.RECTANGLE,
                color: 'yellow',
                id: 6,
                bounds: {
                    southWest: { lat: 51.49, lng: -0.08 },
                    northEast: { lat: 51.5, lng: -0.06 }
                }
            });
            mapVectorLayers = [
                circle
                /* circleMarker,
                polygon,
                multiPolygon,
                polyline,
                multiPolyline,
                rectangle */
            ];
            exports_7("default", mapVectorLayers);
        }
    };
});
System.register("secrets", [], function (exports_8, context_8) {
    "use strict";
    var mapboxToken;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            exports_8("mapboxToken", mapboxToken = 'pk.eyJ1IjoicmVnZ2llMyIsImEiOiJjamp1aDhjbzgwZXdrM3FtYjVicDFreWEyIn0.guMquqkaxyuaWs2ujtUGBg');
        }
    };
});
System.register("appData/appRasterLayers", ["react-native-webview-leaflet"], function (exports_9, context_9) {
    "use strict";
    var react_native_webview_leaflet_2, mapLayers;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (react_native_webview_leaflet_2_1) {
                react_native_webview_leaflet_2 = react_native_webview_leaflet_2_1;
            }
        ],
        execute: function () {
            mapLayers = [
                {
                    name: 'OpenStreetMap',
                    isChecked: true,
                    type: react_native_webview_leaflet_2.MapLayerTypes.TILE_LAYER,
                    isBaseLayer: true,
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                }
                /* {
                  name: 'streets',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
              
                  url: `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                } */
                /*
                {
                  name: 'light',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
                  //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  url: `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                },
                {
                  name: 'dark',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
                  url: `https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                }, */
                /* {
                   name: 'image',
                   type: 'ImageOverlay',
                   isBaseLayer: true,
                   url: 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
                   bounds: [[40.712216, -74.22655], [40.773941, -74.12544]]
                 }, */
                /*  {
                  name: 'WMS Tile Layer',
                  type: MapLayerTypes.TILE_LAYER,
                  url: 'https://demo.boundlessgeo.com/geoserver/ows',
                  layers: 'nasa:bluemarble'
                } */
                /* {
                  type: 'VideoOverlay',
                  name: 'video',
                  isBaseLayer: true,
                  url: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
                  bounds: [[32, -130], [13, -100]]
                } */
            ];
            exports_9("default", mapLayers);
        }
    };
});
System.register("appData/svgIcons", [], function (exports_10, context_10) {
    "use strict";
    var greenCircle;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            exports_10("greenCircle", greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>");
        }
    };
});
System.register("appData/appMapMarkers", ["appData/svgIcons", "leaflet"], function (exports_11, context_11) {
    "use strict";
    var emoji, animations, duration, delay, interationCount, svgIcons, leaflet_1, mapMarkers;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (svgIcons_1) {
                svgIcons = svgIcons_1;
            },
            function (leaflet_1_1) {
                leaflet_1 = leaflet_1_1;
            }
        ],
        execute: function () {
            emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
            animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
            duration = Math.floor(Math.random() * 3) + 1;
            delay = Math.floor(Math.random()) * 0.5;
            interationCount = 'infinite';
            mapMarkers = [
                {
                    id: 2,
                    coords: { lat: 37.06452161, lng: -75.67364786 },
                    icon: '😴',
                    size: [
                        64,
                        64
                    ] /* ,
                    animation: {
                      name: animations[Math.floor(Math.random() * animations.length)],
                      duration,
                      delay,
                      interationCount
                    } */
                },
                {
                    id: 1,
                    coords: { lat: 36.46410354, lng: -75.6432701 },
                    icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
                    size: [32, 32],
                    animation: {
                        name: 'bounce',
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                },
                {
                    id: 100,
                    coords: new leaflet_1.LatLng(37.23310632, -76.23518332),
                    icon: emoji[Math.floor(Math.random() * emoji.length)],
                    animation: {
                        name: animations[Math.floor(Math.random() * animations.length)],
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                },
                /* {
                  id: 1,
                  coords: [36.46410354, -75.6432701],
                  icon: '😴',
                  size: [32, 32],
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                },*/
                {
                    id: 1000,
                    coords: new leaflet_1.LatLng(36.60061515, -76.48888338),
                    icon: svgIcons.greenCircle,
                    animation: {
                        name: animations[Math.floor(Math.random() * animations.length)],
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                }
                /* {
                  id: Math.floor(Math.random() * 1000),
                  coords: [37.0580835, -75.82318747],
                  icon: 'Fish',
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                },
                {
                  id: Math.floor(Math.random() * 1000),
                  coords: [37.23310632, -76.23518332],
                  icon: emoji[Math.floor(Math.random() * emoji.length)],
                  size: [4, 4],
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                } */
                /*
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.94994253, -76.64318409],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.19810239, -76.28058546],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.02416165, -76.56052521],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.91541467, -75.49279245],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.70503123, -76.32755185],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.31605891, -76.45141618],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.59436803, -76.89486842],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.35740877, -75.77910112],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.31509182, -76.76693784],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.91815909, -76.06707072],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.611917, -75.76758822],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.79520769, -76.3959497],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.42854666, -75.95883052],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.78673099, -76.90459724],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.20966767, -75.58799685],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  } */
            ];
            exports_11("default", mapMarkers);
        }
    };
});
System.register("HTML/precompile/VectorLayers", ["react", "react-leaflet", "HTML/precompile/models", "HTML/precompile/utilities"], function (exports_12, context_12) {
    "use strict";
    var React, react_leaflet_3, models_2, utilities_2, VectorLayers;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (React_3) {
                React = React_3;
            },
            function (react_leaflet_3_1) {
                react_leaflet_3 = react_leaflet_3_1;
            },
            function (models_2_1) {
                models_2 = models_2_1;
            },
            function (utilities_2_1) {
                utilities_2 = utilities_2_1;
            }
        ],
        execute: function () {
            VectorLayers = function (_a) {
                var vectorLayers = _a.vectorLayers;
                return (React.createElement(react_leaflet_3.LayerGroup, null, vectorLayers.map(function (mapVectorLayer, index) {
                    var layerId = mapVectorLayer.id || index;
                    switch (mapVectorLayer.type) {
                        case models_2.MapVectorLayerType.CIRCLE: {
                            var layer = mapVectorLayer;
                            return (React.createElement(react_leaflet_3.Circle, { key: mapVectorLayer.id, color: layer.color || 'white', 
                                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                                center: utilities_2.convertWebViewLeafletLatLngToNumberArray(layer.center), radius: layer.radius, attribution: layer.attribution || null }));
                        }
                        case models_2.MapVectorLayerType.CIRCLE_MARKER: {
                            var layer = mapVectorLayer;
                            return (React.createElement(react_leaflet_3.CircleMarker, { key: mapVectorLayer.id, color: layer.color || 'white', 
                                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                                center: convertSingleLatLngToNumberArray(layer.center), radius: layer.radius, attribution: layer.attribution || null }));
                        }
                        case models_2.MapVectorLayerType.POLYGON: {
                            var layer = mapVectorLayer;
                            return (React.createElement(react_leaflet_3.Polygon, { key: mapVectorLayer.id, color: layer.color || 'white', 
                                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                                positions: utilities_2.convertWebViewLeafletLatLngToNumberArray(layer.positions), attribution: layer.attribution || null }));
                        }
                        case models_2.MapVectorLayerType.POLYLINE: {
                            var layer = mapVectorLayer;
                            return (React.createElement(react_leaflet_3.Polyline, { key: mapVectorLayer.id, color: layer.color || 'white', 
                                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                                positions: utilities_2.convertWebViewLeafletLatLngToNumberArray(layer.positions), attribution: layer.attribution || null }));
                        }
                        case models_2.MapVectorLayerType.RECTANGLE: {
                            var layer = mapVectorLayer;
                            return (React.createElement(react_leaflet_3.Rectangle, { key: mapVectorLayer.id, color: layer.color || 'white', 
                                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                                bounds: utilities_2.convertWebViewLeafletLatLngToNumberArray(layer.bounds), attribution: layer.attribution || null }));
                        }
                        default:
                            console.warn('Unknown vector layer type', mapVectorLayer.type);
                    }
                })));
            };
            exports_12("default", VectorLayers);
        }
    };
});
System.register("HTML/precompile/Markers", ["react", "HTML/precompile/models", "react-leaflet", "react-leaflet-markercluster", "HTML/precompile/utilities"], function (exports_13, context_13) {
    "use strict";
    var React, models_3, react_leaflet_4, react_leaflet_markercluster_1, utilities_3, MapMarkers;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (React_4) {
                React = React_4;
            },
            function (models_3_1) {
                models_3 = models_3_1;
            },
            function (react_leaflet_4_1) {
                react_leaflet_4 = react_leaflet_4_1;
            },
            function (react_leaflet_markercluster_1_1) {
                react_leaflet_markercluster_1 = react_leaflet_markercluster_1_1;
            },
            function (utilities_3_1) {
                utilities_3 = utilities_3_1;
            }
        ],
        execute: function () {
            MapMarkers = function (_a) {
                var mapMarkers = _a.mapMarkers, onMapEvent = _a.onMapEvent, _b = _a.useMarkerClustering, useMarkerClustering = _b === void 0 ? true : _b;
                if (useMarkerClustering) {
                    return (React.createElement(react_leaflet_4.LayerGroup, null,
                        React.createElement(react_leaflet_markercluster_1.default, null, mapMarkers.map(function (mapMarker) {
                            if (mapMarker.id !== 'ownPositionMarker') {
                                return (React.createElement(react_leaflet_4.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_3.createDivIcon(mapMarker), onClick: function () {
                                        onMapEvent(models_3.MapEvent.ON_MAP_MARKER_CLICKED, {
                                            id: mapMarker.id
                                        });
                                    } }, mapMarker.title && React.createElement(react_leaflet_4.Popup, null, mapMarker.title)));
                            }
                            else {
                                return null;
                            }
                        })),
                        mapMarkers.map(function (mapMarker) {
                            if (mapMarker.id === 'ownPositionMarker') {
                                return (React.createElement(react_leaflet_4.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_3.createDivIcon(mapMarker), onClick: function () {
                                        onMapEvent(models_3.MapEvent.ON_MAP_MARKER_CLICKED, {
                                            id: mapMarker.id
                                        });
                                    } }, mapMarker.title && React.createElement(react_leaflet_4.Popup, null, mapMarker.title)));
                            }
                            else {
                                return null;
                            }
                        })));
                }
                else {
                    return (React.createElement(react_leaflet_4.LayerGroup, null, mapMarkers.map(function (marker) {
                        return (React.createElement(react_leaflet_4.Marker, { key: marker.id, position: marker.coords, icon: marker.divIcon, onClick: function () {
                                onMapEvent(models_3.MapEvent.ON_MAP_MARKER_CLICKED, {
                                    id: marker.id
                                });
                            } }, marker.title && React.createElement(react_leaflet_4.Popup, null, marker.title)));
                    })));
                }
            };
            exports_13("default", MapMarkers);
        }
    };
});
System.register("HTML/precompile/MapComponent.view", ["react", "react-leaflet", "HTML/precompile/models", "HTML/precompile/ControlsLayer", "HTML/precompile/RasterLayer", "leaflet/dist/leaflet.css", "leaflet/dist/images/marker-icon-2x.png", "leaflet/dist/images/marker-shadow.png", "./markers.css", "HTML/precompile/VectorLayers", "HTML/precompile/Markers"], function (exports_14, context_14) {
    "use strict";
    var React, react_leaflet_5, models_4, ControlsLayer_1, RasterLayer_2, VectorLayers_1, Markers_1, SHOW_DEBUG_INFORMATION, ENABLE_BROWSER_TESTING, MapComponentView;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (React_5) {
                React = React_5;
            },
            function (react_leaflet_5_1) {
                react_leaflet_5 = react_leaflet_5_1;
            },
            function (models_4_1) {
                models_4 = models_4_1;
            },
            function (ControlsLayer_1_1) {
                ControlsLayer_1 = ControlsLayer_1_1;
            },
            function (RasterLayer_2_1) {
                RasterLayer_2 = RasterLayer_2_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (VectorLayers_1_1) {
                VectorLayers_1 = VectorLayers_1_1;
            },
            function (Markers_1_1) {
                Markers_1 = Markers_1_1;
            }
        ],
        execute: function () {
            require('react-leaflet-markercluster/dist/styles.min.css');
            SHOW_DEBUG_INFORMATION = true;
            ENABLE_BROWSER_TESTING = true;
            MapComponentView = function (_a) {
                var addDebugMessage = _a.addDebugMessage, vectorLayers = _a.vectorLayers, boundsOptions = _a.boundsOptions, bounds = _a.bounds, panToLocation = _a.panToLocation, showZoomControl = _a.showZoomControl, showAttributionControl = _a.showAttributionControl, mapCenterCoords = _a.mapCenterCoords, debugMessages = _a.debugMessages, isLoaded = _a.isLoaded, lat = _a.lat, lng = _a.lng, _b = _a.mapRasterLayers, mapRasterLayers = _b === void 0 ? [] : _b, _c = _a.mapMarkers, mapMarkers = _c === void 0 ? [] : _c, onClick = _a.onClick, onWhenReady = _a.onWhenReady, onMapEvent = _a.onMapEvent, onMapRef = _a.onMapRef, ownPositionMarker = _a.ownPositionMarker, useMarkerClustering = _a.useMarkerClustering, zoom = _a.zoom;
                return (React.createElement(React.Fragment, null,
                    mapRasterLayers.length < 1 ? (React.createElement("div", null, "waiting for map layers")) : (React.createElement(react_leaflet_5.Map, { style: {
                            width: '100%',
                            backgroundColor: 'lightblue'
                        }, zoom: zoom, ref: function (component) {
                            onMapRef(component);
                        }, center: mapCenterCoords, attributionControl: showAttributionControl, zoomControl: showZoomControl, panToLocation: panToLocation, maxZoom: 18, bounds: bounds, boundsOptions: boundsOptions, whenReady: onWhenReady, onClick: onClick, onZoomLevelsChange: function () {
                            onMapEvent(models_4.MapEvent.ON_ZOOM_LEVELS_CHANGE);
                        }, onResize: function () {
                            onMapEvent(models_4.MapEvent.ON_RESIZE);
                        }, onZoomStart: function () {
                            onMapEvent(models_4.MapEvent.ON_ZOOM_START);
                        }, onMoveStart: function () {
                            onMapEvent(models_4.MapEvent.ON_MOVE_START);
                        }, onZoom: function () {
                            onMapEvent(models_4.MapEvent.ON_ZOOM);
                        }, onMove: function () {
                            onMapEvent(models_4.MapEvent.ON_MOVE);
                        }, onZoomEnd: function () {
                            onMapEvent(models_4.MapEvent.ON_ZOOM_END);
                        }, onMoveEnd: function () {
                            onMapEvent(models_4.MapEvent.ON_MOVE);
                        }, onUnload: function () {
                            onMapEvent(models_4.MapEvent.ON_UNLOAD);
                        }, onViewReset: function () {
                            onMapEvent(models_4.MapEvent.ON_VIEW_RESET);
                        } },
                        mapRasterLayers.length === 1 ? (React.createElement(RasterLayer_2.default, { layer: mapRasterLayers[0], addDebugMessage: addDebugMessage })) : (React.createElement(react_leaflet_5.LayersControl, { position: "topright" },
                            React.createElement(ControlsLayer_1.default, { mapRasterLayers: mapRasterLayers, addDebugMessage: addDebugMessage }))),
                        isLoaded && (React.createElement(react_leaflet_5.LayersControl, { position: "topleft" },
                            React.createElement(react_leaflet_5.LayersControl.Overlay, { name: "Markers", checked: true },
                                isLoaded && React.createElement(VectorLayers_1.default, { vectorLayers: vectorLayers }),
                                isLoaded && (React.createElement(Markers_1.default, { mapMarkers: mapMarkers, onMapEvent: onMapEvent, useMarkerClustering: true }))))))),
                    SHOW_DEBUG_INFORMATION ? (React.createElement("div", { style: {
                            backgroundColor: 'orange',
                            maxHeight: '200px',
                            overflow: 'auto',
                            padding: 5,
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 15000
                        }, id: "messages" },
                        React.createElement("ul", null, debugMessages.map(function (message, index) {
                            return React.createElement("li", { key: index }, message);
                        })))) : null));
            };
            exports_14("default", MapComponentView);
        }
    };
});
System.register("HTML/precompile/MapComponent", ["react", "react-leaflet", "leaflet", "HTML/precompile/models", "appData/appVectorLayers", "appData/appRasterLayers", "appData/appMapMarkers", "HTML/precompile/MapComponent.view"], function (exports_15, context_15) {
    "use strict";
    var React, react_leaflet_6, leaflet_2, models_5, appVectorLayers_1, appRasterLayers_1, appMapMarkers_1, MapComponent_view_1, util, MapComponentMessages, SHOW_DEBUG_INFORMATION, ENABLE_BROWSER_TESTING, MapComponent;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (React_6) {
                React = React_6;
            },
            function (react_leaflet_6_1) {
                react_leaflet_6 = react_leaflet_6_1;
            },
            function (leaflet_2_1) {
                leaflet_2 = leaflet_2_1;
            },
            function (models_5_1) {
                models_5 = models_5_1;
            },
            function (appVectorLayers_1_1) {
                appVectorLayers_1 = appVectorLayers_1_1;
            },
            function (appRasterLayers_1_1) {
                appRasterLayers_1 = appRasterLayers_1_1;
            },
            function (appMapMarkers_1_1) {
                appMapMarkers_1 = appMapMarkers_1_1;
            },
            function (MapComponent_view_1_1) {
                MapComponent_view_1 = MapComponent_view_1_1;
            }
        ],
        execute: function () {
            require('react-leaflet-markercluster/dist/styles.min.css');
            util = require('util');
            (function (MapComponentMessages) {
                MapComponentMessages["MAP_COMPONENT_MOUNTED"] = "MAP_COMPONENT_MOUNTED";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_ADDED"] = "DOCUMENT_EVENT_LISTENER_ADDED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_ADDED"] = "WINDOW_EVENT_LISTENER_ADDED";
                MapComponentMessages["UNABLE_TO_ADD_EVENT_LISTENER"] = "UNABLE_TO_ADD_EVENT_LISTENER";
                MapComponentMessages["DOCUMENT_EVENT_LISTENER_REMOVED"] = "DOCUMENT_EVENT_LISTENER_REMOVED";
                MapComponentMessages["WINDOW_EVENT_LISTENER_REMOVED"] = "WINDOW_EVENT_LISTENER_REMOVED";
            })(MapComponentMessages || (MapComponentMessages = {}));
            exports_15("MapComponentMessages", MapComponentMessages);
            SHOW_DEBUG_INFORMATION = true;
            ENABLE_BROWSER_TESTING = false;
            MapComponent = /** @class */ (function (_super) {
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
                                if (event === models_5.MapEvent.ON_MOVE_END) {
                                    _this.setState({
                                        mapCenterCoords: new leaflet_2.LatLng(mapCenterPosition[0], mapCenterPosition[1])
                                    }, function () {
                                        /*  this.printElement(
                                    `************** Updated mapCenterCoords = ${this.state.mapCenterCoords}`
                                  ); */
                                    });
                                }
                                if (event === models_5.MapEvent.ON_ZOOM_END) {
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
                                coords: new leaflet_2.LatLng(36.56, -76.17),
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
                                bounds: new leaflet_2.LatLngBounds([36.8859965, -76.4096793], [39.07467659353497, -76.91253011988012]),
                                boundsOptions: { padding: [0, 0] }
                            });
                        }, 5000);
                    };
                    _this.onClick = function (event) {
                        _this.onMapEvent(models_5.MapEvent.ON_MAP_CLICKED, {
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
            exports_15("default", react_leaflet_6.withLeaflet(MapComponent));
        }
    };
});
/* import * as React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './mapComponent';

ReactDOM.render(<MapComponent />, document.getElementById('app'));
 */
System.register("HTML/precompile/index", ["react", "react-dom", "HTML/precompile/MapComponent"], function (exports_16, context_16) {
    "use strict";
    var React, ReactDOM, MapComponent_1;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (React_7) {
                React = React_7;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (MapComponent_1_1) {
                MapComponent_1 = MapComponent_1_1;
            }
        ],
        execute: function () {/* import * as React from 'react';
            import ReactDOM from 'react-dom';
            import MapComponent from './mapComponent';
            
            ReactDOM.render(<MapComponent />, document.getElementById('app'));
             */
            ReactDOM.render(React.createElement(MapComponent_1.default, null), document.getElementById('root'));
        }
    };
});
System.register("HTML/precompile/secrets", [], function (exports_17, context_17) {
    "use strict";
    var mapboxToken;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            exports_17("mapboxToken", mapboxToken = 'pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw');
        }
    };
});
System.register("HTML/precompile/svgIcons", [], function (exports_18, context_18) {
    "use strict";
    var greenCircle;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            exports_18("greenCircle", greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>");
        }
    };
});
System.register("HTML/precompile/mocks/appVectorLayers", ["react-native-webview-leaflet"], function (exports_19, context_19) {
    "use strict";
    var react_native_webview_leaflet_3, circle, circleMarker, polygon, multiPolygon, polyline, multiPolyline, rectangle, mapVectorLayers;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (react_native_webview_leaflet_3_1) {
                react_native_webview_leaflet_3 = react_native_webview_leaflet_3_1;
            }
        ],
        execute: function () {
            exports_19("circle", circle = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.CIRCLE,
                color: '#123123',
                id: 1,
                center: { lat: 34.225727, lng: -77.94471 },
                radius: 2000
            });
            exports_19("circleMarker", circleMarker = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.CIRCLE_MARKER,
                color: 'red',
                id: 2,
                center: { lat: 38.437424, lng: -78.867912 },
                radius: 15
            });
            exports_19("polygon", polygon = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.POLYGON,
                color: 'blue',
                id: 3,
                positions: [
                    { lat: 38.80118939192329, lng: -74.69604492187501 },
                    { lat: 38.19502155795575, lng: -74.65209960937501 },
                    { lat: 39.07890809706475, lng: -71.46606445312501 }
                ]
            });
            exports_19("multiPolygon", multiPolygon = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.POLYGON,
                color: 'violet',
                id: 4,
                positions: [
                    [
                        { lat: 37.13842453422676, lng: -74.28955078125001 },
                        { lat: 36.4433803110554, lng: -74.26208496093751 },
                        { lat: 36.43896124085948, lng: -73.00964355468751 },
                        { lat: 36.43896124085948, lng: -73.00964355468751 }
                    ],
                    [
                        { lat: 37.505368263398104, lng: -72.38891601562501 },
                        { lat: 37.309014074275915, lng: -71.96594238281251 },
                        { lat: 36.69044623523481, lng: -71.87805175781251 },
                        { lat: 36.58024660149866, lng: -72.75146484375001 },
                        { lat: 37.36579146999664, lng: -72.88330078125001 }
                    ]
                ]
            });
            exports_19("polyline", polyline = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.POLYLINE,
                color: 'orange',
                id: 5,
                positions: [
                    { lat: 35.411438052435486, lng: -78.67858886718751 },
                    { lat: 35.9602229692967, lng: -79.18945312500001 },
                    { lat: 35.97356075349624, lng: -78.30505371093751 }
                ]
            });
            exports_19("multiPolyline", multiPolyline = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.POLYLINE,
                color: 'purple',
                id: '5a',
                positions: [
                    [
                        { lat: 36.36822190085111, lng: -79.26086425781251 },
                        { lat: 36.659606226479696, lng: -79.28833007812501 },
                        { lat: 36.721273880045004, lng: -79.81018066406251 }
                    ],
                    [
                        { lat: 35.43381992014202, lng: -79.79370117187501 },
                        { lat: 35.44277092585766, lng: -81.23840332031251 },
                        { lat: 35.007502842952896, lng: -80.837402343750017 }
                    ]
                ]
            });
            exports_19("rectangle", rectangle = {
                type: react_native_webview_leaflet_3.MapVectorLayerType.RECTANGLE,
                color: 'yellow',
                id: 6,
                bounds: {
                    southWest: { lat: 51.49, lng: -0.08 },
                    northEast: { lat: 51.5, lng: -0.06 }
                }
            });
            mapVectorLayers = [
                circle
                /* circleMarker,
                polygon,
                multiPolygon,
                polyline,
                multiPolyline,
                rectangle */
            ];
            exports_19("default", mapVectorLayers);
        }
    };
});
System.register("HTML/precompile/__tests__/VectorLayers.test", ["HTML/precompile/VectorLayers", "react", "react-native-testing-library", "HTML/precompile/mocks/appVectorLayers"], function (exports_20, context_20) {
    "use strict";
    var VectorLayers_2, React, react_native_testing_library_1, appVectorLayers_2;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (VectorLayers_2_1) {
                VectorLayers_2 = VectorLayers_2_1;
            },
            function (React_8) {
                React = React_8;
            },
            function (react_native_testing_library_1_1) {
                react_native_testing_library_1 = react_native_testing_library_1_1;
            },
            function (appVectorLayers_2_1) {
                appVectorLayers_2 = appVectorLayers_2_1;
            }
        ],
        execute: function () {
            describe('VectorLayers component', function () {
                it('should render', function () {
                    var renderRes = react_native_testing_library_1.render(React.createElement(VectorLayers_2.default, { vectorLayers: appVectorLayers_2.default }));
                    console.log('================================');
                    console.log(renderRes);
                    console.log('================================');
                });
            });
        }
    };
});
System.register("HTML/precompile/__tests__/utilities.test", ["HTML/precompile/utilities"], function (exports_21, context_21) {
    "use strict";
    var utilities_4, singleLatLng, latLngArray, latLng2DArray, cornerBounds, arrayBounds;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (utilities_4_1) {
                utilities_4 = utilities_4_1;
            }
        ],
        execute: function () {
            singleLatLng = { lat: 34.225727, lng: -77.94471 };
            latLngArray = [
                { lat: 38.80118939192329, lng: -74.69604492187501 },
                { lat: 38.19502155795575, lng: -74.65209960937501 },
                { lat: 39.07890809706475, lng: -71.46606445312501 }
            ];
            latLng2DArray = [
                [
                    { lat: 37.13842453422676, lng: -74.28955078125001 },
                    { lat: 36.4433803110554, lng: -74.26208496093751 },
                    { lat: 36.43896124085948, lng: -73.00964355468751 },
                    { lat: 36.43896124085948, lng: -73.00964355468751 }
                ],
                [
                    { lat: 37.505368263398104, lng: -72.38891601562501 },
                    { lat: 37.309014074275915, lng: -71.96594238281251 },
                    { lat: 36.69044623523481, lng: -71.87805175781251 },
                    { lat: 36.58024660149866, lng: -72.75146484375001 },
                    { lat: 37.36579146999664, lng: -72.88330078125001 }
                ]
            ];
            describe('convertWebViewLeafletLatLngToNumberArray', function () {
                it('can covert a single lat lng to a number array ', function () {
                    var singleConverted = utilities_4.convertWebViewLeafletLatLngToNumberArray(singleLatLng);
                    expect(singleConverted).toEqual([34.225727, -77.94471]);
                });
                it('can covert a an array of latLng to an array of number arrays', function () {
                    var convertedLatLongArray = utilities_4.convertWebViewLeafletLatLngToNumberArray(latLngArray);
                    expect(convertedLatLongArray).toEqual([
                        [38.80118939192329, -74.69604492187501],
                        [38.19502155795575, -74.65209960937501],
                        [39.07890809706475, -71.46606445312501]
                    ]);
                });
                it('can covert a 2D Array of latLngs to a 2D number array ', function () {
                    var latLng2DArrayConverted = utilities_4.convertWebViewLeafletLatLngToNumberArray(latLng2DArray);
                    expect(latLng2DArrayConverted).toEqual([
                        [
                            [37.13842453422676, -74.28955078125001],
                            [36.4433803110554, -74.26208496093751],
                            [36.43896124085948, -73.00964355468751],
                            [36.43896124085948, -73.00964355468751]
                        ],
                        [
                            [37.505368263398104, -72.38891601562501],
                            [37.309014074275915, -71.96594238281251],
                            [36.69044623523481, -71.87805175781251],
                            [36.58024660149866, -72.75146484375001],
                            [37.36579146999664, -72.88330078125001]
                        ]
                    ]);
                });
            });
            cornerBounds = {
                southWest: { lat: 36.665099, lng: -76.842042 },
                northEast: { lat: 37.365855, lng: -76.158245 }
            };
            arrayBounds = [
                { lat: 38.89688, lng: -77.302505 },
                { lat: 37.829395, lng: -76.756299 }
            ];
            describe('convertWebViewLeafletLatLngBoundsToLeaftletBounds', function () {
                it('can figure out whether the bounds of type WebViewLeafletLatLngBoundsCorners or WebViewLeafletLatLng[]', function () {
                    console.log('******************************');
                });
                it('can covert WebViewLeafletLatLngBoundsCorner objects', function () {
                    var convertedBounds = utilities_4.convertWebViewLeafletLatLngBoundsToLeaftletBounds(cornerBounds);
                    expect(convertedBounds).toEqual({
                        southWest: [36.665099, -76.842042],
                        northEast: [37.365855, -76.158245]
                    });
                });
                it('can covert WebViewLeafletLatLngBounds[] objects', function () {
                    var convertedBounds = utilities_4.convertWebViewLeafletLatLngBoundsToLeaftletBounds(arrayBounds);
                    expect(convertedBounds).toEqual([
                        [38.89688, -77.302505],
                        [37.829395, -76.756299]
                    ]);
                });
            });
        }
    };
});
System.register("HTML/precompile/mocks/svgIcons", [], function (exports_22, context_22) {
    "use strict";
    var greenCircle;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            exports_22("greenCircle", greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>");
        }
    };
});
System.register("HTML/precompile/mocks/appMapMarkers", ["HTML/precompile/mocks/svgIcons", "leaflet"], function (exports_23, context_23) {
    "use strict";
    var emoji, animations, duration, delay, interationCount, svgIcons, leaflet_3, mapMarkers;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (svgIcons_2) {
                svgIcons = svgIcons_2;
            },
            function (leaflet_3_1) {
                leaflet_3 = leaflet_3_1;
            }
        ],
        execute: function () {
            emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
            animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
            duration = Math.floor(Math.random() * 3) + 1;
            delay = Math.floor(Math.random()) * 0.5;
            interationCount = 'infinite';
            mapMarkers = [
                {
                    id: 2,
                    coords: { lat: 37.06452161, lng: -75.67364786 },
                    icon: '😴',
                    size: [
                        64,
                        64
                    ] /* ,
                    animation: {
                      name: animations[Math.floor(Math.random() * animations.length)],
                      duration,
                      delay,
                      interationCount
                    } */
                },
                {
                    id: 1,
                    coords: { lat: 36.46410354, lng: -75.6432701 },
                    icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
                    size: [32, 32],
                    animation: {
                        name: 'bounce',
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                },
                {
                    id: 100,
                    coords: new leaflet_3.LatLng(37.23310632, -76.23518332),
                    icon: emoji[Math.floor(Math.random() * emoji.length)],
                    animation: {
                        name: animations[Math.floor(Math.random() * animations.length)],
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                },
                /* {
                  id: 1,
                  coords: [36.46410354, -75.6432701],
                  icon: '😴',
                  size: [32, 32],
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                },*/
                {
                    id: 1000,
                    coords: new leaflet_3.LatLng(36.60061515, -76.48888338),
                    icon: svgIcons.greenCircle,
                    animation: {
                        name: animations[Math.floor(Math.random() * animations.length)],
                        duration: duration,
                        delay: delay,
                        interationCount: interationCount
                    }
                }
                /* {
                  id: Math.floor(Math.random() * 1000),
                  coords: [37.0580835, -75.82318747],
                  icon: 'Fish',
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                },
                {
                  id: Math.floor(Math.random() * 1000),
                  coords: [37.23310632, -76.23518332],
                  icon: emoji[Math.floor(Math.random() * emoji.length)],
                  size: [4, 4],
                  animation: {
                    name: animations[Math.floor(Math.random() * animations.length)],
                    duration,
                    delay,
                    interationCount
                  }
                } */
                /*
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.94994253, -76.64318409],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.19810239, -76.28058546],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.02416165, -76.56052521],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.91541467, -75.49279245],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.70503123, -76.32755185],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.31605891, -76.45141618],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.59436803, -76.89486842],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.35740877, -75.77910112],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.31509182, -76.76693784],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.91815909, -76.06707072],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.611917, -75.76758822],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.79520769, -76.3959497],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.42854666, -75.95883052],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [36.78673099, -76.90459724],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  },
                  {
                      id: Math.floor(Math.random() * 1000),
                      coords: [37.20966767, -75.58799685],
                      icon: emoji[Math.floor(Math.random() * emoji.length)],
                      animation: {
                          name: animations[Math.floor(Math.random() * animations.length)],
                          duration: Math.floor(Math.random() * 3) + 1,
                          delay: Math.floor(Math.random()) * 0.5,
                          interationCount
                      }
                  } */
            ];
            exports_23("default", mapMarkers);
        }
    };
});
System.register("HTML/precompile/mocks/appRasterLayers", ["react-native-webview-leaflet"], function (exports_24, context_24) {
    "use strict";
    var react_native_webview_leaflet_4, mapLayers;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (react_native_webview_leaflet_4_1) {
                react_native_webview_leaflet_4 = react_native_webview_leaflet_4_1;
            }
        ],
        execute: function () {
            mapLayers = [
                {
                    name: 'OpenStreetMap',
                    isChecked: true,
                    type: react_native_webview_leaflet_4.MapLayerTypes.TILE_LAYER,
                    isBaseLayer: true,
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                }
                /* {
                  name: 'streets',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
              
                  url: `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                } */
                /*
                {
                  name: 'light',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
                  //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  url: `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                },
                {
                  name: 'dark',
                  type: MapLayerTypes.TILE_LAYER,
                  isBaseLayer: true,
                  url: `https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                  attribution:
                    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                }, */
                /* {
                   name: 'image',
                   type: 'ImageOverlay',
                   isBaseLayer: true,
                   url: 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
                   bounds: [[40.712216, -74.22655], [40.773941, -74.12544]]
                 }, */
                /*  {
                  name: 'WMS Tile Layer',
                  type: MapLayerTypes.TILE_LAYER,
                  url: 'https://demo.boundlessgeo.com/geoserver/ows',
                  layers: 'nasa:bluemarble'
                } */
                /* {
                  type: 'VideoOverlay',
                  name: 'video',
                  isBaseLayer: true,
                  url: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
                  bounds: [[32, -130], [13, -100]]
                } */
            ];
            exports_24("default", mapLayers);
        }
    };
});
//# sourceMappingURL=index.js.map