import React from "react";
import { render } from "@testing-library/react";
import MapComponent from "./MapComponent";

test("renders learn react link", () => {
  const { getByText } = render(<MapComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
