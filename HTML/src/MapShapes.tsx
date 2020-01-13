import * as React from "react";
import {
  Circle,
  Polygon,
  CircleMarker,
  Polyline,
  Rectangle,
  CircleMarkerProps,
  PolylineProps,
  PolygonProps,
  RectangleProps,
  CircleProps
} from "react-leaflet";
import { MapShapeType, MapShape, WebViewLeafletEvents } from "./models";

export interface MapMapShapesProps {
  mapShapes: MapShape[];
  onMapEvent: (mapEvent: WebViewLeafletEvents, payload: any) => void;
}

class MapShapes extends React.Component<MapMapShapesProps> {
  private Shape = (props: any) => {
    switch (props.shapeType) {
      case MapShapeType.CIRCLE:
        return <Circle {...(props as CircleProps)} />;
      case MapShapeType.CIRCLE_MARKER: {
        return <CircleMarker {...(props as CircleMarkerProps)} />;
      }
      case MapShapeType.POLYGON: {
        return <Polygon {...(props as PolygonProps)} />;
      }
      case MapShapeType.POLYLINE: {
        return <Polyline {...(props as PolylineProps)} />;
      }
      case MapShapeType.RECTANGLE: {
        return <Rectangle {...(props as RectangleProps)} />;
      }
      default:
        console.warn("Unknown map shape type", props.shapeType);
        return null;
    }
  };

  render() {
    return (
      <>
        {this.props.mapShapes.map(mapShape => {
          const props = { ...mapShape, color: mapShape.color ?? "white" };
          return <this.Shape {...props} key={Math.random().toString()} />;
        })}
      </>
    );
  }
}

export default MapShapes;
