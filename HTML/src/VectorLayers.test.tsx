import VectorLayers from './VectorLayers';
import * as React from 'react';
import { MapVectorLayerType, MapVectorLayerCircle } from './models';
import { CircleLayer } from './VectorLayers';
import { render, fireEvent } from 'react-native-testing-library';
import { Text } from 'react-native';

const circle: MapVectorLayerCircle = {
  type: MapVectorLayerType.CIRCLE,
  color: '#123123',
  id: 1,
  center: { lat: 34.225727, lng: -77.94471 },
  radius: 2000
};

const Test = ({ layer }) => {
  return <Text>Hello</Text>;
};
describe('VectorLayers component', () => {
  it('should render', () => {
    /*  const res = render(<Test layer={circle} />);
    console.log(res);
    console.log('---------------------------'); */
  });
});
