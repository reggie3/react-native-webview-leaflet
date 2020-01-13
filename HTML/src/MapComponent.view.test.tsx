import React from "react";
import { render } from "@testing-library/react";
import MapComponentView from "./MapComponent.view";

describe("MapComponentView", () => {
  test("it renders", () => {
    const { asFragment } = render(
      <MapComponentView
        addDebugMessage={() => {}}
        debugMessages={[]}
        mapCenterPosition={[36.56, -76.17]}
        mapLayers={[]}
        mapMarkers={[]}
        onMapEvent={() => {}}
        setMapRef={() => {}}
        zoom={13}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
