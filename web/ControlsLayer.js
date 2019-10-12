import React from 'react';
import { LayersControl } from 'react-leaflet';


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
          {...props}
        >
          <RasterLayer layer={layer} {...props}/>
        </LayersControl.BaseLayer>
      );
    } else {
      return (
        <LayersControl.Overlay
          name={layer.name}
          checked={layer.checked || false}
          key={index}
          {...props}
        >
          <RasterLayer layer={layer} {...props}/>
        </LayersControl.Overlay>
      );
    }
  });
};

export default ControlsLayer;
