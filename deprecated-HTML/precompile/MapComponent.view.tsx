import * as React from 'react';
import { Map, LayersControl, Polyline, TileLayer, Circle } from 'react-leaflet';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import {
  MapMarker,
  MapEvent,
  MapVectorLayerCircle,
  MapVectorLayerCircleMarker,
  MapVectorLayerPolyline,
  MapVectorLayerPolygon,
  MapVectorLayerRectangle,
  MapRasterLayer
} from './models';
import ControlsLayer from './ControlsLayer';
import RasterLayer from './RasterLayer';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import './markers.css';
import VectorLayers from './VectorLayers';
import MapMarkers from './Markers';
import VectorLayers from '../precompile/VectorLayers';

require('react-leaflet-markercluster/dist/styles.min.css');

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
  vectorLayers: (
    | MapVectorLayerCircle
    | MapVectorLayerCircleMarker
    | MapVectorLayerPolyline
    | MapVectorLayerPolygon
    | MapVectorLayerRectangle
  )[];
  zoom: number;
}
const SHOW_DEBUG_INFORMATION = true;
const ENABLE_BROWSER_TESTING = true;

const MapComponentView = ({
  addDebugMessage,
  vectorLayers,
  boundsOptions,
  bounds,
  panToLocation,
  showZoomControl,
  showAttributionControl,
  mapCenterCoords,
  debugMessages,
  isLoaded,
  lat,
  lng,
  mapRasterLayers = [],
  mapMarkers = [],
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
      {mapRasterLayers.length < 1 ? (
        <div>waiting for map layers</div>
      ) : (
        <Map
          style={{
            width: '100%',
            backgroundColor: 'lightblue'
          }}
          zoom={zoom}
          ref={(component) => {
            onMapRef(component);
          }}
          center={mapCenterCoords}
          attributionControl={showAttributionControl}
          zoomControl={showZoomControl}
          panToLocation={panToLocation}
          maxZoom={18}
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
          {mapRasterLayers.length === 1 ? (
            <RasterLayer
              layer={mapRasterLayers[0]}
              addDebugMessage={addDebugMessage}
            />
          ) : (
            <LayersControl position="topright">
              <ControlsLayer
                mapRasterLayers={mapRasterLayers}
                addDebugMessage={addDebugMessage}
              />
            </LayersControl>
          )}
          {/* isLoaded && (
            <LayersControl position="topleft">
              <LayersControl.Overlay name="Markers" checked={true}>
                {isLoaded && (
                  <MapMarkers
                    mapMarkers={mapMarkers}
                    onMapEvent={onMapEvent}
                    useMarkerClustering={true}
                  />
                )}
              </LayersControl.Overlay>
            </LayersControl>
          ) */}
          {isLoaded && !!vectorLayers.length && (
            <VectorLayers
              addDebugMessage={addDebugMessage}
              debugMessages={debugMessages}
              vectorLayers={vectorLayers}
            />
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
