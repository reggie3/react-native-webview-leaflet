import * as React from 'react';
import { LayersControl } from 'react-leaflet';
import RasterLayer from './RasterLayer';
import { MapRasterLayer } from './models';

interface Props {
  mapRasterLayers: MapRasterLayer[];
}

const ControlsLayer = (props: Props) => {
  return (
    <>
      {props.mapRasterLayers.map((layer, index) => {
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
      })}
    </>
  );
};

export default ControlsLayer;
