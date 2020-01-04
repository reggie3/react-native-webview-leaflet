import React from "react";
import { render } from "@testing-library/react";
import MapComponentView from "./MapComponent.view";

describe("MapComponentView", () => {
  test("it renders", () => {
    const { asFragment } = render(
      <MapComponentView
        mapCenterCoords={[36.56, -76.17]}
        setMapRef={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
