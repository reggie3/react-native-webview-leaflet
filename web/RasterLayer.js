import React from 'react';
import {
  TileLayer,
  WMSTileLayer,
  ImageOverlay,
  VideoOverlay,
} from 'react-leaflet';

const RasterLayer = (props) => {
  debugger;
  console.log({ props });
  if (props.layer.type === 'TileLayer') {
    return (
      <TileLayer
        attribution={props.layer.attribution}
        url={props.layer.url}
        zIndex={props.layer.zIndex || 0}
      />
    );
  } else if (props.layer.type === 'WMSTileLayer') {
    return <WMSTileLayer url={props.layer.url} />;
  } else if (props.layer.type === 'ImageOverlay') {
    return (
      <ImageOverlay
        url={props.layer.url}
        bounds={props.layer.bounds}
        opacity={props.layer.opacity || 1}
        zIndex={props.layer.zIndex || 0}
      />
    );
  } else if (props.layer.type === 'VideoOverlay') {
    return (
      <VideoOverlay
        url={props.layer.url}
        bounds={props.layer.bounds}
        opacity={props.layer.opacity || 1}
        play={props.layer.play || true}
        zIndex={props.layer.zIndex || 0}
      />
    );
  }
};

export default RasterLayer;
