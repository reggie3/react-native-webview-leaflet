import React from "react";
import { render } from "@testing-library/react";
import MapComponent from "./MapComponent";

test("renders learn react link", () => {
  const { getByTestId } = render(<MapComponent />);
  const element = getByTestId("MapComponentView");
});
