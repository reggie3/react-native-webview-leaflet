import * as React from 'react';
import { LayersControl } from 'react-leaflet';
import RasterLayer from './RasterLayer';
import { MapLayer } from '../../WebViewLeaflet/models';

interface Props {
  mapLayers: MapLayer[];
}

const ControlsLayer = (props: Props) => {
  return props.mapLayers.map((layer, index) => {
    console.log({ layer });
    if (layer.isBaseLayer) {
      return (
        <LayersControl.BaseLayer
          name={layer.name}
          checked={layer.isChecked || false}
          key={index}
          {...props}
        >
          <RasterLayer layer={layer} {...props} />
        </LayersControl.BaseLayer>
      );
    } else {
      return (
        <LayersControl.Overlay
          name={layer.name}
          checked={layer.isChecked || false}
          key={index}
          {...props}
        >
          <RasterLayer layer={layer} {...props} />
        </LayersControl.Overlay>
      );
    }
  });
};

export default ControlsLayer;
