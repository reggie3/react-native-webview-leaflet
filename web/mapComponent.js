import Leaflet from 'leaflet';
import React, { Component, createRef } from 'react';
import { Map, Marker, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import testLocations from './testLocations';
import './markerAnimations.css';
import './normalize.min.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import './markers.css';

import ControlsLayer from './ControlsLayer';
import RasterLayer from './RasterLayer';
import mapLayers from './mockMapLayers';
const isValidCoordinates = require('is-valid-coordinates');
const util = require('util');

const MESSAGE_PREFIX = 'react-native-webview-leaflet';

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

const SHOW_DEBUG_INFORMATION = true;
const ENABLE_BROWSER_TESTING = true;

class mapComponent extends Component {
  constructor(props) {
    super(props);

    this.mapMarkerDictionary = {};
    this.mapRef = createRef();
    this.state = {
      ownPosition: {},
      ownPositionMarker: {},
      centerPosition: [36.8860065, -76.4096611],
      zoom: 8,
      debugMessages: [],
      locations: [],
      markers: [],
      showAttributionControl: false,
      mapLayers: []
    };
  }

  componentDidMount = () => {
    this.printElement('leafletReactHTML.js componentDidMount');

    // add the event listeners
    if (document) {
      document.addEventListener('message', this.handleMessage), false;
      // this.printElement('using document');
    } else if (window) {
      window.addEventListener('message', this.handleMessage), false;
      // this.printElement('using window');
    } else {
      console.log('unable to add event listener');
      return;
    }

    this.eventListenersAdded = true;

    if (ENABLE_BROWSER_TESTING) {
      this.setState({ locations: [...testLocations],
      mapLayers });
    }

    try {
      setTimeout(() => {
        this.onMapEvent('onLoad', {
          loaded: true,
          center: this.mapRef.current.leafletElement.getCenter(),
          bounds: this.mapRef.current.leafletElement.getBounds(),
          zoom: this.mapRef.current.leafletElement.getZoom()
        });
      }, 500);
      setTimeout(() => {
        // this.onMapEvent('onRef', {ref: this.mapRef});
      }, 500);
    } catch (error) {
      this.printElement(error);
    }
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('message', this.handleMessage);
    } else if (window) {
      window.removeEventListener('message', this.handleMessage);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    let that = this;
    if (this.state.coords !== prevState.coords) {
      this.printElement(`updating coords to ${this.state.coords}`);
    }

    // update the locations if they have changed
    if (
      JSON.stringify(this.state.locations) !==
      JSON.stringify(prevState.locations)
    ) {
      let markers = this.state.locations.map((location) => {
        if (isValidCoordinates(location.coords[1], location.coords[0])) {
          return {
            id: location.id,
            coords: location.coords,
            divIcon: that.createDivIcon(location)
          };
        }
      });
      this.setState({ markers }, () => {
        console.log(this.state.markers);
      });
    }

    // update the bounds if they have changed
    if (
      JSON.stringify(this.state.bounds) !== JSON.stringify(prevState.bounds)
    ) {
      this.state.map.leafletElement.fitBounds(
        this.state.bounds,
        this.state.padding
      );
    }

    // see if a reference to the map is available, and if so send it
    /* if (!prevState.map && this.state.map) {
      this.printElement(`map reference availabile`);

      this.onMapEvent('onMapReference', this.state.map);
    } */
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
        debugMessages: [...this.state.debugMessages, message]
      });
      console.log(message);
    }
  };

  createDivIcon = (location) => {
    let divIcon = L.divIcon({
      className: 'clearMarkerContainer',
      html: location.animation
        ? this.getAnimatedHTMLString(
            location.icon || '📍',
            location.animation || null,
            location.size || [24, 24]
          )
        : this.getUnanimatedHTMLString(location.icon, location.size)
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

  getUnanimatedHTMLString = (icon, animation, size = [24, 24]) => {
    let iconSizeString = `<div style='font-size: ${Math.max(
      size[0],
      size[1]
    )}px'>`;

    return `<div class='unanimatedIconContainer' >
      ${iconSizeString}
      ${icon}
      </div>
      </div>`;
  };

  // data to send is an object containing key value pairs that will be
  // spread into the destination's state
  sendMessage = (payload) => {
    // this.printElement(`in send message payload = ${JSON.stringify(payload)}`);

    const message = JSON.stringify({
      prefix: MESSAGE_PREFIX,
      payload: payload
    });

    if (document.hasOwnProperty('postMessage')) {
      document.postMessage(message, '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(message, '*');
    } else {
      console.log('unable to find postMessage');
    }
    // this.printElement(`sending message: ${JSON.stringify(message)}`);
  };

  handleMessage = (event) => {
    /* this.printElement(`received message ${JSON.stringify(event)}`);
    this.printElement(
      util.inspect(event.data, {
        showHidden: false,
        depth: null
      })
    ); */

    let msgData;
    try {
      msgData = JSON.parse(event.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        this.setState({ ...this.state, ...msgData.payload });
      }
    } catch (err) {
      this.printElement(`leafletReactHTML error: ${err}`);
      return;
    }
  };

  onMapEvent = (event, payload) => {
    // build a payload if one is not provided
    if (!payload) {
      payload = {
        center: this.mapRef.current.leafletElement.getCenter(),
        bounds: this.mapRef.current.leafletElement.getBounds(),
        zoom: this.mapRef.current.leafletElement.getZoom()
      };
    }
    /* this.printElement(
      `onMapEvent: event = ${event}, payload = ${JSON.stringify(payload)}`
    ); */

    this.sendMessage({
      event,
      payload
    });
  };

  render() {
    return (
      <React.Fragment>
        <Map
          style={{
            width: '100%',
            backgroundColor: 'lightblue'
          }}
          ref={this.mapRef}
          center={this.state.centerPosition}
          attributionControl={this.state.showAttributionControl}
          zoomControl={this.state.showZoomControl}
          panToLocation={this.state.panToLocation}
          zoom={this.state.zoom}
          onClick={(event) => {
            this.onMapEvent('onMapClicked', {
              coords: [event.latlng.lat, event.latlng.lng]
            });
          }}
          onZoomLevelsChange={() => {
            this.onMapEvent('onZoomLevelsChange', null);
          }}
          onResize={() => {
            this.onMapEvent('onResize', null);
          }}
          onZoomStart={() => {
            this.onMapEvent('onZoomStart', null);
          }}
          onMoveStart={() => {
            this.onMapEvent('onMoveStart', null);
          }}
          onZoom={() => {
            this.onMapEvent('onZoomLevelsChange', null);
          }}
          onMove={() => {
            this.onMapEvent('onResize', null);
          }}
          onZoomEnd={() => {
            this.onMapEvent('onZoomStart', null);
          }}
          onMoveEnd={() => {
            this.onMapEvent('onMoveStart', null);
          }}
          onUnload={() => {
            this.onMapEvent('onUnload', null);
          }}
          onViewReset={() => {
            this.onMapEvent('onViewReset', null);
          }}
        >
          {this.state.mapLayers.length === 1 ? (
            <RasterLayer mapLayer={this.state.mapLayers[0]} />
          ) : (
            <LayersControl position="topright">
              <ControlsLayer mapLayers={this.state.mapLayers} />
            </LayersControl>
          )}

          {this.state.markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={marker.coords}
                icon={marker.divIcon}
                onClick={() => {
                  this.onMapEvent('onMapMarkerClicked', { id: marker.id });
                }}
              />
            );
          })}
        </Map>
        {SHOW_DEBUG_INFORMATION ? (
          <div
            style={{
              backgroundColor: 'orange',
              maxHeight: '200px',
              overflow: 'auto',
              padding: 5,
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 15000
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
      </React.Fragment>
    );
  }
}

export default mapComponent;
