import { LatLngExpression } from 'leaflet'
import * as React from 'react'
import { LayerGroup, Marker, Popup } from 'react-leaflet'
// import MarkerClusterGroup from 'react-leaflet-markercluster'
// import 'react-leaflet-markercluster/dist/styles.min.css'
import { MapMarker as MapMarkerType, MapMarkerClickedEvent } from '../model'
import { createDivIcon } from '../utilities'

const MapMarker = ({
  mapMarker,
  onClick,
}: {
  mapMarker: MapMarkerType
  onClick: (mapEvent: MapMarkerClickedEvent) => void
}) => {
  return (
    <Marker
      key={mapMarker.id}
      position={mapMarker.position as LatLngExpression}
      icon={createDivIcon(mapMarker)}
      eventHandlers={{
        click: () => {
          onClick({
            tag: 'onMapMarkerClicked',
            mapMarkerId: mapMarker.id,
          })
        },
      }}
    >
      {mapMarker.title && <Popup>{mapMarker.title}</Popup>}
    </Marker>
  )
}

interface MapMarkersProps {
  mapMarkers: Array<MapMarkerType>
  onClick: (clickEvent: MapMarkerClickedEvent) => void
  // maxClusterRadius?: number
}

export default function MapMarkers(props: MapMarkersProps) {
  // const useMarkerClustering = props.maxClusterRadius == null
  // if (useMarkerClustering) {
  //   return (
  //     <LayerGroup>
  //       <MarkerClusterGroup maxClusterRadius={props.maxClusterRadius}>
  //         {props.mapMarkers.map((mapMarker: MapMarker) => {
  //           if (mapMarker.id === OwnPositionMarkerId) {
  //             return null
  //           }
  //           return (
  //             <MapMarker
  //               key={mapMarker.id}
  //               mapMarker={mapMarker}
  //               onClick={props.onClick}
  //             />
  //           )
  //         })}
  //       </MarkerClusterGroup>
  //       {props.mapMarkers.map((mapMarker: MapMarker) => {
  //         if (mapMarker.id === OwnPositionMarkerId) {
  //           return (
  //             <MapMarker
  //               key={mapMarker.id}
  //               mapMarker={mapMarker}
  //               onClick={props.onClick}
  //             />
  //           )
  //         } else {
  //           return null
  //         }
  //       })}
  //     </LayerGroup>
  //   )
  // } else {
  return (
    <LayerGroup>
      {props.mapMarkers.map((mapMarker: MapMarkerType) => {
        return <MapMarker mapMarker={mapMarker} onClick={props.onClick} />
      })}
    </LayerGroup>
  )
  // }
}
