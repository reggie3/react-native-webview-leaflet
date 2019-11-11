/// <reference types="react" />
declare module "HTML/precompile/models" {
    export enum MapComponentMessages {
        MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
        DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
        WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
        UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
        DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
        WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED"
    }
    export enum MapEvent {
        ON_MOVE_END = "onMoveEnd",
        ON_MOVE_START = "onMoveStart",
        ON_MOVE = "onMove",
        ON_RESIZE = "onResize",
        ON_UNLOAD = "onUnload",
        ON_VIEW_RESET = "onViewReset",
        ON_ZOOM_END = "onZoomEnd",
        ON_ZOOM_LEVELS_CHANGE = "onZoomLevelsChange",
        ON_ZOOM_START = "onZoomStart",
        ON_ZOOM = "onZoom",
        ON_MAP_CLICKED = "onMapClicked",
        ON_MAP_MARKER_CLICKED = "onMapMarkerClicked"
    }
    export interface MapMarkerAnimation {
        name: 'bounce' | 'fade' | 'pulse' | 'jump' | 'waggle' | 'spin';
        duration?: string;
        delay?: number;
        direction?: 'nomal' | 'reverse' | 'alternate' | 'alternate-reverse';
        iterationCount?: number | 'infinite';
    }
    export interface MapMarker {
        animation?: MapMarkerAnimation;
        coords: WebViewLeafletLatLng;
        divIcon?: L.DivIcon;
        icon: any;
        iconAnchor?: L.PointExpression;
        id?: number | string;
        size: L.PointExpression;
        title?: string;
    }
    export interface MapLayer {
        id?: number | string;
        isBaseLayer?: boolean;
        isChecked?: boolean;
        name?: string;
        opacity?: number;
        type?: MapLayerTypes | MapVectorLayerType;
        zIndex?: number;
    }
    export interface MapVectorLayer extends MapLayer {
        attribution?: string;
        color?: string;
    }
    export interface MapVectorLayerCircle extends MapVectorLayer {
        center: WebViewLeafletLatLng;
        radius: number;
    }
    export interface MapVectorLayerCircleMarker extends MapVectorLayer {
        center: WebViewLeafletLatLng;
        radius: number;
    }
    export interface MapVectorLayerPolyline extends MapVectorLayer {
        positions: WebViewLeafletLatLng[] | WebViewLeafletLatLng[][];
    }
    export interface MapVectorLayerPolygon extends MapVectorLayer {
        positions: WebViewLeafletLatLng[] | WebViewLeafletLatLng[][];
    }
    export interface MapVectorLayerRectangle extends MapVectorLayer {
        bounds: WebViewLeafletLatLngBounds;
    }
    export enum MapVectorLayerType {
        CIRCLE = "Circle",
        CIRCLE_MARKER = "CircleMarker",
        POLYLINE = "Polyline",
        POLYGON = "Polygon",
        RECTANGLE = "Rectangle"
    }
    export interface MapRasterLayer extends MapLayer {
        attribution?: string;
        bounds?: WebViewLeafletLatLngBounds;
        layers?: MapLayer[] | string;
        play?: boolean;
        url?: string;
    }
    export enum MapLayerTypes {
        IMAGE_LAYER = "ImageOverlay",
        TILE_LAYER = "TileLayer",
        VECTOR_LAYER = "VectorLayer",
        VIDEO_LAYER = "VideoOverlay",
        WMS_TILE_LAYER = "WMSTileLayer"
    }
    export interface MapStartupMessage {
        rasterLayers?: MapRasterLayer[];
        vectorLayers?: MapVectorLayer[];
        mapMarkers?: MapMarker[];
        mapCenterCoords?: WebViewLeafletLatLng;
        zoom?: number;
    }
    export interface WebViewLeafletLatLng {
        lat: number;
        lng: number;
    }
    export type WebViewLeafletLatLngBounds = WebViewLeafletLatLngBoundsCorners | WebViewLeafletLatLng[];
    export interface WebviewLeafletMessage {
        event?: any;
        msg?: string;
        error?: string;
        payload?: any;
    }
    export interface WebViewLeafletLatLngBoundsCorners {
        southWest: WebViewLeafletLatLng;
        northEast: WebViewLeafletLatLng;
    }
}
declare module "HTML/precompile/webBase64Image" {
    const base64Image = "data:image/gif;base64,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";
    export default base64Image;
}
declare module "WebViewLeaflet/models" {
    export enum MapComponentMessages {
        MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
        DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
        WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
        UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
        DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
        WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED"
    }
    export enum MapEvent {
        ON_MOVE_END = "onMoveEnd",
        ON_MOVE_START = "onMoveStart",
        ON_MOVE = "onMove",
        ON_RESIZE = "onResize",
        ON_UNLOAD = "onUnload",
        ON_VIEW_RESET = "onViewReset",
        ON_ZOOM_END = "onZoomEnd",
        ON_ZOOM_LEVELS_CHANGE = "onZoomLevelsChange",
        ON_ZOOM_START = "onZoomStart",
        ON_ZOOM = "onZoom",
        ON_MAP_CLICKED = "onMapClicked",
        ON_MAP_MARKER_CLICKED = "onMapMarkerClicked"
    }
    export interface MapMarkerAnimation {
        name: 'bounce' | 'fade' | 'pulse' | 'jump' | 'waggle' | 'spin';
        duration?: string;
        delay?: number;
        direction?: 'nomal' | 'reverse' | 'alternate' | 'alternate-reverse';
        iterationCount?: number | 'infinite';
    }
    export interface MapMarker {
        animation?: MapMarkerAnimation;
        coords: WebViewLeafletLatLng;
        divIcon?: L.DivIcon;
        icon: any;
        iconAnchor?: L.PointExpression;
        id?: number | string;
        size: L.PointExpression;
        title?: string;
    }
    export interface MapLayer {
        id?: number | string;
        isBaseLayer?: boolean;
        isChecked?: boolean;
        name?: string;
        opacity?: number;
        type?: MapLayerTypes | MapVectorLayerType;
        zIndex?: number;
    }
    export interface MapVectorLayer extends MapLayer {
        attribution?: string;
        color?: string;
    }
    export interface MapVectorLayerCircle extends MapVectorLayer {
        center: WebViewLeafletLatLng;
        radius: number;
    }
    export interface MapVectorLayerCircleMarker extends MapVectorLayer {
        center: WebViewLeafletLatLng;
        radius: number;
    }
    export interface MapVectorLayerPolyline extends MapVectorLayer {
        positions: WebViewLeafletLatLng[] | WebViewLeafletLatLng[][];
    }
    export interface MapVectorLayerPolygon extends MapVectorLayer {
        positions: WebViewLeafletLatLng[] | WebViewLeafletLatLng[][];
    }
    export interface MapVectorLayerRectangle extends MapVectorLayer {
        bounds: WebViewLeafletLatLngBounds;
    }
    export enum MapVectorLayerType {
        CIRCLE = "Circle",
        CIRCLE_MARKER = "CircleMarker",
        POLYLINE = "Polyline",
        POLYGON = "Polygon",
        RECTANGLE = "Rectangle"
    }
    export interface MapRasterLayer extends MapLayer {
        attribution?: string;
        bounds?: WebViewLeafletLatLngBounds;
        layers?: MapLayer[] | string;
        play?: boolean;
        url?: string;
    }
    export enum MapLayerTypes {
        IMAGE_LAYER = "ImageOverlay",
        TILE_LAYER = "TileLayer",
        VECTOR_LAYER = "VectorLayer",
        VIDEO_LAYER = "VideoOverlay",
        WMS_TILE_LAYER = "WMSTileLayer"
    }
    export interface MapStartupMessage {
        rasterLayers?: MapRasterLayer[];
        vectorLayers?: MapVectorLayer[];
        mapMarkers?: MapMarker[];
        mapCenterCoords?: WebViewLeafletLatLng;
        zoom?: number;
    }
    export interface WebViewLeafletLatLng {
        lat: number;
        lng: number;
    }
    export type WebViewLeafletLatLngBounds = WebViewLeafletLatLngBoundsCorners | WebViewLeafletLatLng[];
    export interface WebviewLeafletMessage {
        event?: any;
        msg?: string;
        error?: string;
        payload?: any;
    }
    export interface WebViewLeafletLatLngBoundsCorners {
        southWest: WebViewLeafletLatLng;
        northEast: WebViewLeafletLatLng;
    }
}
declare module "HTML/precompile/utilities" {
    import { DivIcon, LatLngBounds } from 'leaflet';
    import { MapMarker, WebViewLeafletLatLngBounds } from "HTML/precompile/models";
    import { WebViewLeafletLatLng } from "WebViewLeaflet/models";
    export const createDivIcon: (mapMarker: MapMarker) => DivIcon;
    export const convertSingleLatLngToNumberArray: (latLng: WebViewLeafletLatLng) => [number, number];
    export const convertLatLngArrayToNumberArray: (latLngs: WebViewLeafletLatLng[]) => [number, number][];
    export const convertWebViewLeafletLatLngToNumberArray: (latLngs: WebViewLeafletLatLng | WebViewLeafletLatLng[] | WebViewLeafletLatLng[][]) => [number, number] | [number, number][];
    export const convertWebViewLeafletLatLngBoundsToLeaftletBounds: (bounds: WebViewLeafletLatLngBounds) => LatLngBounds;
}
declare module "HTML/precompile/RasterLayer" {
    import { MapRasterLayer } from "HTML/precompile/models";
    interface Props {
        addDebugMessage: (msg: any) => void;
        layer: MapRasterLayer;
    }
    const RasterLayer: (props: Props) => JSX.Element;
    export default RasterLayer;
}
declare module "HTML/precompile/ControlsLayer" {
    import { MapRasterLayer } from "HTML/precompile/models";
    interface Props {
        addDebugMessage: (msg: any) => void;
        mapRasterLayers: MapRasterLayer[];
    }
    const ControlsLayer: (props: Props) => JSX.Element;
    export default ControlsLayer;
}
declare module "appData/appVectorLayers" {
    import { MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolygon, MapVectorLayerPolyline, MapVectorLayerRectangle } from 'react-native-webview-leaflet';
    export const circle: MapVectorLayerCircle;
    export const circleMarker: MapVectorLayerCircleMarker;
    export const polygon: MapVectorLayerPolygon;
    export const multiPolygon: MapVectorLayerPolygon;
    export const polyline: MapVectorLayerPolyline;
    export const multiPolyline: MapVectorLayerPolyline;
    export const rectangle: MapVectorLayerRectangle;
    const mapVectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
    export default mapVectorLayers;
}
declare module "secrets" {
    export const mapboxToken = "pk.eyJ1IjoicmVnZ2llMyIsImEiOiJjamp1aDhjbzgwZXdrM3FtYjVicDFreWEyIn0.guMquqkaxyuaWs2ujtUGBg";
}
declare module "appData/appRasterLayers" {
    import { MapRasterLayer } from 'react-native-webview-leaflet';
    const mapLayers: MapRasterLayer[];
    export default mapLayers;
}
declare module "appData/svgIcons" {
    export const greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>";
}
declare module "appData/appMapMarkers" {
    import { MapMarker } from 'react-native-webview-leaflet';
    const mapMarkers: MapMarker[];
    export default mapMarkers;
}
declare module "HTML/precompile/VectorLayers" {
    import { MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolyline, MapVectorLayerPolygon, MapVectorLayerRectangle } from "HTML/precompile/models";
    interface Props {
        vectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
    }
    const VectorLayers: ({ vectorLayers }: Props) => JSX.Element;
    export default VectorLayers;
}
declare module "HTML/precompile/Markers" {
    import { MapMarker, MapEvent } from "HTML/precompile/models";
    interface Props {
        mapMarkers: MapMarker[];
        onMapEvent: (mapEvent: MapEvent, mapMarkerId: any) => void;
        useMarkerClustering?: boolean;
    }
    const MapMarkers: ({ mapMarkers, onMapEvent, useMarkerClustering }: Props) => JSX.Element;
    export default MapMarkers;
}
declare module "HTML/precompile/MapComponent.view" {
    import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
    import { MapMarker, MapEvent, MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolyline, MapVectorLayerPolygon, MapVectorLayerRectangle, MapRasterLayer } from "HTML/precompile/models";
    import 'leaflet/dist/leaflet.css';
    import 'leaflet/dist/images/marker-icon-2x.png';
    import 'leaflet/dist/images/marker-shadow.png';
    import './markers.css';
    interface Props {
        addDebugMessage: (msg: any) => void;
        boundsOptions: any;
        bounds: any;
        panToLocation: any;
        showZoomControl: boolean;
        showAttributionControl: boolean;
        mapCenterCoords: LatLngExpression;
        debugMessages: string[];
        isLoaded: boolean;
        lat: number;
        lng: number;
        mapRasterLayers?: MapRasterLayer[];
        mapMarkers?: MapMarker[];
        onClick: (event: LeafletMouseEvent) => void;
        onMapEvent: (mapEvent: MapEvent) => void;
        onMapRef: (mapRef: any) => void;
        onWhenReady: () => void;
        ownPositionMarker: MapMarker;
        useMarkerClustering: boolean;
        vectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
        zoom: number;
    }
    const MapComponentView: ({ addDebugMessage, vectorLayers, boundsOptions, bounds, panToLocation, showZoomControl, showAttributionControl, mapCenterCoords, debugMessages, isLoaded, lat, lng, mapRasterLayers, mapMarkers, onClick, onWhenReady, onMapEvent, onMapRef, ownPositionMarker, useMarkerClustering, zoom }: Props) => JSX.Element;
    export default MapComponentView;
}
declare module "HTML/precompile/MapComponent" {
    import * as React from 'react';
    export enum MapComponentMessages {
        MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
        DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
        WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
        UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
        DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
        WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED"
    }
    interface Props {
    }
    const _default: React.ComponentType<Pick<Props, never>>;
    export default _default;
}
declare module "HTML/precompile/index" { }
declare module "HTML/precompile/secrets" {
    export const mapboxToken = "pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw";
}
declare module "HTML/precompile/svgIcons" {
    export const greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>";
}
declare module "HTML/precompile/mocks/appVectorLayers" {
    import { MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolygon, MapVectorLayerPolyline, MapVectorLayerRectangle } from 'react-native-webview-leaflet';
    export const circle: MapVectorLayerCircle;
    export const circleMarker: MapVectorLayerCircleMarker;
    export const polygon: MapVectorLayerPolygon;
    export const multiPolygon: MapVectorLayerPolygon;
    export const polyline: MapVectorLayerPolyline;
    export const multiPolyline: MapVectorLayerPolyline;
    export const rectangle: MapVectorLayerRectangle;
    const mapVectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
    export default mapVectorLayers;
}
declare module "HTML/precompile/__tests__/VectorLayers.test" { }
declare module "HTML/precompile/__tests__/utilities.test" { }
declare module "HTML/precompile/mocks/svgIcons" {
    export const greenCircle = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <circle id=\"greencircle\" cx=\"30\" cy=\"30\" r=\"30\" fill=\"green\" />\n</svg>";
}
declare module "HTML/precompile/mocks/appMapMarkers" {
    import { MapMarker } from 'react-native-webview-leaflet';
    const mapMarkers: MapMarker[];
    export default mapMarkers;
}
declare module "HTML/precompile/mocks/appRasterLayers" {
    import { MapRasterLayer } from 'react-native-webview-leaflet';
    const mapLayers: MapRasterLayer[];
    export default mapLayers;
}
