import * as React from "react";
import App from "./App";
import { render, toJSON } from "@testing-library/react-native";

describe("Demo App", () => {
  test("it renders", () => {
    const { container, getByText } = render(<App />);
    expect(toJSON(container)).toMatchSnapshot();
  });
});
