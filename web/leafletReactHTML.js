import renderIf from 'render-if';
// Initialize leaflet.js
const L = require('leaflet');
const util = require('util');
// require('leaflet_search')
// require('leaflet_search_css')
require('leaflet.markercluster');
require('marker_cluster_css');
require('marker_cluster_default_css');
require('leaflet_css');

// import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import glamorous from 'glamorous';
import React from '../react.production.min.js';
import PropTypes from 'prop-types';
import * as markers from './markers.js';
import './markers.css';
const isValidCoordinates = require('is-valid-coordinates');
import locations from './testLocations';

const BROWSER_TESTING_ENABLED = true; // flag to enable testing directly in browser
const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
let updateCounter = 0;
const MESSAGE_PREFIX = 'react-native-webview-leaflet';

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
  flex: 1
});

export default class LeafletReactHTML extends React.Component {
  constructor() {
    super();
    this.map = null;
    this.remote = null;
    this.mapMarkerDictionary = {};
    this.layerMarkerCluster = null;

    this.state = {
      showDebug: true,
      locations: BROWSER_TESTING_ENABLED ? locations : []
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

  componentDidMount = () => {
    this.printElement('leafletReactHTML.js componentDidMount');
    // setup react-native-webview-messaging channel
    document.addEventListener('message', this.handleMessage), false;

    this.sendMessage('TEST', 'Test Payload');

    // set up map
    this.map = L.map('map', {
      center: BROWSER_TESTING_ENABLED ? [37, -76] : [38.889931, -77.009003],
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

    /* L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2Vlemhhd2siLCJhIjoiY2ltcDFpY2dwMDBub3VtbTFkbWY5b3BhMSJ9.4mN7LI5CJMCDFvqkx1OJZw'
      }).addTo(this.map); */

    // add click event to map
    let that = this;
    this.map.on('click', e => {
      that.printElement(`map clicked ${e.latlng}`);
      that.sendMessage('MAP_CLICKED', {
        coords: e.latlng
      });
    });
    // create the marker layer
    this.layerMarkerCluster = L.markerClusterGroup();
    this.map.addLayer(this.layerMarkerCluster);

    if (BROWSER_TESTING_ENABLED) {
      this.updateMarkers(this.state.locations);
      this.setuUpMarkerAlterationTest();
    }
  };

  sendMessage = (type, payload) => {
    window.postMessage(
      JSON.stringify({
        prefix: MESSAGE_PREFIX,
        type,
        payload
      }),
      '*'
    );
  };

  handleMessage = event => {
    this.printElement(`received message`);
    /* this.printElement(
      util.inspect(event.data, {
        showHidden: false,
        depth: null,
      })
    ); */

    let msgData;
    try {
      msgData = JSON.parse(event.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        // this.printElement(msgData);
        switch (msgData.type) {
          // receive an event when the webview is ready
          case 'MAP_CENTER_COORD_CHANGE':
            // this.printElement('MAP_CENTER_COORD_CHANGE event recieved');
            this.setState({ mapCenterCoords: msgData.payload.mapCenterCoords });
            // this.printElement('panning map');
            if (msgData.payload.panToLocation === true) {
              // this.printElement('panning map');
              this.map.flyTo(msgData.payload.mapCenterCoords);
            } else {
              // this.printElement('setting map');
              this.map.setView(msgData.payload.mapCenterCoords);
            }
            break;

          case 'UPDATE_MARKERS':
            /* this.printElement('UPDATE_MARKERS event recieved');
            this.printElement(
              'markers 0: ' + JSON.stringify(msgData.payload.markers[0])
            ); */
            this.updateMarkers(msgData.payload.markers);
            break;

          default:
            console.warn(
              `leafletReactHTML Error: Unhandled message type received "${
                msgData.type
              }"`
            );
        }
      }
    } catch (err) {
      this.printElement(`leafletReactHTML error: ${err}`);
      return;
    }
  };

  getAnimatedHTMLString = (icon, animation) => {
    return `<div class='animationContainer' style="
      animation-name: ${animation.name ? animation.name : 'bounce'}; 
      animation-duration: ${animation.duration ? animation.duration : 1}s ;
      animation-delay: ${animation.delay ? animation.delay : 0}s;
      animation-iteration-count: ${
        animation.interationCount ? animation.interationCount : 'infinite'
      }">
      <div style='font-size: 36px'>
      ${icon}
      </div>
      </div>`;
  };

  getIcon = (icon, animation) => {
    // this.printElement(icon);
    // print animated markers
    if (animation) {
      return L.divIcon({
        iconSize: null,
        className: 'clearMarkerContainer',
        html: this.getAnimatedHTMLString(icon, animation)
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

  /*******************************
   *
   * TODO: removing the layer of map marers does not work
   * need to maintain reference to each marker, and individually update it
   * by having it call getIcon with the updated date to get a new icon
   */
  updateMarkers = markerInfos => {
    // this.printElement(`in updateMarkers: ${updateCounter++}`);
    // this.printElement(markerInfos[0]);

    // take the markers that were sent and check to see if thy are already in the dictionary
    // if not, create new marker; then add to map layer and dictionary
    // if so, update it's dictionary item
    try {
      markerInfos.forEach(markerInfo => {
        if (this.mapMarkerDictionary.hasOwnProperty(markerInfo.id)) {
          this.updateMarker(
            this.mapMarkerDictionary[markerInfo.id],
            markerInfo
          );
        } else {
          let newMarker = this.createNewMarker(markerInfo);
          this.addMarkerToMakerLayer(newMarker);
        }
      });
      // this.printElement(this.mapMarkerDictionary);
    } catch (error) {
      this.printElement(`Error in updateMarkers ${error}`);
    }
  };

  updateMarker = (marker, markerInfo) => {
    try {
      // this.printElement(marker.getElement());
      // remove this marker
      marker.removeFrom(this.layerMarkerCluster);
      // create a new marker with correct properties
      let newMarker = this.createNewMarker(markerInfo);
      this.addMarkerToMakerLayer(newMarker);
    } catch (error) {
      this.printElement(`Error updating marker ${error}`);
    }
  };

  createNewMarker = markerInfo => {
    // validate the marker
    // id and coords are required
    if (
      !markerInfo.hasOwnProperty('id') ||
      !markerInfo.hasOwnProperty('coords') ||
      !isValidCoordinates(markerInfo.coords[0], markerInfo.coords[1])
    ) {
      console.log(
        `Invalid map marker received.
         Map markers require an id value and and valid lat/long coordinates value`
      );
      return;
    }
    try {
      let mapMarker = L.marker(markerInfo.coords, {
        icon: this.getIcon(
          markerInfo.hasOwnProperty('icon') ? markerInfo.icon : '📍',
          markerInfo.hasOwnProperty('animation') ? markerInfo.animation : null
        ),
        id: markerInfo.id ? markerInfo.id : null
      });

      // bind a click event to this marker with the marker id
      // click event is for use by the parent of this html file's
      // WebView
      let that = this;
      mapMarker.on('click', (e) => {
        // const markerID = this.options.id;
        that.printElement(`leafletReactHTML: marker clicked ${ markerInfo.id}`);
        that.sendMessage('MARKER_CLICKED', {
          id: markerInfo.id
        });
      });

      // create a dictionary to access the mapMarkers by ID
      this.mapMarkerDictionary[markerInfo.id] = mapMarker;

      return mapMarker;
    } catch (error) {
      this.printElement(`error creating maker: ${error}`);
    }
  };

  addMarkerToMakerLayer = marker => {
    // this.printElement(`adding marker: ${marker}`)
    try {
      marker.addTo(this.layerMarkerCluster);
    } catch (error) {
      this.printElement(`error adding maker to layer: ${error}`);
    }
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

  setuUpMarkerAlterationTest = () => {
    setInterval(this.updateMarkerSpeed.bind(this), 5000);
  };

  updateMarkerSpeed = () => {
    console.log('altering markers');
    let updatedLocations = this.state.locations.map(location => {
      if (!location.animation) {
        return location;
      }
      let updatedLocation = Object.assign({}, location, {
        animation: Object.assign({}, location.animation, {
          duration: location.animation.duration + 0.5
        })
      });
      return updatedLocation;
    });
    this.setState({ locations: updatedLocations });
    this.updateMarkers(this.state.locations);
  };
}
