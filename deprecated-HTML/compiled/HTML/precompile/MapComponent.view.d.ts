/// <reference types="react" />
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { MapMarker, MapEvent, MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolyline, MapVectorLayerPolygon, MapVectorLayerRectangle, MapRasterLayer } from './models';
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
declare const MapComponentView: ({ addDebugMessage, vectorLayers, boundsOptions, bounds, panToLocation, showZoomControl, showAttributionControl, mapCenterCoords, debugMessages, isLoaded, lat, lng, mapRasterLayers, mapMarkers, onClick, onWhenReady, onMapEvent, onMapRef, ownPositionMarker, useMarkerClustering, zoom }: Props) => JSX.Element;
export default MapComponentView;
