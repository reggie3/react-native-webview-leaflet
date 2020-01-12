import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MapComponentView from "./MapComponent.view";
import L from "leaflet";
import mockMapLayers from "./testData/mockMapLayers";
import mockMapShapes from "./testData/mockMapShapes";
import mockMapMarkers from "./testData/mockMapMarkers";
import {
  WebViewLeafletEvents,
  MapEventMessage,
  MapLayer,
  MapMarker,
  MapShape
} from "./models";
import "./styles/markers.css";
import "./styles/markerAnimations.css";

export const SHOW_DEBUG_INFORMATION = false;

const ENABLE_BROWSER_TESTING = true;

interface State {
  debugMessages: string[];
  isFromNative: boolean;
  isMobile: boolean;
  mapCenterCoords: [number, number];
  mapLayers: MapLayer[];
  mapMarkers: MapMarker[];
  mapShapes: MapShape[];
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
      mapShapes: [],
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

    this.addEventListeners();
    this.sendMessage({
      msg: WebViewLeafletEvents.MAP_COMPONENT_MOUNTED
    });
    if (ENABLE_BROWSER_TESTING) {
      this.loadMockData();
    }
  };

  componentDidUpdate = (prevProps: any, prevState: State) => {
    const { mapRef } = this.state;
    if (mapRef && !prevState.mapRef) {
      mapRef.current?.leafletElement.invalidateSize();
      this.sendMessage({
        msg: WebViewLeafletEvents.MAP_READY
      });
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
        msg: WebViewLeafletEvents.DOCUMENT_EVENT_LISTENER_ADDED
      });
    }
    if (window) {
      window.addEventListener("message", this.handleMessage);
      this.addDebugMessage("setting Window");
      this.sendMessage({
        msg: WebViewLeafletEvents.WINDOW_EVENT_LISTENER_ADDED
      });
    }
    if (!document && !window) {
      this.sendMessage({
        error: WebViewLeafletEvents.UNABLE_TO_ADD_EVENT_LISTENER
      });
      return;
    }
  };

  private handleMessage = (event: any) => {
    this.addDebugMessage(event.data);
    try {
      this.setState({ ...this.state, ...event.data });
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
    this.addDebugMessage("loading mock data");
    this.setState({
      mapLayers: mockMapLayers,
      mapMarkers: mockMapMarkers,
      mapShapes: mockMapShapes
    });
  };

  private onMapEvent = (event: WebViewLeafletEvents, payload: any) => {
    this.sendMessage({ event, payload });
  };

  private setMapRef = (mapRef: any) => {
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
      mapShapes,
      zoom
    } = this.state;
    return (
      <MapComponentView
        addDebugMessage={this.addDebugMessage}
        debugMessages={debugMessages}
        mapCenterCoords={mapCenterCoords}
        mapLayers={mapLayers}
        mapMarkers={mapMarkers}
        mapShapes={mapShapes}
        onMapEvent={this.onMapEvent}
        setMapRef={this.setMapRef}
        zoom={zoom}
      />
    );
  }
}
