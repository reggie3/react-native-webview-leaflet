import React from 'react';
import { LayersControl } from 'react-leaflet';
import L from 'leaflet';

import RasterLayer from './RasterLayer';

const ControlsLayer = (props) => {
  return props.mapLayers.map((layer, index) => {
    console.log({layer});
    if (layer.baseLayer) {
      return (
        <LayersControl.BaseLayer
          name={layer.name}
          checked={layer.checked || false}
          key={index}
        >
          <RasterLayer layer={layer} />
        </LayersControl.BaseLayer>
      );
    } else {
      return (
        <LayersControl.Overlay
          name={layer.name}
          checked={layer.checked || false}
          key={index}
        >
          <RasterLayer layer={layer} />
        </LayersControl.Overlay>
      );
    }
  });
};

export default ControlsLayer;
