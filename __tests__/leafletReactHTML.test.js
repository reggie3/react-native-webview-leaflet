// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
// test file
import { shallow, mount, render } from 'enzyme';
import assert from 'assert';
import LeafletReactHTML from '../web/leafletReactHTML.js';
import React from 'react';
import ReactDom from 'react-dom';

const component = mount(
    <LeafletReactHTML />
)


describe('leafletReactHTML', () => {
	it('should render without crashing', () => {
		assert(component.length, 'rendered');
	  });
});
