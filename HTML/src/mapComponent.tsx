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

interface State {
  isMobile: boolean;
  mapCenterCoords: [number, number];
  mapLayers: MapLayer[];
  mapRef: any;
  zoom: number;
}

export default class MapComponent extends Component<{}, State> {
  mapRef: any = React.createRef();

  constructor(props: {}) {
    super(props);
    this.state = {
      isMobile: null,
      mapCenterCoords: [36.56, -76.17],
      mapLayers: [],
      mapRef: null,
      zoom: 13
    };
  }

  componentDidMount = () => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    this.detectBrowser();
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

  detectBrowser = () => {
    if (navigator.appVersion.match(/Windows/i)) {
      this.setState({ isMobile: false });
    }
  };

  loadMockData = () => {
    console.log("loading mock data");
    this.setState({ mapLayers: mockMapLayers });
  };

  setMapRef = (mapRef: any) => {
    if (!this.state.mapRef) {
      this.setState({ mapRef });
    }
  };

  render() {
    const { mapLayers } = this.state;
    return (
      <MapComponentView
        mapCenterCoords={this.state.mapCenterCoords}
        mapLayers={mockMapLayers}
        setMapRef={this.setMapRef}
      />
    );
  }
}
