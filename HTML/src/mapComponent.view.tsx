import * as React from "react";
import { useEffect, useState } from "react";
import Measure from "react-measure";
import { Map, TileLayer, Marker, Popup, LatLng } from "react-leaflet";
import L from "leaflet";

interface MapComponentViewProps {
  mapCenterCoords: [number, number];
  setMapRef: (mapRef: any) => void;
  zoom?: number;
}

const MapComponentView: React.FC<MapComponentViewProps> = ({
  mapCenterCoords,
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
              center={[36.56, -76.17]}
              zoom={zoom}
              style={{ width: "100%", height: dimensions.height }}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
          )}
        </div>
      )}
    </Measure>
  );
};

export default MapComponentView;
