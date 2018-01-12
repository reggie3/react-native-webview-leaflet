import renderIf from 'render-if';
// Initialize leaflet.js
const L = require('leaflet');
import 'leaflet/dist/leaflet.css';
import glamorous from 'glamorous';
import { connectToRemote } from 'react-native-webview-messaging/web';
import React from '../react.production.min.js';
import PropTypes from 'prop-types';
const util = require('util');

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
  backgroundColor: 'orange'
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
      } else if (typeof data === 'string') {
        let el = document.createElement('pre');
        el.innerHTML = data;
        document.getElementById('messages').appendChild(el);
      }
    }
  };

  async makeRemoteConnection () {
    console.log('connecting to remote');
    try {
      console.log('here 1');
      console.log(connectToRemote);
      let remote = await connectToRemote();
      console.log('here 2');

      this.remote = remote;
      this.printElement('remote connected');
      this.bindListeners();

      // let the webview know we are listening
      this.remote.emit('WEBVIEW_READY');
      console.log('WEBVIEW_READY emitted');
    } catch (error) {
      this.printElement(`remote connect error ${error}`);
      console.log(`remote connect error ${error}`);
    }
  };

  componentDidMount = () => {
    console.log('leafletReactHTML.js componentDidMount');
    this.makeRemoteConnection();

    this.map = L.map('map', {
      center: [36.916667, -76.2],
      zoom: 13
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
  };

  bindListeners = () => {
    this.printElement('registering listeners');

    // update the center location of the map
    this.remote.on('MAP_CENTER_COORD_CHANGE', event => {
      this.printElement(event);
      this.setState({ mapCenterCoords: event.payload.mapCenterCoords });
      this.printElement('panning map');
      this.map.flyTo(event.payload.mapCenterCoords);
    });

    this.remote.on('UPDATE_MARKERS', event => {
      this.printElement('updating markers');
      this.printElement('markers 0: ' + event.payload.markers[0]);
      this.setState({ markers: event.payload.markers });
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
