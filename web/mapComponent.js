import Leaflet from 'leaflet';
import React, { Component, createRef } from 'react';
import {
  Map,
  Marker,
  LayersControl,
  LayerGroup,
  Polygon,
  Popup,
} from 'react-leaflet';
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
import base64Image from './webBase64Image.js';

// marker cluster imports
import MarkerClusterGroup from 'react-leaflet-markercluster';
require('react-leaflet-markercluster/dist/styles.min.css');

const isValidCoordinates = require('is-valid-coordinates');
const util = require('util');

const MESSAGE_PREFIX = 'react-native-webview-leaflet';

// Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

const SHOW_DEBUG_INFORMATION = false;
const ENABLE_BROWSER_TESTING = false;

class mapComponent extends Component {
  constructor(props) {
    super(props);

    this.mapMarkerDictionary = {};
    this.mapRef = createRef();
    this.state = {
      ownPositionMarker: {},
      centerPosition: [36.8860065, -76.4096611],
      zoom: 14,
      debugMessages: [],
      locations: [],
      markers: [],
      geometryLayers: [],
      showAttributionControl: false,
      mapLayers: [],
      combinedLocations: [], // array to contain the locations that will be turned into markers and ownPostionMarker
      useMarkerClustering: false,
      loaded: false,
    };
  }

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
    if (ENABLE_BROWSER_TESTING) {
      this.setState({
        locations: testLocations,
        ownPositionMarker: {
          coords: this.state.centerPosition,
          icon: '🎃',
          size: [24, 24],
          animation: {
            name: 'pulse',
            duration: '.5',
            delay: 0,
            interationCount: 'infinite',
          },
        },
        mapLayers,
        useMarkerClustering: true,
      });

      setTimeout(() => {
        this.setState({
          bounds: [
            [36.8859965, -76.4096793],
            [39.07467659353497, -76.91253011988012],
          ],
          boundsOptions: { padding: [0, 0] },
        });
      }, 5000);
    }

    try {
      this.printElement('trying to send on load message');
      setTimeout(() => {
        this.printElement('sending on load message after timeout');
        this.onMapEvent('onLoad', {
          loaded: true,
          center: this.mapRef.current.leafletElement.getCenter(),
          bounds: this.mapRef.current.leafletElement.getBounds(),
          zoom: this.mapRef.current.leafletElement.getZoom(),
        });
        this.printElement('sent onload event');
      }, 1000);
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
    if (this.state.centerPosition !== prevState.centerPosition) {
      this.printElement(
        `updating centerPosition to ${this.state.centerPosition}`,
      );
    }

    if (prevState.combinedLocations !== this.state.combinedLocations) {
      let markers = this.state.combinedLocations.map(location => {
        if (isValidCoordinates(location.coords[1], location.coords[0])) {
          return {
            id: location.id,
            coords: location.coords,
            divIcon: that.createDivIcon(location),
            title: location.title,
          };
        }
      });

      this.setState({ markers }, () => {
        console.log(this.state.markers);
      });
    }

    if (prevState.geometryLayers) {
      console.warn(this.state.geometryLayers);
    }

    // update the combined locations if the ownPositionMarker object has changed
    // in state
    if (this.state.ownPositionMarker !== prevState.ownPositionMarker) {
      this.updateLocations();
    }

    // update the combined locations if the locations array has changed
    // in state
    if (
      JSON.stringify(this.state.locations) !==
      JSON.stringify(prevState.locations)
    ) {
      this.updateLocations();
    }
  };

  // update the array of combined locations when we detect either a new
  // ownPositionMarker or list of locations in state
  updateLocations = () => {
    if (this.state.locations && this.state.ownPositionMarker.coords) {
      this.setState({
        combinedLocations: [
          ...this.state.locations,
          { id: 'ownPositionMarker', ...this.state.ownPositionMarker },
        ],
      });
    } else if (this.state.locations) {
      this.setState({
        combinedLocations: this.state.locations,
      });
    } else if (this.state.ownPositionMarker.coords) {
      this.setState({
        combinedLocations: [
          { id: 'ownPositionMarker', ...this.state.ownPositionMarker },
        ],
      });
    }
  };

  // print passed information in an html element; useful for debugging
  // since console.log and debug statements won't work in a conventional way
  printElement = data => {
    if (SHOW_DEBUG_INFORMATION) {
      let message = '';
      if (typeof data === 'object') {
        message = util.inspect(data, { showHidden: false, depth: null });
      } else if (typeof data === 'string') {
        message = data;
      }
      this.setState({
        debugMessages: [...this.state.debugMessages, message],
      });
      console.log(message);
    }
  };

  createDivIcon = location => {
    let divIcon = L.divIcon({
      className: 'clearMarkerContainer',
      html: location.animation
        ? this.getAnimatedHTMLString(
            location.icon || '📍',
            location.animation || null,
            location.size || [24, 24],
          )
        : this.getUnanimatedHTMLString(location.icon, location.size),
      iconAnchor: location.iconAnchor || null,
    });
    return divIcon;
  };

  /*
  Get the HTML string containing the icon div, and animation parameters
  */
  getAnimatedHTMLString = (icon, animation, size = [24, 24]) => {
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
      ${this.getIconFromEmojiOrImageOrSVG(icon, size)}

      </div>`;
  };

  getUnanimatedHTMLString = (icon, animation, size = [24, 24]) => {
    return `<div class='unanimatedIconContainer' >
      ${this.getIconFromEmojiOrImageOrSVG(icon, size)}

      </div>`;
  };

  getIconFromEmojiOrImageOrSVG = (icon, size) => {
    if (icon.includes('svg') || icon.includes('SVG')) {
      return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
      ${icon}
      </div>`;
    } else if (icon.includes('//') || icon.includes('base64')) {
      return `<img src="${base64Image}" style="width:${size[0]}px;height:${
        size[1]
      }px;">`;
    } else {
      return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
    ${icon}
    </div>`;
    }
  };
  // data to send is an object containing key value pairs that will be
  // spread into the destination's state
  sendMessage = payload => {
    // this.printElement(`in send message payload = ${JSON.stringify(payload)}`);

    const message = JSON.stringify({
      prefix: MESSAGE_PREFIX,
      payload: payload,
    });

    this.printElement(`message to send = ${message}`);

    try {
      if (document.hasOwnProperty('postMessage')) {
        document.postMessage(message, '*');
      } else if (window.hasOwnProperty('postMessage')) {
        window.postMessage(message, '*');
      } else {
        console.log('unable to find postMessage');
        this.printElement(`unable to find postMessage`);
      }
    } catch (error) {
      this.printElement(`error sending message: ${JSON.stringify(error)}`);
    }

    this.printElement(`sent message: ${message}`);
  };

  handleMessage = event => {
    this.printElement(
      `received message ${util.inspect(event.data, {
        showHidden: false,
        depth: null,
      })}`,
    );

    let msgData;
    try {
      msgData = JSON.parse(event.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        this.printElement(`Received: ${JSON.stringify(msgData)}`);
        this.setState({ ...this.state, ...msgData.payload }, () => {
          // this.printElement(`state: ${JSON.stringify(this.state)}`);
        });
      }
    } catch (err) {
      this.printElement(`leafletReactHTML error: ${err}`);
      return;
    }
  };

  onMapEvent = (event, payload) => {
    // build a payload if one is not provided
    const mapCenterPosition = [
      this.mapRef.current.leafletElement.getCenter().lat,
      this.mapRef.current.leafletElement.getCenter().lng,
    ];
    const mapBounds = this.mapRef.current.leafletElement.getBounds();
    const mapZoom = this.mapRef.current.leafletElement.getZoom();

    if (!payload) {
      payload = {
        center: mapCenterPosition,
        bounds: mapBounds,
        zoom: mapZoom,
      };
    }
    this.printElement(
      `onMapEvent: event = ${event}, payload = ${JSON.stringify(payload)}`,
    );

    this.sendMessage({
      event,
      payload,
    });

    // update the map's center in state if it has moved
    // The map's center in state (centerPosition) is used by react.leaflet
    // to center the map.  Centering the map component on the actual
    // map center will allow us to recenter the map by updating the centerPosition
    // item in state ourself
    if (event === 'onMoveEnd') {
      this.setState({ centerPosition: mapCenterPosition }, () => {
        /*  this.printElement(
          `************** Updated centerPosition = ${this.state.centerPosition}`
        ); */
      });
    }
    if (event === 'onZoomEnd') {
      this.setState({ zoom: mapZoom }, () => {
        /*  this.printElement(
          `************** Updated mapZoom = ${this.state.zoom}`
        ); */
      });
    }
  };

  // render the markers to the map as part of a layergroup.  Use
  // clustering if
  renderMarkers = () => {
    if (this.state.loaded) {
      if (this.state.useMarkerClustering) {
        return (
          <LayerGroup>
            <MarkerClusterGroup>
              {this.state.markers.map(marker => {
                if (marker.id !== 'ownPositionMarker') {
                  return (
                    <Marker
                      key={marker.id}
                      position={marker.coords}
                      icon={marker.divIcon}
                      onClick={() => {
                        this.onMapEvent('onMapMarkerClicked', {
                          id: marker.id,
                        });
                      }}
                    >
                      {marker.title && <Popup>{marker.title}</Popup>}
                    </Marker>
                  );
                } else {
                  return null;
                }
              })}
            </MarkerClusterGroup>
            {this.state.markers.map(marker => {
              if (marker.id === 'ownPositionMarker') {
                return (
                  <Marker
                    key={marker.id}
                    position={marker.coords}
                    icon={marker.divIcon}
                    onClick={() => {
                      this.onMapEvent('onMapMarkerClicked', {
                        id: marker.id,
                      });
                    }}
                  >
                    {marker.title && <Popup>{marker.title}</Popup>}
                  </Marker>
                );
              } else {
                return null;
              }
            })}
          </LayerGroup>
        );
      } else {
        return (
          <LayerGroup>
            {this.state.markers.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  position={marker.coords}
                  icon={marker.divIcon}
                  onClick={() => {
                    this.onMapEvent('onMapMarkerClicked', {
                      id: marker.id,
                    });
                  }}
                >
                  {marker.title && <Popup>{marker.title}</Popup>}
                </Marker>
              );
            })}
          </LayerGroup>
        );
      }
    } else {
      return null;
    }
  };

  renderGeometryLayers = () => {
    if (this.state.loaded) {
      return (
        <LayerGroup>
          {this.state.geometryLayers.map(layer => {
            return (
              <Polygon
                key={layer.id}
                color={layer.color || 'white'}
                positions={layer.coords}
              />
            );
          })}
        </LayerGroup>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.StrictMode>
        <React.Fragment>
          {this.state.mapLayers.length < 1 ? (
            <div>waiting on map layers</div>
          ) : (
            <Map
              style={{
                width: '100%',
                backgroundColor: 'lightblue',
              }}
              ref={this.mapRef}
              center={this.state.centerPosition}
              attributionControl={this.state.showAttributionControl}
              zoomControl={this.state.showZoomControl}
              panToLocation={this.state.panToLocation}
              maxZoom={18}
              zoom={this.state.zoom}
              bounds={this.state.bounds}
              boundsOptions={this.state.boundsOptions}
              whenReady={() => {
                this.setState({ loaded: true });
                this.printElement(`******* map loaded *******`);
              }}
              onClick={event => {
                this.onMapEvent('onMapClicked', {
                  coords: [event.latlng.lat, event.latlng.lng],
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
                this.onMapEvent('onZoom', null);
              }}
              onMove={() => {
                this.onMapEvent('onMove', null);
              }}
              onZoomEnd={() => {
                this.onMapEvent('onZoomEnd', null);
              }}
              onMoveEnd={() => {
                this.onMapEvent('onMoveEnd', null);
              }}
              onUnload={() => {
                this.onMapEvent('onUnload', null);
              }}
              onViewReset={() => {
                this.onMapEvent('onViewReset', null);
              }}
            >
              {this.state.mapLayers.length <= 1 ? (
                <RasterLayer layer={this.state.mapLayers[0]} />
              ) : (
                <LayersControl position="topright">
                  <ControlsLayer mapLayers={this.state.mapLayers} />
                </LayersControl>
              )}
              <LayersControl position="topleft">
                <LayersControl.Overlay name="Markers" checked="true">
                  {this.renderGeometryLayers()}
                  {this.renderMarkers()}
                </LayersControl.Overlay>
              </LayersControl>
            </Map>
          )}
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
                zIndex: 15000,
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
      </React.StrictMode>
    );
  }
}

export default mapComponent;
