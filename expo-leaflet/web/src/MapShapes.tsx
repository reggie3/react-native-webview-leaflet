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
import { MapShape } from './model'

export const Shape = (props: MapShape) => {
  switch (props.shapeType) {
    case 'circle':
      return <Circle {...(props as CircleProps)} />
    case 'circleMarker': {
      return <CircleMarker {...(props as CircleMarkerProps)} />
    }
    case 'polygon': {
      return <Polygon {...(props as PolygonProps)} />
    }
    case 'polyline': {
      return <Polyline {...(props as PolylineProps)} />
    }
    case 'rectangle': {
      return <Rectangle {...(props as RectangleProps)} />
    }
    default:
      console.error('Unknown map shape type', (props as MapShape).shapeType)
      return null
  }
}

export type MapMapShapesProps = {
  mapShapes: Array<MapShape>
}

export function MapShapes(props: MapMapShapesProps) {
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
