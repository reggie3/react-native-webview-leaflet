import React from "react";
import { shallow } from "enzyme";
import { WebViewLeaflet } from "../WebViewLeaflet";

describe("<WebViewLeaflet>"), ()=>{
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
        expect(toJson(mountedComponent)).toMatchSnapshot();
      });
}
