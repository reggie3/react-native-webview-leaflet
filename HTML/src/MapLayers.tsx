import * as React from "react";
import {
  TileLayer,
  LayersControl,
  TileLayerProps,
  useLeaflet,
  LayerGroup
} from "react-leaflet";
const { BaseLayer, Overlay } = LayersControl;

export type MapLayer = {
  attribution?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  pane?: string;
  url?: string;
};

interface MapLayersProps {
  mapLayers: MapLayer[];
}

class MapLayers extends React.Component<MapLayersProps> {
  private Layer = ({
    layer,
    index
  }: {
    layer: MapLayer;
    index?: number;
  }): JSX.Element => {
    let props: MapLayer & { key?: string } = {};

    props.attribution = layer.attribution;
    props.url = layer.url;
    // props.pane = layer.pane;
    // props.key = `layer-${index}`;

    //removed undefined keys
    Object.keys(props).forEach((key: string) => {
      // @ts-ignore
      const propValue: any = props[key] as any;
      if (propValue === undefined) {
        // @ts-ignore
        delete props[key];
      }
    });

    return <TileLayer {...(props as TileLayerProps)} />;
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
        return (
          <this.Layer key={`layer-${index}`} layer={layer} index={index} />
        );
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
