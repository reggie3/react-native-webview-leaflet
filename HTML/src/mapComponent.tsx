import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MapComponentView from "./MapComponent.view";
import L from "leaflet";
import { MapLayer } from "./MapLayers";
import mockMapLayers from "./testData/mockMapLayers";
import mockVectorLayers from "./testData/mockVectorLayers";
import mockMapMarkers from "./testData/mockMapMarkers";
import { MapMarker } from "./MapMarkers";
import "./styles/markers.css";
import "./styles/markerAnimations.css";

export const SHOW_DEBUG_INFORMATION = true;

export enum MapComponentMessages {
  MAP_COMPONENT_MOUNTED = "MAP_COMPONENT_MOUNTED",
  DOCUMENT_EVENT_LISTENER_ADDED = "DOCUMENT_EVENT_LISTENER_ADDED",
  WINDOW_EVENT_LISTENER_ADDED = "WINDOW_EVENT_LISTENER_ADDED",
  UNABLE_TO_ADD_EVENT_LISTENER = "UNABLE_TO_ADD_EVENT_LISTENER",
  DOCUMENT_EVENT_LISTENER_REMOVED = "DOCUMENT_EVENT_LISTENER_REMOVED",
  WINDOW_EVENT_LISTENER_REMOVED = "WINDOW_EVENT_LISTENER_REMOVED"
}

export enum MapEvent {
  ON_MOVE_END = "onMoveEnd",
  ON_MOVE_START = "onMoveStart",
  ON_MOVE = "onMove",
  ON_RESIZE = "onResize",
  ON_UNLOAD = "onUnload",
  ON_VIEW_RESET = "onViewReset",
  ON_ZOOM_END = "onZoomEnd",
  ON_ZOOM_LEVELS_CHANGE = "onZoomLevelsChange",
  ON_ZOOM_START = "onZoomStart",
  ON_ZOOM = "onZoom",
  ON_MAP_CLICKED = "onMapClicked",
  ON_MAP_MARKER_CLICKED = "onMapMarkerClicked"
}

export interface MapEventMessage {
  event?: any;
  msg?: string;
  error?: string;
  payload?: any;
}

interface State {
  debugMessages: string[];
  isFromNative: boolean;
  isMobile: boolean;
  mapCenterCoords: [number, number];
  mapLayers: MapLayer[];
  mapMarkers: MapMarker[];
  mapRef: any;
  zoom: number;
}

export default class MapComponent extends Component<{}, State> {
  mapRef: any = React.createRef();

  constructor(props: {}) {
    super(props);
    this.state = {
      debugMessages: ["test"],
      isFromNative: false,
      isMobile: null,
      mapCenterCoords: [36.56, -76.17],
      mapLayers: [],
      mapMarkers: [],
      mapRef: null,
      zoom: 6
    };
  }

  componentDidMount = () => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    if (!this.state.isFromNative) {
      this.loadMockData();
    }
    this.addEventListeners();
  };

  componentDidUpdate = (prevProps: any, prevState: State) => {
    const { isMobile, mapRef } = this.state;
    if (mapRef && !prevState.mapRef) {
      mapRef.current?.leafletElement.invalidateSize();
    }
    if (prevState.isMobile === null && isMobile === false) {
      this.loadMockData();
    }
  };

  private addDebugMessage = (msg: any) => {
    if (typeof msg === "object") {
      this.addDebugMessage("STRINGIFIED");
      this.setState({
        debugMessages: [
          ...this.state.debugMessages,
          JSON.stringify(msg, null, 4)
        ]
      });
    } else {
      this.setState({ debugMessages: [...this.state.debugMessages, msg] });
    }
  };

  private addEventListeners = () => {
    if (document) {
      document.addEventListener("message", this.handleMessage);
      this.addDebugMessage("set document listeners");
      this.sendMessage({
        msg: "DOCUMENT_EVENT_LISTENER_ADDED"
      });
    }
    if (window) {
      window.addEventListener("message", this.handleMessage);
      this.addDebugMessage("setting Window");
      this.sendMessage({
        msg: "WINDOW_EVENT_LISTENER_ADDED"
      });
    }
    if (!document && !window) {
      this.sendMessage({
        error: "UNABLE_TO_ADD_EVENT_LISTENER"
      });
      return;
    }
  };

  private handleMessage = (event: any) => {
    this.addDebugMessage(event.data);
    try {
      // this.setState({ ...this.state, ...event.data });
    } catch (error) {
      this.addDebugMessage({ error: JSON.stringify(error) });
    }
  };

  protected sendMessage = (message: MapEventMessage) => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      console.log("sendMessage  ", JSON.stringify(message));
    }
  };

  private loadMockData = () => {
    console.log("loading mock data");
    this.setState({
      mapLayers: [...mockMapLayers, ...mockVectorLayers],
      mapMarkers: mockMapMarkers
    });
  };

  private onMapEvent = (mapEvent: MapEvent) => {
    console.log({ mapEvent });
  };
  setMapRef = (mapRef: any) => {
    if (!this.state.mapRef) {
      this.setState({ mapRef });
    }
  };

  render() {
    const {
      debugMessages,
      mapCenterCoords,
      mapLayers,
      mapMarkers,
      zoom
    } = this.state;
    return (
      <MapComponentView
        addDebugMessage={this.addDebugMessage}
        debugMessages={debugMessages}
        mapCenterCoords={mapCenterCoords}
        mapMarkers={mapMarkers}
        mapLayers={mapLayers}
        onMapEvent={this.onMapEvent}
        setMapRef={this.setMapRef}
        zoom={zoom}
      />
    );
  }
}
