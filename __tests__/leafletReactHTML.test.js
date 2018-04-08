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

const MESSAGE_PREFIX = 'react-native-webview-leaflet';
const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const interationCount = 'infinite';
let DCSmileEmoji = {
	id: Math.floor(Math.random() * 1000),
	coords: [38.89511, -77.03637],
	icon: '😄',
};
let BaltimoreText = {
	id: Math.floor(Math.random() * 1000),
	coords: [39.29038, -76.61219],
	icon: 'Baltimore'
};


describe('leafletReactHTML', () => {
	it('should render without crashing', () => {
		const component = shallow(<LeafletReactHTML />);

		assert(component.length, 'rendered');
	});
	it('registers an eventlistener to receive messages', async () => {
		//const wrapper = shallow(<LeafletReactHTML />)
		const wrapper = await shallow(<LeafletReactHTML />).instance().componentDidMount()

	});
	it('handles messages', () => {

	});
	describe('map tests', () => {
		it('should not render a map when before receiving LOAD_MAP message', () => {
			const component = shallow(<LeafletReactHTML />);

			component.setState({ BROWSER_TESTING_ENABLED: false });
			expect(component.find('#map')).not.toHaveClassName('leaflet-container');
		});
		it('should render a map after receiving a LOAD_MAP message', () => {
			const component = shallow(<LeafletReactHTML />);

			expect(component.find('#map')).toHaveClassName('leaflet-container');
		});
		
	});
	describe('debug messages div', () => {
		it('should render a div for debug messages when SHOW_DEBUG_INFORMATION=true', () => {
			const component = shallow(<LeafletReactHTML />);

			component.setState({ SHOW_DEBUG_INFORMATION: true });
			expect(component.find('#messages').exists()).toEqual(true);
		});
		it('should not render a div for debug messages when SHOW_DEBUG_INFORMATION=false', () => {
			const component = shallow(<LeafletReactHTML />);

			component.setState({ SHOW_DEBUG_INFORMATION: false });
			expect(component.find('#messages').exists()).toEqual(false);
		});
	});
	/* describe('rendering elements on map', ()=>{
		it('should render a smiley face over Washington DC', ()=>{
			component.setState({locations: [DCSmileEmoji]});
			expect(component.find('#map')).toIncludeText('😄');
			
		})
		it('should render text over the Baltimore', ()=>{
			component.setState({locations: [BaltimoreText]});
			expect(component.find('#map')).toIncludeText('Baltimore');	
		}) 
	}) */
});
