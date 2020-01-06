import * as React from "react";
import {
  TileLayer,
  LayersControl,
  WMSTileLayer,
  WMSTileLayerProps,
  TileLayerProps,
  ImageOverlay,
  ImageOverlayProps,
  LatLngBounds
} from "react-leaflet";
import VectorLayer, { MapVectorLayerProps } from "./VectorLayer";
const { BaseLayer } = LayersControl;

export enum MapLayerType {
  IMAGE_LAYER = "ImageOverlay",
  TILE_LAYER = "TileLayer",
  VECTOR_LAYER = "VectorLayer",
  VIDEO_LAYER = "VideoOverlay",
  WMS_TILE_LAYER = "WMSTileLayer",
  CIRCLE = "Circle",
  CIRCLE_MARKER = "CircleMarker",
  POLYLINE = "Polyline",
  POLYGON = "Polygon",
  RECTANGLE = "Rectangle"
}

export interface MapLayer {
  attribution?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  bounds?: LatLngBounds;
  id?: string;
  layerType?: MapLayerType;
  opacity?: number;
  pane?: string;
  subLayer?: string;
  url?: string;
  zIndex?: number;
}

interface MapLayersProps {
  mapLayers: MapLayer[];
}

class MapLayers extends React.Component<MapLayersProps> {
  private Layer = (props: MapLayer): JSX.Element => {
    switch (props.layerType) {
      case MapLayerType.CIRCLE:
      case MapLayerType.CIRCLE_MARKER:
      case MapLayerType.POLYGON:
      case MapLayerType.POLYLINE:
      case MapLayerType.RECTANGLE:
        return <VectorLayer {...(props as MapVectorLayerProps)} />;
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
