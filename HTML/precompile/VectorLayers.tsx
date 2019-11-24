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
} from './models';
import { convertWebViewLeafletLatLngToNumberArray } from './utilities';

interface Props {
  vectorLayers: (
    | MapVectorLayerCircle
    | MapVectorLayerCircleMarker
    | MapVectorLayerPolyline
    | MapVectorLayerPolygon
    | MapVectorLayerRectangle
  )[];
}

export const CircleLayer = ({ layer }: { layer: MapVectorLayerCircle }) => {
  return (
    <Circle
      key={layer.id}
      color={layer.color || 'white'}
      // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
      center={convertWebViewLeafletLatLngToNumberArray(layer.center)}
      radius={layer.radius}
      attribution={layer.attribution || null}
    />
  );
};

const VectorLayers = ({ vectorLayers }: Props) => {
  return (
    <LayerGroup>
      {vectorLayers.map((mapVectorLayer, index) => {
        const layerId = mapVectorLayer.id || index;
        switch (mapVectorLayer.type) {
          case MapVectorLayerType.CIRCLE: {
            let layer = (
              <CircleLayer layer={mapVectorLayer as MapVectorLayerCircle} />
            );
          }

          case MapVectorLayerType.CIRCLE_MARKER: {
            let layer = mapVectorLayer as MapVectorLayerCircleMarker;
            return (
              <CircleMarker
                key={mapVectorLayer.id}
                color={layer.color || 'white'}
                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                center={convertSingleLatLngToNumberArray(layer.center)}
                radius={layer.radius}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.POLYGON: {
            let layer = mapVectorLayer as MapVectorLayerPolygon;
            return (
              <Polygon
                key={mapVectorLayer.id}
                color={layer.color || 'white'}
                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                positions={convertWebViewLeafletLatLngToNumberArray(
                  layer.positions
                )}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.POLYLINE: {
            let layer = mapVectorLayer as MapVectorLayerPolyline;
            return (
              <Polyline
                key={mapVectorLayer.id}
                color={layer.color || 'white'}
                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                positions={convertWebViewLeafletLatLngToNumberArray(
                  layer.positions
                )}
                attribution={layer.attribution || null}
              />
            );
          }
          case MapVectorLayerType.RECTANGLE: {
            let layer = mapVectorLayer as MapVectorLayerRectangle;
            return (
              <Rectangle
                key={mapVectorLayer.id}
                color={layer.color || 'white'}
                // @ts-ignore convertWebViewLeafletLatLngToNumberArray can handle single, array, or 2dArray
                bounds={convertWebViewLeafletLatLngToNumberArray(layer.bounds)}
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
