import * as React from 'react';
import {
  Circle,
  LayerGroup,
  Polygon,
  CircleMarker,
  Polyline,
  Rectangle
} from 'react-leaflet';
import {
  MapVectorLayerType,
  MapVectorLayerCircle,
  MapVectorLayerCircleMarker,
  MapVectorLayerPolyline,
  MapVectorLayerPolygon,
  MapVectorLayerRectangle
} from '../../WebViewLeaflet/models';
import {} from 'leaflet';

interface Props {
  vectorLayers: (
    | MapVectorLayerCircle
    | MapVectorLayerCircleMarker
    | MapVectorLayerPolyline
    | MapVectorLayerPolygon
    | MapVectorLayerRectangle)[];
}

const VectorLayers = ({ vectorLayers }: Props) => {
  return (
    <LayerGroup>
      {vectorLayers.map((mapVectorLayer) => {
        switch (mapVectorLayer.type) {
          case MapVectorLayerType.CIRCLE: {
            let layer = mapVectorLayer as MapVectorLayerCircle;
            return (
              <Circle
                key={layer.id}
                color={layer.color || 'white'}
                center={layer.center}
                radius={layer.radius}
                attribution={layer.attribution || null}
              />
            );
          }

          case MapVectorLayerType.CIRCLE_MARKER: {
            let layer = mapVectorLayer as MapVectorLayerCircleMarker;
            return (
              <CircleMarker
                key={layer.id}
                color={layer.color || 'white'}
                center={layer.center}
                radius={layer.radius}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.POLYGON: {
            let layer = mapVectorLayer as MapVectorLayerPolygon;
            return (
              <Polygon
                key={layer.id}
                color={layer.color || 'white'}
                positions={layer.positions}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.POLYLINE: {
            let layer = mapVectorLayer as MapVectorLayerPolyline;
            return (
              <Polyline
                key={layer.id}
                color={layer.color || 'white'}
                positions={layer.positions}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.RECTANGLE: {
            let layer = mapVectorLayer as MapVectorLayerRectangle;
            return (
              <Rectangle
                key={layer.id}
                color={layer.color || 'white'}
                bounds={layer.bounds}
                attribution={layer.attribution || null}
              />
            );
          }
          default:
            console.warn('Unknown vector layer type', mapVectorLayer.type);
        }
      })}
    </LayerGroup>
  );
};

export default VectorLayers;
