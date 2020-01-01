import VectorLayers from './VectorLayers';
import * as React from 'react';
import { MapVectorLayerType, MapVectorLayerCircle } from './models';
import { CircleLayer } from './VectorLayers';
import { render, fireEvent } from '@testing-library/react';
import * as renderer from 'react-test-renderer';

const circle: MapVectorLayerCircle = {
  type: MapVectorLayerType.CIRCLE,
  color: '#123123',
  id: 1,
  center: { lat: 34.225727, lng: -77.94471 },
  radius: 2000
};

const Test = ({ layer }) => {
  return <p>Hello</p>;
};
describe('VectorLayers component', () => {
  it('should render', () => {
    const tree = renderer.create(<CircleLayer layer={circle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
