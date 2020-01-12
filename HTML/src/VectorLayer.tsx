import * as React from "react";
import {
  Circle,
  Polygon,
  CircleMarker,
  Polyline,
  Rectangle,
  LatLng,
  LatLngBounds,
  CircleMarkerProps,
  PolylineProps,
  PolygonProps,
  RectangleProps,
  CircleProps
} from "react-leaflet";
import { MapLayer, MapLayerType } from "./models";

export interface MapVectorLayerProps extends MapLayer {
  bounds?: LatLngBounds;
  center?: LatLng;
  color?: string;
  positions?: LatLng[] | LatLng[][];
  radius?: number;
}

class VectorLayer extends React.Component<MapVectorLayerProps> {
  render() {
    const props = { ...this.props, color: this.props.color ?? "white" };

    switch (props.layerType) {
      case MapLayerType.CIRCLE:
        return <Circle {...(props as CircleProps)} />;
      case MapLayerType.CIRCLE_MARKER: {
        return <CircleMarker {...(props as CircleMarkerProps)} />;
      }
      case MapLayerType.POLYGON: {
        return <Polygon {...(props as PolygonProps)} />;
      }
      case MapLayerType.POLYLINE: {
        return <Polyline {...(props as PolylineProps)} />;
      }
      case MapLayerType.RECTANGLE: {
        return <Rectangle {...(props as RectangleProps)} />;
      }
      default:
        console.warn("Unknown vector layer type", props.layerType);
        return null;
    }
  }
}

export default VectorLayer;
