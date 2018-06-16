import Leaflet from 'leaflet';
import React, { Component, StrictMode } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import locations from './testLocations';

import './markerAnimations.css';

const isValidCoordinates = require('is-valid-coordinates');
const util = require('util');

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

const SHOW_DEBUG_INFORMATION = true;

class App extends Component {
  constructor(props) {
    super(props);

    this.mapMarkerDictionary = {};
    this.state = {
      ownPosition: [36.56, -76.17],
      zoom: 10,
      debugMessages: [],
      markers: []
    };
  }

  componentDidMount = () => {
    this.setState({ debugMessages: 'hello' });
    this.printElement('leafletReactHTML.js componentDidMount');

    // add the event listeners
    if (document) {
      document.addEventListener('message', this.handleMessage), false;
      this.printElement('using document');
    } else if (window) {
      window.addEventListener('message', this.handleMessage), false;
      this.printElement('using window');
    } else {
      console.log('unable to add event listener');
      return;
    }

    this.eventListenersAdded = true;

    let that = this;
    let markers = locations.map((location) => {
      if (isValidCoordinates(location.coords[1], location.coords[0])) {
        return {
          id: location.id,
          coords: location.coords,
          divIcon: that.createDivIcon(location)
        };
      }
    });

    /* let ownPostionMarker =  {
      id: 0,
      coords: this.state.ownPosition,
      divIcon: that.createDivIcon({
        icon: '❤️',
        animation: {
          name: 'beat',
          duration: 0.25,
          delay: 0,
          interationCount: 'infinite',
          direction: 'alternate'
        },
        size: [24, 24]
      })
    }; */

    this.setState({ markers });
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('message', this.handleMessage);
    } else if (window) {
      window.removeEventListener('message', this.handleMessage);
    }
  };

  static getDerivedStateFromProps = (props, prevState) => {
    return null;
  };

  // print passed information in an html element; useful for debugging
  // since console.log and debug statements won't work in a conventional way
  printElement = (data) => {
    if (SHOW_DEBUG_INFORMATION) {
      let message = '';
      if (typeof data === 'object') {
        message = util.inspect(data, { showHidden: false, depth: null });
      } else if (typeof data === 'string') {
        message = data;
      }
      this.setState({
        debugMessages: this.state.debugMessages.concat([message])
      });
      console.log(message);
    }
  };

  createDivIcon = (location) => {
    let divIcon = L.divIcon({
      className: 'clearMarkerContainer',
      html: this.getAnimatedHTMLString(
        location.icon || '📍',
        location.animation || null,
        location.size || [24, 24]
      )
    });
    return divIcon;
  };

  /*
  Get the HTML string containing the icon div, and animation parameters
  */
  getAnimatedHTMLString = (icon, animation, size = [24, 24]) => {
    let iconSizeString = `<div style='font-size: ${Math.max(
      size[0],
      size[1]
    )}px'>`;

    return `<div class='animationContainer' style="
      animation-name: ${animation.name ? animation.name : 'bounce'}; 
      animation-duration: ${animation.duration ? animation.duration : 1}s ;
      animation-delay: ${animation.delay ? animation.delay : 0}s;
      animation-direction: ${
        animation.direction ? animation.direction : 'normal'
      };
      animation-iteration-count: ${
        animation.interationCount ? animation.interationCount : 'infinite'
      }">
      ${iconSizeString}
      ${icon}
      </div>
      </div>`;
  };

  render() {
    return (
      <StrictMode>
        <Map
          style={{
            width: '100%',
            backgroundColor: 'blue'
          }}
          center={this.state.coords}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         
         {/*  {this.state.markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={marker.coords}
                icon={marker.divIcon}
              />
            );
          })} */}
        </Map>
        {SHOW_DEBUG_INFORMATION ? (
          <div
            style={{
              backgroundColor: 'orange',
              maxHeight: '25%',
              overflow: 'auto',
              padding: 5,
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 5000
            }}
            id="messages"
          >
            <ul>
              {this.state.debugMessages.map((message, index) => {
                return <li key={index}>{message}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </StrictMode>
    );
  }
}

export default App;
