import * as React from 'react';
import { MapLayerTypes, MapRasterLayer } from './models';
import {
  TileLayer,
  WMSTileLayer,
  ImageOverlay,
  VideoOverlay
} from 'react-leaflet';
import {
  convertWebViewLeafletLatLngBoundsToLeaftletBounds
} from './utilities';

interface Props {
  addDebugMessage: (msg: any) => void;
  layer: MapRasterLayer;
}

const RasterLayer = (props: Props) => {
  const { layer } = props;

  if (layer) {
    if (layer.type === MapLayerTypes.TILE_LAYER) {
      return (
        <TileLayer
          attribution={layer.attribution}
          url={layer.url}
          zIndex={layer.zIndex || 0}
          {...props}
        />
      );
    } else if (layer.type === MapLayerTypes.WMS_TILE_LAYER) {
      return <WMSTileLayer url={layer.url} {...props} />;
    } else if (layer.type === MapLayerTypes.IMAGE_LAYER) {
      return (
        <ImageOverlay
          url={layer.url}
          opacity={layer.opacity || 1}
          zIndex={layer.zIndex || 0}
          {...props}
        />
      );
    } else if (layer.type === MapLayerTypes.VIDEO_LAYER) {
      return (
        <VideoOverlay
          url={layer.url}
          bounds={convertWebViewLeafletLatLngBoundsToLeaftletBounds(
            layer.bounds
          )}
          opacity={layer.opacity || 1}
          play={layer.play || true}
          zIndex={layer.zIndex || 0}
          {...props}
        />
      );
    }
  }
  return null;
};

export default RasterLayer;
