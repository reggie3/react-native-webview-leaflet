import * as React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Polygon,
  withLeaflet
} from 'react-leaflet';
import { DivIcon, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import {
  WebviewLeafletMessage,
  MapMarker,
  MapMarkerAnimation,
  MapEvent,
  MapLayerTypes
} from '../../WebViewLeaflet/models';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ControlsLayer from './ControlsLayer';
import RasterLayer from './RasterLayer';
import L = require('leaflet');
import base64Image from './webBase64Image';
import mockMapLayers from './mockMapLayers';
import mockMapMarkers from './mockMapMarkers';
import { MapLayer, MapGeometryLayer } from '../../WebViewLeaflet/models';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import './markers.css';
import GeometryLayers from './GeometryLayer';
import MapMarkers from './Markers';

require('react-leaflet-markercluster/dist/styles.min.css');
const util = require('util');

interface State {
  geometryLayers: MapGeometryLayer[];
  boundsOptions: any;
  bounds: any;
  panToLocation: any;
  showZoomControl: boolean;
  showAttributionControl: boolean;
  centerPosition: LatLngExpression;
  debugMessages: string[];
  isLoaded: boolean;
  lat: number;
  lng: number;
  mapLayers?: MapLayer[];
  mapMarkers?: MapMarker[];
  ownPositionMarker: MapMarker;
  useMarkerClustering: boolean;
  zoom: number;
}

interface Props {
  geometryLayers: MapGeometryLayer[];
  boundsOptions: any;
  bounds: any;
  panToLocation: any;
  showZoomControl: boolean;
  showAttributionControl: boolean;
  centerPosition: LatLngExpression;
  debugMessages: string[];
  isLoaded: boolean;
  lat: number;
  lng: number;
  mapLayers?: MapLayer[];
  mapMarkers?: MapMarker[];
  onClick: (event: LeafletMouseEvent) => void;
  onMapEvent: (mapEvent: MapEvent) => void;
  onMapRef: (mapRef: any) => void;
  onWhenReady: () => void;
  ownPositionMarker: MapMarker;
  useMarkerClustering: boolean;
  zoom: number;
}
const SHOW_DEBUG_INFORMATION = true;
const ENABLE_BROWSER_TESTING = true;

const MapComponentView = ({
  geometryLayers,
  boundsOptions,
  bounds,
  panToLocation,
  showZoomControl,
  showAttributionControl,
  centerPosition,
  debugMessages,
  isLoaded,
  lat,
  lng,
  mapLayers,
  mapMarkers,
  onClick,
  onWhenReady,
  onMapEvent,
  onMapRef,
  ownPositionMarker,
  useMarkerClustering,
  zoom
}: Props) => {
  return (
    <>
      {mapLayers.length < 1 ? (
        <div>waiting on map layers</div>
      ) : (
        <Map
          style={{
            width: '100%',
            backgroundColor: 'lightblue'
          }}
          ref={(component) => {
            onMapRef(component);
          }}
          center={centerPosition}
          attributionControl={showAttributionControl}
          zoomControl={showZoomControl}
          panToLocation={panToLocation}
          maxZoom={18}
          zoom={zoom}
          bounds={bounds}
          boundsOptions={boundsOptions}
          whenReady={onWhenReady}
          onClick={onClick}
          onZoomLevelsChange={() => {
            onMapEvent(MapEvent.ON_ZOOM_LEVELS_CHANGE);
          }}
          onResize={() => {
            onMapEvent(MapEvent.ON_RESIZE);
          }}
          onZoomStart={() => {
            onMapEvent(MapEvent.ON_ZOOM_START);
          }}
          onMoveStart={() => {
            onMapEvent(MapEvent.ON_MOVE_START);
          }}
          onZoom={() => {
            onMapEvent(MapEvent.ON_ZOOM);
          }}
          onMove={() => {
            onMapEvent(MapEvent.ON_MOVE);
          }}
          onZoomEnd={() => {
            onMapEvent(MapEvent.ON_ZOOM_END);
          }}
          onMoveEnd={() => {
            onMapEvent(MapEvent.ON_MOVE);
          }}
          onUnload={() => {
            onMapEvent(MapEvent.ON_UNLOAD);
          }}
          onViewReset={() => {
            onMapEvent(MapEvent.ON_VIEW_RESET);
          }}
        >
          {mapLayers.length === 1 ? (
            <RasterLayer layer={mapLayers[0]} />
          ) : (
            <LayersControl position="topright">
              <ControlsLayer mapLayers={mapLayers} />
            </LayersControl>
          )}
          {isLoaded && (
            <LayersControl position="topleft">
              <LayersControl.Overlay name="Markers" checked={true}>
                {isLoaded && <GeometryLayers geometryLayers={geometryLayers} />}
                {isLoaded && (
                  <MapMarkers
                    mapMarkers={mapMarkers}
                    onMapEvent={onMapEvent}
                    useMarkerClustering={true}
                  />
                )}
              </LayersControl.Overlay>
            </LayersControl>
          )}
        </Map>
      )}
      {SHOW_DEBUG_INFORMATION ? (
        <div
          style={{
            backgroundColor: 'orange',
            maxHeight: '200px',
            overflow: 'auto',
            padding: 5,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 15000
          }}
          id="messages"
        >
          <ul>
            {debugMessages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default MapComponentView;
