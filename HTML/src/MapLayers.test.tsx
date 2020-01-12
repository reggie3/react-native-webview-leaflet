import * as React from "react";
import { default as MapLayerComponent } from "./MapLayers";
import { render } from "@testing-library/react";
import mockMapLayers from "./testData/mockMapLayers";
import { Map } from "react-leaflet";

describe("MapLayers Component", () => {
  test("it renders", () => {
    console.log(MapLayerComponent);
    const { asFragment } = render(
      <Map center={[0, 0]} zoom={13} style={{ width: 100, height: 100 }}>
        <MapLayerComponent mapLayers={mockMapLayers} />
      </Map>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
