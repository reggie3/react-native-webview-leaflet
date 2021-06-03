import * as React from 'react'
import {
  ImageOverlay,
  ImageOverlayProps,
  LayersControl,
  TileLayer,
  TileLayerProps,
  WMSTileLayer,
  WMSTileLayerProps,
} from 'react-leaflet'
import { MapLayer, MapLayerType } from '../model'

const { BaseLayer } = LayersControl

interface MapLayersProps {
  mapLayers: MapLayer[]
}

const Layer = (props: MapLayer): JSX.Element => {
  switch (props.layerType) {
    case MapLayerType.IMAGE_LAYER:
      return <ImageOverlay {...(props as ImageOverlayProps)} />
    case MapLayerType.WMS_TILE_LAYER:
      return <WMSTileLayer {...(props as WMSTileLayerProps)} />
    default:
      return <TileLayer {...(props as TileLayerProps)} />
  }
}

const MapLayers = (props: MapLayersProps) => {
  const { mapLayers } = props
  const Wrap = mapLayers.length > 1 ? LayersControl : React.Fragment
  return (
    <Wrap>
      {mapLayers.map((layer: MapLayer, index: number): JSX.Element => {
        if (layer.baseLayerName && mapLayers.length > 1) {
          return (
            <BaseLayer
              key={`layer-${index}`}
              checked={layer.baseLayerIsChecked || false}
              name={layer.baseLayerName || `Layer.${index}`}
            >
              <Layer {...layer} />
            </BaseLayer>
          )
        } else {
          return <Layer key={`layer-${index}`} {...layer} />
        }
      })}
    </Wrap>
  )
}

export default MapLayers
