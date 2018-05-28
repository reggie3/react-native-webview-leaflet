import renderIf from 'render-if';
// Initialize leaflet.js
const L = require('leaflet');
const util = require('util');
require('leaflet.markercluster');

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import './markers.css';
const isValidCoordinates = require('is-valid-coordinates');
import locations from './testLocations';
import * as mapEventListeners from './mapEventListeners';

const BROWSER_TESTING_ENABLED = false; // flag to enable testing directly in browser
const SHOW_DEBUG_INFORMATION = false;
const MESSAGE_PREFIX = 'react-native-webview-leaflet';

let messageCounter = 0;

export default class LeafletReactHTML extends React.Component {
  constructor(props) {
    super();
    this.map = null;
    this.remote = null;
    this.mapMarkerDictionary = {};
    this.layerMarkerCluster = null;
    this.currentLocationMarker = null;
    this.eventListenersAdded = false;
    this.messageQueue = [];
    this.defaultIconSize = undefined;
    this.currentPositionMarkerStyle = undefined;
    this.state = {
      debugMessages: [],
      locations: BROWSER_TESTING_ENABLED ? locations : [],
      readyToSendNextMessage: true,
      currentPosition: []
    };
  }

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

  componentDidMount = () => {
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
    // lauch the map in brower test mode
    if (BROWSER_TESTING_ENABLED) {
      this.loadMap({
        defaultIconSize: [16, 16],
        zoom: 10,
        showZoomControls: true,
        centerButton: true,
        panToLocation: false,
        showMapAttribution: true,
        currentPosition: [36.56, -76.17],
        currentPositionMarkerStyle: {
          icon: '😀',
          animation: {
            name: 'beat',
            duration: 0.25,
            delay: 0,
            interationCount: 'infinite',
            direction: 'alternate'
          },
          size: [36, 36]
        }
      });
    }
    this.printElement('leafletReactHTML.js componentDidMount complete');
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('message', this.handleMessage);
    } else if (window) {
      window.removeEventListener('message', this.handleMessage);
    }
  };

  loadMap = (
    mapConfig = {
      defaultIconSize: [16, 16],
      showMapAttribution: true,
      currentPosition: [36.56, -76.17]
    }
  ) => {
    this.printElement('loading map: ');
    // set the default icon size
    this.defaultIconSize = mapConfig.defaultIconSize;
    this.currentPositionMarkerStyle = mapConfig.currentPositionMarkerStyle;

    if (!this.map) {
      try {
        // set up map
        this.map = L.map('map', {
          center: mapConfig.currentPosition,
          zoomControl: mapConfig.showZoomControls,
          zoom: mapConfig.zoom,
          // removing the attribution control prevents accidentally clicking on it
          attributionControl: mapConfig.showMapAttribution,
          touchZoom: true
        });
        // Initialize the base layer
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution:
            '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // add click event to map
        let that = this;
        this.map.on('click', (e) => {
          // that.printElement(`map clicked ${e.latlng}`);
          that.addMessageToQueue('MAP_CLICKED', {
            coords: e.latlng
          });
        });

        // create the marker layer
        this.layerMarkerCluster = L.markerClusterGroup();
        this.map.addLayer(this.layerMarkerCluster);

        // mark the current position on the map
        this.updateCurrentPostionMarker(mapConfig.currentPosition);

        // add the map event listeners
        mapEventListeners.addZoomLevelsChangeListener(this);
        mapEventListeners.addResizeListener(this);
        mapEventListeners.addUnloadListener(this);
        mapEventListeners.addViewResetListener(this);
        mapEventListeners.addLoadListener(this);
        mapEventListeners.addZoomStartListener(this);
        mapEventListeners.addMoveStartListener(this);
        mapEventListeners.addZoomListener(this);
        mapEventListeners.addMoveListener(this);
        mapEventListeners.addMoveEndListener(this);
        mapEventListeners.addZoomEndListener(this);

        if (BROWSER_TESTING_ENABLED) {
          this.updateMarkers(this.state.locations);
          // this.setUpMarkerAlterationTest();
        }
      } catch (error) {
        this.printElement('ERROR loading map: ', error);
        // send a messaging back indicating the map has been loaded
        this.addMessageToQueue('MAP_LOADED', {
          type: 'error',
          msg: error
        });
        console.log(error);
      }

      // send a messaging back indicating the map has been loaded
      this.addMessageToQueue('MAP_LOADED', {
        type: 'success',
        center: this.map.getCenter(),
        bounds: this.map.getBounds(),
        zoom: this.map.getZoom()
      });
    }
  };

  /* oldAddMessageToQueue = (type, payload) => {
    this.messageQueue.push(
      JSON.stringify({
        messageID: messageCounter++,
        prefix: MESSAGE_PREFIX,
        type,
        payload
      })
    );

    this.printElement(`adding message ${messageCounter} to queue: ${type}`);

    if (this.state.readyToSendNextMessage) {
      this.sendNextMessage();
    }
  };

  oldSendNextMessage = () => {
    if (this.messageQueue.length > 0) {
      const nextMessage = this.messageQueue.shift();
      this.printElement(`sending message ${nextMessage}`);
      if (document.hasOwnProperty('postMessage')) {
        document.postMessage(nextMessage, '*');
      } else if (window.hasOwnProperty('postMessage')) {
        window.postMessage(nextMessage, '*');
      } else {
        console.log('unable to find postMessage');
      }
      this.setState({ readyToSendNextMessage: false });
    }
  }; */

  addMessageToQueue = (type, payload) => {
    this.sendNextMessage(type, payload);
  };

  sendNextMessage = (type, payload) => {
    if (type) {
      const nextMessage = JSON.stringify({
        messageID: messageCounter++,
        prefix: MESSAGE_PREFIX,
        type,
        payload
      });

      this.printElement(`sending message: ${nextMessage}`);
      if (document.hasOwnProperty('postMessage')) {
        document.postMessage(nextMessage, '*');
      } else if (window.hasOwnProperty('postMessage')) {
        window.postMessage(nextMessage, '*');
      } else {
        console.log('unable to find postMessage');
      }
    }
  };

  handleMessage = (event) => {
    // this.printElement(`received message ${JSON.stringify(event)}`);
    this.printElement(
      util.inspect(event.data, {
        showHidden: false,
        depth: null
      })
    );

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

        /* case 'ADD_ZOOM_LEVELS_CHANGE_LISTENER':
          mapEventListeners.addZoomLevelsChangeListener(this);
          break;
        case 'ADD_RESIZE_LISTENER':
          mapEventListeners.addResizeListener(this);
          break;
        case 'ADD_UNLOAD_LISTENER':
          mapEventListeners.addUnloadListener(this);
          break;
        case 'ADD_VIEW_RESET_LISTENER':
          mapEventListeners.addViewResetListener(this);
          break;
        case 'ADD_LOAD_LISTENER':
          mapEventListeners.addLoadListener(this);
          break;
        case 'ADD_ZOOM_START_LISTENER':
          mapEventListeners.addZoomStartListener(this);
          break;
        case 'ADD_MOVE_START_LISTENER':
          mapEventListeners.addMoveStartListener(this);
          break;
        case 'ADD_ZOOM_LISTENER':
          mapEventListeners.addZoomListener(this);
          break;
        case 'ADD_MOVE_LISTENER':
          mapEventListeners.addMoveListener(this);
          break;
        case 'ADD_ZOOM_END_LISTENER':
          mapEventListeners.addZoomEndListener(this);
          break;
        case 'ADD_MOVE_END_LISTENER':
          mapEventListeners.addMoveEndListener(this);
          break;*/
        case 'LOAD_MAP':
          this.printElement(`LOAD_MAP event recieved: ${msgData.payload}`);
          this.loadMap(msgData.payload);
          break;
        case 'SHOW_MAP_ATTRIBUTION':
          this.showMapAttribution();
          break;
        case 'GET_MAP_VIEW_INFO':
          this.addMessageToQueue('MAP_SENT', { map: this.map });
          break;
        case 'CENTER_MAP_ON_CURRENT_POSITION':
          this.printElement('CENTER_MAP_ON_CURRENT_POSITION event recieved');
          this.printElement(msgData.payload.currentPosition);

          this.setState(
            { currentPosition: msgData.payload.currentPosition },
            () => {
              this.printElement(this.state.currentPosition);
              if (msgData.payload.panToLocation === true) {
                this.printElement('panning map');
                this.map.flyTo(this.state.currentPosition);
              } else {
                this.printElement('setting map');
                this.map.setView(this.state.currentPosition);
              }
              this.updateCurrentPostionMarker(this.state.currentPosition);
            }
          );
          break;

        case 'FIT_BOUNDS':
          this.printElement('FIT_BOUNDS event recieved');
          this.printElement(msgData.payload);
          this.map.fitBounds(msgData.payload.bounds, {
            padding: msgData.payload.hasOwnProperty('padding')
              ? msgData.payload.padding
              : [0, 0]
          });
          break;

        case 'UPDATE_MARKERS':
          // this.printElement('UPDATE_MARKERS event recieved');
          // this.printElement('markers 0: ' + JSON.stringify(msgData));
          this.updateMarkers(msgData.payload.markers);
          break;

        case 'MESSAGE_ACKNOWLEDGED':
          this.setState({ readyToSendNextMessage: true });
          this.sendNextMessage();
          break;

        case 'SET_ZOOM':
          this.map.setZoom(msgData.payload.zoom);
          break;

        case 'SHOW_ZOOM_CONTROLS':
          if (msgData.payload.showZoomControls) {
            this.map.addControl(this.map.zoomControl);
          }
          {
            this.map.removeControl(this.map.zoomControl);
          }
          break;

        default:
          this.printElement(
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

  updateCurrentPostionMarker = (currentPos) => {
    this.printElement(`leafletReactHTML: currentPos: ${currentPos}`);
    if (this.currentLocationMarker) {
      this.currentLocationMarker.removeFrom(this.map);
    }

    this.printElement(
      `currentPositionMarkerStyle: `,
      this.currentPositionMarkerStyle
    );

    let currentPositionIcon = this.getIcon(
      this.currentPositionMarkerStyle.icon,
      this.currentPositionMarkerStyle.animation,
      this.currentPositionMarkerStyle.size
    );

    this.printElement(`currentPostitionIcon: `, currentPositionIcon);

    this.currentLocationMarker = L.marker(currentPos, {
      icon: currentPositionIcon
    });

    // add onClick event to current position marker
    let that = this;
    this.currentLocationMarker.on('click', () => {
      that.printElement(`leafletReactHTML: current postion marker clicked`);
      that.addMessageToQueue('CURRENT_POSITION_MARKER_CLICKED');
    });

    this.currentLocationMarker.addTo(this.map);
  };

  getAnimatedHTMLString = (icon, animation, size) => {
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

  getIcon = (icon, animation, size) => {
    // this.printElement(icon);
    // print animated markers
    if (animation) {
      return L.divIcon({
        size,
        className: 'clearMarkerContainer',
        html: this.getAnimatedHTMLString(icon, animation, size)
      });
    } else {
      // print non animated markers
      return L.divIcon({
        iconSize: null,
        iconAnchor: [
          Math.floor(this.defaultIconSize[0] / 2),
          Math.floor(this.defaultIconSize[1] / 2)
        ],
        className: 'clearMarkerContainer',
        html: `<div style='font-size: ${Math.max(
          this.defaultIconSize[0],
          this.defaultIconSize[1]
        )}px'>
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
  updateMarkers = (markerInfos) => {
    // this.printElement(`in updateMarkers: ${updateCounter++}`);
    // this.printElement(markerInfos[0]);

    // take the markers that were sent and check to see if thy are already in the dictionary
    // if not, create new marker; then add to map layer and dictionary
    // if so, update it's dictionary item
    if (markerInfos) {
      try {
        markerInfos.forEach((markerInfo) => {
          if (this.mapMarkerDictionary.hasOwnProperty(markerInfo.id)) {
            this.updateMarker(
              this.mapMarkerDictionary[markerInfo.id],
              markerInfo
            );
          } else {
            let newMarker = this.createNewMarker(markerInfo);
            // this.printElement(`adding markerInfo:`);
            // this.printElement(newMarker);

            this.addMarkerToMakerLayer(newMarker);
          }
        });
        // this.printElement(this.mapMarkerDictionary);
      } catch (error) {
        this.printElement(`Error in updateMarkers ${error}`);
      }
    }
  };

  updateMarker = (marker, markerInfo) => {
    try {
      // this.printElement(`updateMarker ${marker.getElement()}`);
      // remove this marker
      marker.removeFrom(this.layerMarkerCluster);
      // create a new marker with correct properties
      let newMarker = this.createNewMarker(markerInfo);
      this.addMarkerToMakerLayer(newMarker);
    } catch (error) {
      this.printElement(`Error updating marker ${error}`);
    }
  };

  createNewMarker = (markerInfo) => {
    // validate the marker
    // id and coords are required
    // this.printElement(`creating new marker`)
    // this.printElement(markerInfo);
    if (
      !markerInfo.hasOwnProperty('id') ||
      !markerInfo.hasOwnProperty('coords') ||
      !isValidCoordinates(markerInfo.coords[1], markerInfo.coords[0])
    ) {
      console.log(
        `Invalid map marker received.
         Map markers require an id value and and valid lat/long coordinates value`
      );
      return;
    }
    try {
      let mapMarker = L.marker(markerInfo.coords, {
        // build the actual icon
        icon: this.getIcon(
          markerInfo.hasOwnProperty('icon') ? markerInfo.icon : '📍',
          markerInfo.hasOwnProperty('animation') ? markerInfo.animation : null,
          // marker size is controled by a 2 digit array
          markerInfo.hasOwnProperty('size')
            ? markerInfo.size
            : this.defaultIconSize
        ),
        id: markerInfo.id ? markerInfo.id : null
      });
      /* this.printElement(`new mapMarker`);
			this.printElement(mapMarker); */
      // bind a click event to this marker with the marker id
      // click event is for use by the parent of this html file's
      // WebView
      let that = this;
      mapMarker.on('click', () => {
        // const markerID = this.options.id;
        that.printElement(`leafletReactHTML: marker clicked ${markerInfo.id}`);
        that.addMessageToQueue('MARKER_CLICKED', {
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

  addMarkerToMakerLayer = (marker) => {
    // this.printElement(`adding marker: ${marker}`);
    try {
      marker.addTo(this.layerMarkerCluster);
    } catch (error) {
      this.printElement(`error adding maker to layer: ${error}`);
    }
  };

  render = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
        ref={(component) => {
          this.webComponent = component;
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: 1
          }}
          id="map"
        />
        {renderIf(SHOW_DEBUG_INFORMATION)(
          <div
            style={{
              backgroundColor: 'orange',
              maxHeight: 200,
              overflow: 'auto',
              padding: 5
            }}
            id="messages"
          >
            <ul>
              {this.state.debugMessages.map((message, index) => {
                return <li key={index}>{message}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  setUpMarkerAlterationTest = () => {
    setInterval(this.updateMarkerSpeed.bind(this), 5000);
  };

  updateMarkerSpeed = () => {
    console.log('altering markers');
    let updatedLocations = this.state.locations.map((location) => {
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
