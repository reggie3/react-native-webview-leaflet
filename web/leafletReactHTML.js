import renderIf from 'render-if';
// Initialize leaflet.js
const L = require('leaflet');
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import glamorous from 'glamorous';
import { connectToRemote } from 'react-native-webview-messaging/web';
import React from '../react.production.min.js';
import PropTypes from 'prop-types';
const util = require('util');
import * as markers from './markers.js';
import './markers.css';

const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];

const WebviewContainer = glamorous.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'yellow'
});

const MessagesDiv = glamorous.div({
  backgroundColor: 'orange',
  maxHeight: 150,
  overflow: 'auto'
});
const MapDiv = glamorous.div({
  position: 'relative',
  /* left: 0,
  right: 0,
  width: 500,
  height: 500, */
  flex: 1
});

export default class LeafletReactHTML extends React.Component {
  constructor() {
    super();
    this.map = null;
    this.remote = null;
    this.state = {
      showDebug: true,
      currentPaymentStatus: null
    };
  }

  // print passed information in an html element; useful for debugging
  // since console.log and debug statements won't work in a conventional way
  printElement = data => {
    if (this.state.showDebug) {
      if (typeof data === 'object') {
        let el = document.createElement('pre');
        el.innerHTML = util.inspect(data, { showHidden: false, depth: null });
        document.getElementById('messages').appendChild(el);
        console.log(JSON.stringify(data));
      } else if (typeof data === 'string') {
        let el = document.createElement('pre');
        el.innerHTML = data;
        document.getElementById('messages').appendChild(el);
        console.log(data);
      }
    }
  };

  makeRemoteConnection = async () => {
    // this.printElement('connecting to remote');
    try {
      let remote = await connectToRemote();
      this.remote = remote;
      this.printElement('remote connected');
      this.bindListeners();

      // let the webview know we are listening
      // this.printElement('emitting webview ready');
      this.remote.emit('WEBVIEW_READY', {
        payload: 'hello'
      });
      // this.printElement('WEBVIEW_READY emitted');
    } catch (error) {
      this.printElement(`remote connect error ${error}`);
    }
  };

  componentDidMount = () => {
    this.printElement('leafletReactHTML.js componentDidMount');
    this.makeRemoteConnection();

    this.map = L.map('map', {
      center: [51.5, -0.09],
      zoom: 15
    });
    // Initialize the base layer
    var osm_mapnik = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 10,
        attribution:
          '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(this.map);

    // add click event to map
    this.map.on('click', e => {
      this.printElement(`map clicked ${e.latlng}`);
      this.remote.emit('MAP_CLICKED', {
        payload: {
          coords: e.latlng
        }
      });
    });
  };


  bindListeners = () => {
    // this.printElement('registering listeners');

    // update the center location of the map
    this.remote.on('MAP_CENTER_COORD_CHANGE', event => {
      // this.printElement(event);
      this.setState({ mapCenterCoords: event.payload.mapCenterCoords });
      // this.printElement('panning map');
      this.map.flyTo(event.payload.mapCenterCoords);
    });

    this.remote.on('UPDATE_MARKERS', event => {
      // this.printElement('UPDATE_MARKERS event recieved');
      // this.printElement('markers 0: ' + JSON.stringify(event.payload.markers[0]));
      this.setState({ markers: event.payload.markers }, () => {
        // this.printElement('update marker callback');
        this.updateMarkers();
      });
    });
  };

  iconFactory = (icon, animation) => {
    // this.printElement(icon);
    // print animated markers
    if (animation) {
      return L.divIcon({
        iconSize: null,
        className: 'clearMarkerContainer',
        html: `<div class='animationContainer' style="
      animation-name: ${animation.name ? animation.name : 'bounce'}; 
      animation-duration: ${animation.duration ? animation.duration : 1}s ;
      animation-delay: ${animation.delay ? animation.delay : 0}s;
      animation-iteration-count: ${
        animation.interationCount ? animation.interationCount : 'infinite'
      }">
      <div style='font-size: 36px'>
      ${icon}
      </div>
      </div>`
      });
    } else {
      // print non animated markers
      return L.divIcon({
        iconSize: null,
        className: 'clearMarkerContainer',
        html: `<div style='font-size: 36px'>
        ${icon}
        </div>`
      });
    }
  };

  updateMarkers = () => {
    // this.printElement('in updateMarkers');

    this.state.markers.forEach(marker => {
      // this.printElement(marker.coords);
      try {
        let mapMarker = L.marker(marker.coords, {
          icon: this.iconFactory(marker.icon, marker.animation)
        }).addTo(this.map);

        mapMarker.on('click', () => {
          this.printElement(`marker clicked ${marker.id}`);
          this.remote.emit('MARKER_CLICKED', {
            payload: {
              id: marker.id ? marker.id : null
            }
          });
        });
      } catch (error) {
        this.printElement(`error adding maker: ${error}`);
      }
    });
  };

  render = () => {
    return (
      <WebviewContainer
        ref={component => {
          this.webComponent = component;
        }}
      >
        <MapDiv id="map" />
        {renderIf(this.state.showDebug)(<MessagesDiv id="messages" />)}
      </WebviewContainer>
    );
  };
}
