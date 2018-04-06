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



const component = shallow(<LeafletReactHTML />);

describe('leafletReactHTML', () => {
	it('should render without crashing', () => {
		assert(component.length, 'rendered');
	});
	describe('debug messages Div', () => {
		it('should render a div for debug messages when SHOW_DEBUG_INFORMATION=true', () => {
			component.setState({SHOW_DEBUG_INFORMATION: true});
			expect(component.find('#messages').exists()).toEqual(true);
		});
		it('should not render a div for debug messages when SHOW_DEBUG_INFORMATION=false', () => {
			component.setState({SHOW_DEBUG_INFORMATION: false});
			expect(component.find('#messages').exists()).toEqual(false);
		});
	});
	describe('rendering elements on map', ()=>{
		it('should render an emoji over Washington DC', ()=>{

		}),
		it('should render text over the Atlantic Ocean', ()=>{
			
		})
	})
});
