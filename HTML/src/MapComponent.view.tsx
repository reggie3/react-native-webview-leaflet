import * as React from "react";
import { useState, useEffect } from "react";
import Measure from "react-measure";
import { Map, LatLng } from "react-leaflet";
import MapLayers from "./MapLayers";
import MapMarkers from "./MapMarkers";
import { SHOW_DEBUG_INFORMATION } from "./MapComponent";
import { WebViewLeafletEvents, MapLayer, MapMarker, MapShape } from "./models";
import MapShapes from "./MapShapes";
import { LatLngExpression } from "leaflet";

interface MapComponentViewProps {
  addDebugMessage: (msg: any) => void;
  debugMessages: string[];
  mapCenterPosition: LatLng;
  mapLayers: MapLayer[];
  mapMarkers: MapMarker[];
  mapShapes: MapShape[];
  onMapEvent: (mapEvent: WebViewLeafletEvents, payload?: any) => void;
  ownPositionMarker: MapMarker;
  setMapRef: (mapRef: any) => void;
  zoom: number;
}

const MapComponentView: React.FC<MapComponentViewProps> = ({
  addDebugMessage,
  debugMessages,
  mapCenterPosition,
  mapLayers = [],
  mapMarkers = [],
  mapShapes = [],
  onMapEvent,
  ownPositionMarker,
  setMapRef,
  zoom = 13
}: MapComponentViewProps) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [combinedMapMarkers, setCombinedMapMarkers] = useState([]);

  useEffect(() => {
    const combinedMapMarkers = mapMarkers;
    if (ownPositionMarker) {
      combinedMapMarkers.push(ownPositionMarker);
    }

    setCombinedMapMarkers(combinedMapMarkers);
  }, [mapMarkers, ownPositionMarker]);

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
                center={mapCenterPosition as LatLngExpression}
                onClick={(event: any) => {
                  const { containerPoint, layerPoint, latlng } = event;
                  onMapEvent(WebViewLeafletEvents.ON_MAP_TOUCHED, {
                    containerPoint,
                    layerPoint,
                    touchLatLng: latlng
                  });
                }}
                onZoomLevelsChange={() => {
                  onMapEvent(WebViewLeafletEvents.ON_ZOOM_LEVELS_CHANGE);
                }}
                onResize={() => {
                  onMapEvent(WebViewLeafletEvents.ON_RESIZE);
                }}
                onZoomStart={() => {
                  onMapEvent(WebViewLeafletEvents.ON_ZOOM_START);
                }}
                onMoveStart={() => {
                  onMapEvent(WebViewLeafletEvents.ON_MOVE_START);
                }}
                onZoom={() => {
                  onMapEvent(WebViewLeafletEvents.ON_ZOOM);
                }}
                onMove={() => {
                  onMapEvent(WebViewLeafletEvents.ON_MOVE);
                }}
                onZoomEnd={() => {
                  onMapEvent(WebViewLeafletEvents.ON_ZOOM_END);
                }}
                onMoveEnd={() => {
                  onMapEvent(WebViewLeafletEvents.ON_MOVE_END);
                }}
                onUnload={() => {
                  onMapEvent(WebViewLeafletEvents.ON_UNLOAD);
                }}
                onViewReset={() => {
                  onMapEvent(WebViewLeafletEvents.ON_VIEW_RESET);
                }}
                maxZoom={17}
                zoom={zoom}
                attributionControl={false}
                zoomControl={false}
                style={{ width: "100%", height: dimensions.height }}
              >
                <MapLayers mapLayers={mapLayers} />
                <MapMarkers
                  mapMarkers={combinedMapMarkers}
                  onMapEvent={onMapEvent}
                />
                <MapShapes mapShapes={mapShapes} onMapEvent={onMapEvent} />
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
