import * as React from "react";
import { useEffect, useState } from "react";
import Measure from "react-measure";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LatLng,
  LayersControl
} from "react-leaflet";
import MapLayers, { MapLayer } from "./MapLayers";
const { BaseLayer, Overlay } = LayersControl;

interface MapComponentViewProps {
  mapCenterCoords: [number, number];
  mapLayers?: MapLayer[];
  setMapRef: (mapRef: any) => void;
  zoom?: number;
}

const MapComponentView: React.FC<MapComponentViewProps> = ({
  mapCenterCoords,
  mapLayers = [],
  setMapRef,
  zoom = 13
}: MapComponentViewProps) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  return (
    <Measure
      bounds
      onResize={contentRect => {
        const { height, width } = contentRect.bounds;
        setDimensions({ height, width });
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          id="map-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            backgroundColor: "greenyellow",
            left: 0,
            right: 0
          }}
        >
          {dimensions.height > 0 && (
            <Map
              ref={ref => {
                setMapRef(ref);
              }}
              center={mapCenterCoords}
              zoom={zoom}
              style={{ width: "100%", height: dimensions.height }}
            >
              <MapLayers mapLayers={mapLayers} />
            </Map>
          )}
        </div>
      )}
    </Measure>
  );
};

export default MapComponentView;
