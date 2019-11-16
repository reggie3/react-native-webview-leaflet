import * as React from 'react';
import { MapMarker, MapEvent } from './models';
import { LayerGroup, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { createDivIcon } from './utilities';

interface Props {
  mapMarkers: MapMarker[];
  onMapEvent: (mapEvent: MapEvent, mapMarkerId) => void;
  useMarkerClustering?: boolean;
}

const MapMarkers = ({
  mapMarkers,
  onMapEvent,
  useMarkerClustering = true
}: Props) => {
  if (useMarkerClustering) {
    return (
      <LayerGroup>
        <MarkerClusterGroup>
          {mapMarkers.map((mapMarker: MapMarker) => {
            if (mapMarker.id !== 'ownPositionMarker') {
              return (
                <Marker
                  key={mapMarker.id}
                  position={mapMarker.coords}
                  icon={createDivIcon(mapMarker)}
                  onClick={() => {
                    onMapEvent(MapEvent.ON_MAP_MARKER_CLICKED, {
                      id: mapMarker.id
                    });
                  }}
                >
                  {mapMarker.title && <Popup>{mapMarker.title}</Popup>}
                </Marker>
              );
            } else {
              return null;
            }
          })}
        </MarkerClusterGroup>
        {mapMarkers.map((mapMarker: MapMarker) => {
          if (mapMarker.id === 'ownPositionMarker') {
            return (
              <Marker
                key={mapMarker.id}
                position={mapMarker.coords}
                icon={createDivIcon(mapMarker)}
                onClick={() => {
                  onMapEvent(MapEvent.ON_MAP_MARKER_CLICKED, {
                    id: mapMarker.id
                  });
                }}
              >
                {mapMarker.title && <Popup>{mapMarker.title}</Popup>}
              </Marker>
            );
          } else {
            return null;
          }
        })}
      </LayerGroup>
    );
  } else {
    return (
      <LayerGroup>
        {mapMarkers.map((marker: MapMarker) => {
          return (
            <Marker
              key={marker.id}
              position={marker.coords}
              // @ts-ignore
              icon={marker.divIcon}
              onClick={() => {
                onMapEvent(MapEvent.ON_MAP_MARKER_CLICKED, {
                  id: marker.id
                });
              }}
            >
              {marker.title && <Popup>{marker.title}</Popup>}
            </Marker>
          );
        })}
      </LayerGroup>
    );
  }
};

export default MapMarkers;
