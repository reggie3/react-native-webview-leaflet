import React from 'react';
import { LayersControl } from 'react-leaflet';

const withBaseLayer = (component) => {
  class HOC extends React.Component {
    render() {
        debugger;
      return (
        <LayersControl.BaseLayer
          name={layer.name}
          checked={layer.checked || false}
        >
          {component}
        </LayersControl.BaseLayer>
      );
    }
  }
  return HOC;
};

export default withBaseLayer;
