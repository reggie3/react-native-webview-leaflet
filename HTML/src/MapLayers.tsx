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
import { MapLayerTypes } from "./models";
const { BaseLayer } = LayersControl;

export type MapLayer = {
  attribution?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  bounds?: number[][];
  layerType?: MapLayerTypes;
  opacity?: number;
  pane?: string;
  subLayer?: string;
  url?: string;
  zIndex?: number;
};

interface MapLayersProps {
  mapLayers: MapLayer[];
}

class MapLayers extends React.Component<MapLayersProps> {
  private Layer = ({ layer }: { layer: MapLayer }): JSX.Element => {
    let props: MapLayer & { key?: string } = {};

    props.attribution = layer.attribution;
    props.bounds = layer.bounds;
    props.opacity = layer.opacity;
    props.subLayer = layer.subLayer;
    props.url = layer.url;
    props.zIndex = layer.zIndex;

    //removed undefined keys
    Object.keys(props).forEach((key: string) => {
      // @ts-ignore
      const propValue: any = props[key] as any;
      if (propValue === undefined) {
        // @ts-ignore
        delete props[key];
      }
    });

    switch (layer.layerType) {
      case MapLayerTypes.WMS_TILE_LAYER:
        return <WMSTileLayer {...(props as WMSTileLayerProps)} />;
      case MapLayerTypes.IMAGE_LAYER:
        return <ImageOverlay {...(props as ImageOverlayProps)} />;
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
              <this.Layer layer={layer} />
            </BaseLayer>
          );
        }
        return <this.Layer key={`layer-${index}`} layer={layer} />;
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
