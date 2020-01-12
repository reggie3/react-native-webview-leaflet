import * as React from "react";
import { useState } from "react";
import Measure from "react-measure";
import { Map } from "react-leaflet";
import MapLayers from "./MapLayers";
import MapMarkers from "./MapMarkers";
import { SHOW_DEBUG_INFORMATION } from "./MapComponent";
import { MapComponentEvents, MapLayer, MapMarker } from "./models";

interface MapComponentViewProps {
  addDebugMessage: (msg: any) => void;
  debugMessages: string[];
  mapCenterCoords: [number, number];
  mapLayers: MapLayer[];
  mapMarkers: MapMarker[];
  onMapEvent: (mapEvent: MapComponentEvents) => void;
  setMapRef: (mapRef: any) => void;
  zoom: number;
}

const MapComponentView: React.FC<MapComponentViewProps> = ({
  addDebugMessage,
  debugMessages,
  mapCenterCoords,
  mapLayers = [],
  mapMarkers = [],
  onMapEvent,
  setMapRef,
  zoom = 13
}: MapComponentViewProps) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  return (
    <>
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
                maxZoom={17}
                zoom={zoom}
                style={{ width: "100%", height: dimensions.height }}
              >
                <MapLayers mapLayers={mapLayers} />
                <MapMarkers mapMarkers={mapMarkers} onMapEvent={onMapEvent} />
              </Map>
            )}
          </div>
        )}
      </Measure>
      {SHOW_DEBUG_INFORMATION ? (
        <div
          style={{
            backgroundColor: "orange",
            maxHeight: "200px",
            overflow: "auto",
            padding: 5,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 15000
          }}
          id="messages"
        >
          <ul>
            {debugMessages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default MapComponentView;
