import * as React from "react";
import {
  TileLayer,
  LayersControl,
  WMSTileLayer,
  WMSTileLayerProps,
  TileLayerProps,
  ImageOverlay,
  ImageOverlayProps
} from "react-leaflet";
import { MapLayer, MapLayerType } from "./models";

const { BaseLayer } = LayersControl;

interface MapLayersProps {
  mapLayers: MapLayer[];
}

class MapLayers extends React.Component<MapLayersProps> {
  private Layer = (props: MapLayer): JSX.Element => {
    switch (props.layerType) {
      case MapLayerType.IMAGE_LAYER:
        return <ImageOverlay {...(props as ImageOverlayProps)} />;
      case MapLayerType.WMS_TILE_LAYER:
        return <WMSTileLayer {...(props as WMSTileLayerProps)} />;
      default:
        return <TileLayer {...(props as TileLayerProps)} />;
    }
  };

  private Layers = (): JSX.Element[] => {
    const { mapLayers } = this.props;
    return mapLayers.map(
      (layer: MapLayer, index: number): JSX.Element => {
        if (layer.baseLayerName && mapLayers.length > 1) {
          return (
            <BaseLayer
              key={`layer-${index}`}
              checked={layer.baseLayerIsChecked ?? false}
              name={layer.baseLayerName || `Layer.${index}`}
            >
              <this.Layer {...layer} />
            </BaseLayer>
          );
        }
        return <this.Layer key={`layer-${index}`} {...layer} />;
      }
    );
  };

  render() {
    const { mapLayers } = this.props;
    if (mapLayers.length > 1) {
      return <LayersControl>{this.Layers()}</LayersControl>;
    } else {
      return <>{this.Layers()}</>;
    }
  }
}

export default MapLayers;
