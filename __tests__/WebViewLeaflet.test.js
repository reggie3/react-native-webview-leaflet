import "react-native";
import React from "react";
import { shallow } from "enzyme";
import { WebViewLeaflet } from "../WebViewLeaflet";
import toJson from "enzyme-to-json";
const isValidCoordinates = require("is-valid-coordinates");


describe("<WebViewLeaflet>", () => {
  let mountedComponent;
  let props;
  const sendUpdatedMapCenterCoordsToHTML= jest.fn();

  const mountComponent = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<WebViewLeaflet {...props} />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {};
  });

  it("renders correctly", () => {
    expect(mountedComponent).toMatchSnapshot();
  });

  it("accepts valid center coordinates", ()=>{
    props = {
      mapCenterCoords: [38.889931, -77.009003]
    };
    expect(sendUpdatedMapCenterCoordsToHTML).toHaveBeenCalledTimes(1);
  })
});
