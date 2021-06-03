import Leaflet, {
  LatLngBoundsLiteral,
  LatLngExpression,
  LatLngLiteral,
  LeafletMouseEvent,
} from 'leaflet'
import 'leaflet/dist/images/layers-2x.png'
import 'leaflet/dist/images/layers.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import Measure from 'react-measure'
import { WebViewLeafletProps } from '../LeafletWebView.types'
import MapLayers from './MapLayers'
import MapMarkers from './MapMarkers'
import MapShapes from './MapShapes'
import '../styles/markerAnimations.css'
import '../styles/markers.css'

const toLatLngLiteral = (latLng: Leaflet.LatLng): Leaflet.LatLngLiteral => {
  return {
    lat: latLng.lat,
    lng: latLng.lng,
  }
}

const bounds = (map?: Leaflet.Map | null): LatLngBoundsLiteral => {
  const bound = map?.getBounds()!
  const northEast = bound.getNorthEast()
  const southWest = bound.getSouthWest()
  return [
    [northEast.lat, northEast.lng],
    [southWest.lat, southWest.lng],
  ]
}

const center = (map?: Leaflet.Map | null): LatLngLiteral => {
  return toLatLngLiteral(map?.getCenter()!)
}

export const MapComponent = (props: WebViewLeafletProps) => {
  const {
    mapCenterPosition,
    mapLayers = [],
    mapMarkers = [],
    mapShapes = [],
    onMessage,
    zoom = 13,
  } = props
  const [mapRef, setMapRef] = useState<Leaflet.Map | null>(null)
  useEffect(() => {
    if (props.mapCenterPosition) {
      mapRef?.flyTo([props.mapCenterPosition.lat, props.mapCenterPosition.lng])
    }
  }, [props.mapCenterPosition])
  useEffect(() => {
    if (props.zoom) {
      mapRef?.setZoom(props.zoom)
    }
  }, [props.zoom])
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        if (contentRect.bounds) {
          const { height, width } = contentRect.bounds
          setDimensions({ height, width })
        }
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          id="map-container"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            backgroundColor: props.backgroundColor,
            left: 0,
            right: 0,
          }}
        >
          {dimensions.height > 0 && (
            <MapContainer
              whenCreated={(map: Leaflet.Map) => {
                onMessage({
                  tag: 'MapReady',
                })
              }}
              center={mapCenterPosition as LatLngExpression}
              onclick={(event: LeafletMouseEvent) => {
                const { latlng } = event
                onMessage({
                  tag: 'onMapClicked',
                  location: toLatLngLiteral(latlng),
                })
              }}
              onzoomlevelschange={() => {
                onMessage({
                  tag: 'onZoomLevelsChange',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onresize={() => {
                onMessage({
                  tag: 'onResize',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onzoomstart={() => {
                onMessage({
                  tag: 'onZoomStart',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onzoomend={() => {
                onMessage({
                  tag: 'onZoomEnd',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onzoom={() => {
                onMessage({
                  tag: 'onZoom',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onmove={() => {
                onMessage({
                  tag: 'onMove',

                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onmovestart={() => {
                onMessage({
                  tag: 'onMoveStart',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onmoveend={() => {
                onMessage({
                  tag: 'onMoveEnd',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onunload={() => {
                onMessage({
                  tag: 'onUnload',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              onviewreset={() => {
                onMessage({
                  tag: 'onViewReset',
                  bounds: bounds(mapRef),
                  mapCenter: center(mapRef),
                  zoom: mapRef?.getZoom()!,
                })
              }}
              maxZoom={props.maxZoom ?? 20}
              zoom={zoom}
              style={{ width: '100%', height: dimensions.height }}
            >
              <MapLayers mapLayers={mapLayers} />
              <MapMarkers mapMarkers={mapMarkers} onClick={onMessage} />
              <MapShapes mapShapes={mapShapes} />
            </MapContainer>
          )}
        </div>
      )}
    </Measure>
  )
}
