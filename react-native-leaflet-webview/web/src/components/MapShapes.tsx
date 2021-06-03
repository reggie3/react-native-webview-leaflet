import * as React from 'react'
import {
  Circle,
  CircleMarker,
  CircleMarkerProps,
  CircleProps,
  Polygon,
  PolygonProps,
  Polyline,
  PolylineProps,
  Rectangle,
  RectangleProps,
} from 'react-leaflet'
import { LeafletWebViewEvent, MapShape, MapShapeType } from '../model'

export const Shape = (props: MapShape) => {
  switch (props.shapeType) {
    case MapShapeType.CIRCLE:
      return <Circle {...(props as CircleProps)} />
    case MapShapeType.CIRCLE_MARKER: {
      return <CircleMarker {...(props as CircleMarkerProps)} />
    }
    case MapShapeType.POLYGON: {
      return <Polygon {...(props as PolygonProps)} />
    }
    case MapShapeType.POLYLINE: {
      return <Polyline {...(props as PolylineProps)} />
    }
    case MapShapeType.RECTANGLE: {
      return <Rectangle {...(props as RectangleProps)} />
    }
    default:
      console.error('Unknown map shape type', (props as MapShape).shapeType)
      return null
  }
}

export interface MapMapShapesProps {
  mapShapes: MapShape[]
}

function MapShapes(props: MapMapShapesProps) {
  return (
    <>
      {props.mapShapes.map((mapShape) => {
        return (
          <Shape
            {...mapShape}
            color={mapShape.color || 'white'}
            key={mapShape.id || Math.random().toString()}
          />
        )
      })}
    </>
  )
}

export default MapShapes
