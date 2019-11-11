import VectorLayers from '../VectorLayers';
import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import mapVectorLayers from '../mocks/appVectorLayers';

describe('VectorLayers component', () => {
  it('should render', () => {
    const renderRes = render(<VectorLayers vectorLayers={mapVectorLayers} />);
    console.log('================================');
    console.log(renderRes);
    console.log('================================');
  });
});
