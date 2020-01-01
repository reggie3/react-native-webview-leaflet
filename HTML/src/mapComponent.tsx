import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import MapComponentView from "./MapComponent.view";

interface State {
  mapCenterCoords: [number, number];
  mapRef: any;
  zoom: number;
}

export default class MapComponent extends Component<{}, State> {
  mapRef: any = React.createRef();

  constructor(props: {}) {
    super(props);
    this.state = {
      mapCenterCoords: null,
      mapRef: null,
      zoom: 13
    };
  }
  componentDidUpdate = (prevProps: any, prevState: State) => {
    if (this.state.mapRef && !prevState.mapRef) {
      this.state.mapRef.current?.leafletElement.invalidateSize();
      console.log("called invalidateSize");
    }
  };

  setMapRef = (mapRef: any) => {
    if (!this.state.mapRef) {
      this.setState({ mapRef });
    }
  };

  render() {
    return (
      <MapComponentView
        mapCenterCoords={this.state.mapCenterCoords}
        setMapRef={this.setMapRef}
      />
    );
  }
}
