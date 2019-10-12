import React from 'react';
import renderer from 'react-test-renderer';
import { default as MapComponent } from '../src/index';

describe('mapComponent.test.ts', () => {
  test('snapshot test', () => {
    const component = renderer.create(<MapComponent />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
