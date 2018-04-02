import LeafletReactHTML from '../web/leafletReactHTML.js';
import React from 'react';
import {render, Simulate, wait} from 'react-testing-library';

describe('leafletReactHTML', () => {
	it('runs a test', () => {
		expect(2 + 2).toEqual(4);
	});
	it('renders a messages div when directed', () => {
		const rendered = render(<LeafletReactHTML />);
	});
});
