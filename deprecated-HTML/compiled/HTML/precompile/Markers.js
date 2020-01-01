"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var models_1 = require("./models");
var react_leaflet_1 = require("react-leaflet");
var react_leaflet_markercluster_1 = require("react-leaflet-markercluster");
var utilities_1 = require("./utilities");
var MapMarkers = function (_a) {
    var mapMarkers = _a.mapMarkers, onMapEvent = _a.onMapEvent, _b = _a.useMarkerClustering, useMarkerClustering = _b === void 0 ? true : _b;
    if (useMarkerClustering) {
        return (React.createElement(react_leaflet_1.LayerGroup, null,
            React.createElement(react_leaflet_markercluster_1.default, null, mapMarkers.map(function (mapMarker) {
                if (mapMarker.id !== 'ownPositionMarker') {
                    return (React.createElement(react_leaflet_1.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_1.createDivIcon(mapMarker), onClick: function () {
                            onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                                id: mapMarker.id
                            });
                        } }, mapMarker.title && React.createElement(react_leaflet_1.Popup, null, mapMarker.title)));
                }
                else {
                    return null;
                }
            })),
            mapMarkers.map(function (mapMarker) {
                if (mapMarker.id === 'ownPositionMarker') {
                    return (React.createElement(react_leaflet_1.Marker, { key: mapMarker.id, position: mapMarker.coords, icon: utilities_1.createDivIcon(mapMarker), onClick: function () {
                            onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                                id: mapMarker.id
                            });
                        } }, mapMarker.title && React.createElement(react_leaflet_1.Popup, null, mapMarker.title)));
                }
                else {
                    return null;
                }
            })));
    }
    else {
        return (React.createElement(react_leaflet_1.LayerGroup, null, mapMarkers.map(function (marker) {
            return (React.createElement(react_leaflet_1.Marker, { key: marker.id, position: marker.coords, 
                // @ts-ignore
                icon: marker.divIcon, onClick: function () {
                    onMapEvent(models_1.MapEvent.ON_MAP_MARKER_CLICKED, {
                        id: marker.id
                    });
                } }, marker.title && React.createElement(react_leaflet_1.Popup, null, marker.title)));
        })));
    }
};
exports.default = MapMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ByZWNvbXBpbGUvTWFya2Vycy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBK0I7QUFDL0IsbUNBQStDO0FBQy9DLCtDQUEwRDtBQUMxRCwyRUFBNkQ7QUFDN0QseUNBQTRDO0FBUTVDLElBQU0sVUFBVSxHQUFHLFVBQUMsRUFJWjtRQUhOLDBCQUFVLEVBQ1YsMEJBQVUsRUFDViwyQkFBMEIsRUFBMUIsK0NBQTBCO0lBRTFCLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxDQUNMLG9CQUFDLDBCQUFVO1lBQ1Qsb0JBQUMscUNBQWtCLFFBQ2hCLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFvQjtnQkFDbkMsSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLG1CQUFtQixFQUFFO29CQUN4QyxPQUFPLENBQ0wsb0JBQUMsc0JBQU0sSUFDTCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFDakIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQzFCLElBQUksRUFBRSx5QkFBYSxDQUFDLFNBQVMsQ0FBQyxFQUM5QixPQUFPLEVBQUU7NEJBQ1AsVUFBVSxDQUFDLGlCQUFRLENBQUMscUJBQXFCLEVBQUU7Z0NBQ3pDLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRTs2QkFDakIsQ0FBQyxDQUFDO3dCQUNMLENBQUMsSUFFQSxTQUFTLENBQUMsS0FBSyxJQUFJLG9CQUFDLHFCQUFLLFFBQUUsU0FBUyxDQUFDLEtBQUssQ0FBUyxDQUM3QyxDQUNWLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUM7aUJBQ2I7WUFDSCxDQUFDLENBQUMsQ0FDaUI7WUFDcEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQW9CO2dCQUNuQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssbUJBQW1CLEVBQUU7b0JBQ3hDLE9BQU8sQ0FDTCxvQkFBQyxzQkFBTSxJQUNMLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUNqQixRQUFRLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFDMUIsSUFBSSxFQUFFLHlCQUFhLENBQUMsU0FBUyxDQUFDLEVBQzlCLE9BQU8sRUFBRTs0QkFDUCxVQUFVLENBQUMsaUJBQVEsQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDekMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFOzZCQUNqQixDQUFDLENBQUM7d0JBQ0wsQ0FBQyxJQUVBLFNBQVMsQ0FBQyxLQUFLLElBQUksb0JBQUMscUJBQUssUUFBRSxTQUFTLENBQUMsS0FBSyxDQUFTLENBQzdDLENBQ1YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUNTLENBQ2QsQ0FBQztLQUNIO1NBQU07UUFDTCxPQUFPLENBQ0wsb0JBQUMsMEJBQVUsUUFDUixVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBaUI7WUFDaEMsT0FBTyxDQUNMLG9CQUFDLHNCQUFNLElBQ0wsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQ2QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2dCQUN2QixhQUFhO2dCQUNiLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxFQUNwQixPQUFPLEVBQUU7b0JBQ1AsVUFBVSxDQUFDLGlCQUFRLENBQUMscUJBQXFCLEVBQUU7d0JBQ3pDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtxQkFDZCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxJQUVBLE1BQU0sQ0FBQyxLQUFLLElBQUksb0JBQUMscUJBQUssUUFBRSxNQUFNLENBQUMsS0FBSyxDQUFTLENBQ3ZDLENBQ1YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNTLENBQ2QsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXIsIE1hcEV2ZW50IH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBMYXllckdyb3VwLCBNYXJrZXIsIFBvcHVwIH0gZnJvbSAncmVhY3QtbGVhZmxldCc7XHJcbmltcG9ydCBNYXJrZXJDbHVzdGVyR3JvdXAgZnJvbSAncmVhY3QtbGVhZmxldC1tYXJrZXJjbHVzdGVyJztcclxuaW1wb3J0IHsgY3JlYXRlRGl2SWNvbiB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgbWFwTWFya2VyczogTWFwTWFya2VyW107XHJcbiAgb25NYXBFdmVudDogKG1hcEV2ZW50OiBNYXBFdmVudCwgbWFwTWFya2VySWQpID0+IHZvaWQ7XHJcbiAgdXNlTWFya2VyQ2x1c3RlcmluZz86IGJvb2xlYW47XHJcbn1cclxuXHJcbmNvbnN0IE1hcE1hcmtlcnMgPSAoe1xyXG4gIG1hcE1hcmtlcnMsXHJcbiAgb25NYXBFdmVudCxcclxuICB1c2VNYXJrZXJDbHVzdGVyaW5nID0gdHJ1ZVxyXG59OiBQcm9wcykgPT4ge1xyXG4gIGlmICh1c2VNYXJrZXJDbHVzdGVyaW5nKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGF5ZXJHcm91cD5cclxuICAgICAgICA8TWFya2VyQ2x1c3Rlckdyb3VwPlxyXG4gICAgICAgICAge21hcE1hcmtlcnMubWFwKChtYXBNYXJrZXI6IE1hcE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFwTWFya2VyLmlkICE9PSAnb3duUG9zaXRpb25NYXJrZXInKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxNYXJrZXJcclxuICAgICAgICAgICAgICAgICAga2V5PXttYXBNYXJrZXIuaWR9XHJcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXttYXBNYXJrZXIuY29vcmRzfVxyXG4gICAgICAgICAgICAgICAgICBpY29uPXtjcmVhdGVEaXZJY29uKG1hcE1hcmtlcil9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvbk1hcEV2ZW50KE1hcEV2ZW50Lk9OX01BUF9NQVJLRVJfQ0xJQ0tFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IG1hcE1hcmtlci5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7bWFwTWFya2VyLnRpdGxlICYmIDxQb3B1cD57bWFwTWFya2VyLnRpdGxlfTwvUG9wdXA+fVxyXG4gICAgICAgICAgICAgICAgPC9NYXJrZXI+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9NYXJrZXJDbHVzdGVyR3JvdXA+XHJcbiAgICAgICAge21hcE1hcmtlcnMubWFwKChtYXBNYXJrZXI6IE1hcE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgaWYgKG1hcE1hcmtlci5pZCA9PT0gJ293blBvc2l0aW9uTWFya2VyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxNYXJrZXJcclxuICAgICAgICAgICAgICAgIGtleT17bWFwTWFya2VyLmlkfVxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb249e21hcE1hcmtlci5jb29yZHN9XHJcbiAgICAgICAgICAgICAgICBpY29uPXtjcmVhdGVEaXZJY29uKG1hcE1hcmtlcil9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIG9uTWFwRXZlbnQoTWFwRXZlbnQuT05fTUFQX01BUktFUl9DTElDS0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1hcE1hcmtlci5pZFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge21hcE1hcmtlci50aXRsZSAmJiA8UG9wdXA+e21hcE1hcmtlci50aXRsZX08L1BvcHVwPn1cclxuICAgICAgICAgICAgICA8L01hcmtlcj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pfVxyXG4gICAgICA8L0xheWVyR3JvdXA+XHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGF5ZXJHcm91cD5cclxuICAgICAgICB7bWFwTWFya2Vycy5tYXAoKG1hcmtlcjogTWFwTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TWFya2VyXHJcbiAgICAgICAgICAgICAga2V5PXttYXJrZXIuaWR9XHJcbiAgICAgICAgICAgICAgcG9zaXRpb249e21hcmtlci5jb29yZHN9XHJcbiAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgIGljb249e21hcmtlci5kaXZJY29ufVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uTWFwRXZlbnQoTWFwRXZlbnQuT05fTUFQX01BUktFUl9DTElDS0VELCB7XHJcbiAgICAgICAgICAgICAgICAgIGlkOiBtYXJrZXIuaWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7bWFya2VyLnRpdGxlICYmIDxQb3B1cD57bWFya2VyLnRpdGxlfTwvUG9wdXA+fVxyXG4gICAgICAgICAgICA8L01hcmtlcj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvTGF5ZXJHcm91cD5cclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwTWFya2VycztcclxuIl19