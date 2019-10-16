import * as React from 'react';
import { LayerGroup, Polygon } from 'react-leaflet';
import { MapGeometryLayer } from '../../WebViewLeaflet/models';

interface Props {
  geometryLayers: MapGeometryLayer[];
}

const GeometryLayers = ({ geometryLayers }: Props) => {
  if (this.state.loaded) {
    return (
      <LayerGroup>
        {this.state.geometryLayers.map((layer: MapGeometryLayer) => {
          return (
            <Polygon
              key={layer.id}
              color={layer.color || 'white'}
              positions={layer.coords}
            />
          );
        })}
      </LayerGroup>
    );
  } else {
    return null;
  }
};

export default GeometryLayers;
