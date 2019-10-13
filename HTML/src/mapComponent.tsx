import * as React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Polygon,
  withLeaflet
} from 'react-leaflet';
import { DivIcon, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import {
  WebviewLeafletMessage,
  MapMarker,
  MapMarkerAnimation,
  MapEvents,
  MapLayerTypes
} from '../../WebViewLeaflet/models';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ControlsLayer from './ControlsLayer';
import RasterLayer from './RasterLayer';
import L = require('leaflet');
import base64Image from './webBase64Image';
import mockMapLayers from './mockMapLayers';
import mockMapMarkers from './mockMapMarkers';
import { MapLayer } from '../../WebViewLeaflet/models';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import './markers.css';

require('react-leaflet-markercluster/dist/styles.min.css');
const util = require('util');

export enum MapComponentMessages {
  MAP_COMPONENT_MOUNTED = 'MAP_COMPONENT_MOUNTED',
  DOCUMENT_EVENT_LISTENER_ADDED = 'DOCUMENT_EVENT_LISTENER_ADDED',
  WINDOW_EVENT_LISTENER_ADDED = 'WINDOW_EVENT_LISTENER_ADDED',
  UNABLE_TO_ADD_EVENT_LISTENER = 'UNABLE_TO_ADD_EVENT_LISTENER',
  DOCUMENT_EVENT_LISTENER_REMOVED = 'DOCUMENT_EVENT_LISTENER_REMOVED',
  WINDOW_EVENT_LISTENER_REMOVED = 'WINDOW_EVENT_LISTENER_REMOVED'
}

interface State {
  geometryLayers: any[];
  boundsOptions: any;
  bounds: any;
  panToLocation: any;
  showZoomControl: boolean;
  showAttributionControl: boolean;
  centerPosition: LatLngExpression;
  debugMessages: string[];
  isLoaded: boolean;
  lat: number;
  lng: number;
  mapLayers: MapLayer[];
  mapMarkers: MapMarker[];

  ownPositionMarker: MapMarker;
  useMarkerClustering: boolean;
  zoom: number;
}

interface Props {}
const SHOW_DEBUG_INFORMATION = true;
const ENABLE_BROWSER_TESTING = true;

class MapComponent extends React.Component<Props, State> {
  state: State;
  private mapRef: any = React.createRef<Map>();
  constructor(props: Props) {
    super(props);
    this.state = {
      boundsOptions: null,
      bounds: null,
      centerPosition: null,
      debugMessages: ['test'],
      isLoaded: false,
      lat: 51.505,
      lng: -0.09,
      mapLayers: [],
      mapMarkers: [],
      ownPositionMarker: null,
      panToLocation: null,
      showZoomControl: false,
      showAttributionControl: false,
      useMarkerClustering: true,
      zoom: 13
    };
    console.log('Here');
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    this.setState(
      { debugMessages: [...this.state.debugMessages, 'componentDidMount'] },
      () => {
        try {
          this.sendMessage({
            msg: 'MAP_COMREADY'
          });
        } catch (error) {
          this.addDebugMessage(error);
        }

        if (document) {
          document.addEventListener('message', this.handleMessage), false;
          this.addDebugMessage('set document listeners');
          this.sendMessage({
            msg: 'DOCUMENT_EVENT_LISTENER_ADDED'
          });
        }
        if (window) {
          window.addEventListener('message', this.handleMessage);
          this.addDebugMessage('setting Window');
          this.sendMessage({
            msg: 'WINDOW_EVENT_LISTENER_ADDED'
          });
        }
        if (!document && !window) {
          this.sendMessage({
            error: 'UNABLE_TO_ADD_EVENT_LISTENER'
          });
          return;
        }
      }
    );

    if (ENABLE_BROWSER_TESTING) {
      this.setupBrowserTesting();
    }
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    const { debugMessages } = this.state;
    if (debugMessages !== prevState.debugMessages) {
      console.log(debugMessages);
    }
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('message', this.handleMessage);
      this.sendMessage({
        msg: 'DOCUMENT_EVENT_LISTENER_REMOVED'
      });
    } else if (window) {
      window.removeEventListener('message', this.handleMessage);
      this.sendMessage({
        msg: 'WINDOW_EVENT_LISTENER_REMOVED'
      });
    }
  };

  private addDebugMessage = (msg) => {
    if (typeof msg === 'object') {
      this.addDebugMessage('STRINGIFIED');
      this.setState({
        debugMessages: [
          ...this.state.debugMessages,
          JSON.stringify(msg, null, 4)
        ]
      });
    } else {
      this.setState({ debugMessages: [...this.state.debugMessages, msg] });
    }
  };

  private createDivIcon = (mapMarker: MapMarker): DivIcon => {
    let divIcon: DivIcon = L.divIcon({
      className: 'clearMarkerContainer',
      html: mapMarker.animation
        ? this.getAnimatedHTMLString(
            mapMarker.icon || '📍',
            mapMarker.animation || null,
            mapMarker.size || [24, 24]
          )
        : this.getUnanimatedHTMLString(mapMarker.icon, mapMarker.size),
      iconAnchor: mapMarker.iconAnchor || null
    });
    return divIcon;
  };

  /*
  Get the HTML string containing the icon div, and animation parameters
  */
  private getAnimatedHTMLString = (
    icon,
    animation: MapMarkerAnimation,
    size: L.PointExpression = [24, 24]
  ) => {
    return `<div class='animationContainer' style="
    animation-name: ${animation.name ? animation.name : 'bounce'}; 
    animation-duration: ${animation.duration ? animation.duration : 1}s ;
    animation-delay: ${animation.delay ? animation.delay : 0}s;
    animation-direction: ${
      animation.direction ? animation.direction : 'normal'
    };
    animation-iteration-count: ${
      animation.iterationCount ? animation.iterationCount : 'infinite'
    }">
    ${this.getIconFromEmojiOrImageOrSVG(icon, size)}
    </div>`;
  };

  private getUnanimatedHTMLString = (
    icon,
    size: L.PointExpression = [24, 24]
  ): string => {
    return `<div class='unanimatedIconContainer' >
    ${this.getIconFromEmojiOrImageOrSVG(icon, size)}
    </div>`;
  };

  private getIconFromEmojiOrImageOrSVG = (icon, size: L.PointExpression) => {
    if (icon.includes('svg') || icon.includes('SVG')) {
      return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
    ${icon}
    </div>`;
    } else if (icon.includes('//') || icon.includes('base64')) {
      return `<img src="${base64Image}" style="width:${size[0]}px;height:${size[1]}px;">`;
    } else {
      return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
  ${icon}
  </div>`;
    }
  };
  private handleMessage = (event) => {
    try {
      this.setState({ ...this.state, ...event.data });
    } catch (error) {
      this.addDebugMessage({ error: JSON.stringify(error) });
    }
  };

  protected sendMessage = (message: WebviewLeafletMessage) => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      console.log('sendMessage  ', JSON.stringify(message));
    }
  };

  private onMapEvent = (event: MapEvents, payload?: any) => {
    // build a payload if one is not provided
    try {
      const mapProps = this.mapRef.current.props;
      const mapCenterPosition: LatLngExpression = [
        this.mapRef.current.leafletElement.getCenter().lat,
        this.mapRef.current.leafletElement.getCenter().lng
      ];

      const mapBounds = mapProps.bounds;
      const mapZoom = this.mapRef.current.leafletElement.getZoom();

      if (!payload) {
        payload = {
          center: mapCenterPosition,
          bounds: mapBounds,
          zoom: mapZoom
        };
      }
      this.printElement(
        `onMapEvent: event = ${event}, payload = ${JSON.stringify(payload)}`
      );

      this.sendMessage({
        event,
        payload
      });

      // update the map's center in state if it has moved
      // The map's center in state (centerPosition) is used by react.leaflet
      // to center the map.  Centering the map component on the actual
      // map center will allow us to recenter the map by updating the centerPosition
      // item in state ourself
      if (event === MapEvents.ON_MOVE_END) {
        this.setState({ centerPosition: mapCenterPosition }, () => {
          /*  this.printElement(
          `************** Updated centerPosition = ${this.state.centerPosition}`
        ); */
        });
      }
      if (event === MapEvents.ON_ZOOM_END) {
        this.setState({ zoom: mapZoom }, () => {
          /*  this.printElement(
          `************** Updated mapZoom = ${this.state.zoom}`
        ); */
        });
      }
    } catch (error) {
      console.warn('ERROR onMapEvent', error);
    }
  };

  // print passed information in an html element; useful for debugging
  // since console.log and debug statements won't work in a conventional way
  private printElement = (data) => {
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

  private renderGeometryLayers = () => {
    const geometryLayers = this.state.mapLayers.filter(
      (mapLayers) => mapLayers.type === MapLayerTypes.GEOMETRY_LAYER
    );
    return (
      <LayerGroup>
        {geometryLayers.map((mapLayer) => {
          return (
            <Polygon
              key={mapLayer.id}
              color={mapLayer.color || 'white'}
              positions={mapLayer.coords}
            />
          );
        })}
      </LayerGroup>
    );
  };

  // render the markers to the map as part of a layergroup.  Use
  // clustering if enabled
  private renderMarkers = () => {
    if (this.state.isLoaded) {
      if (this.state.useMarkerClustering) {
        return (
          <LayerGroup>
            <MarkerClusterGroup>
              {this.state.mapMarkers.map((mapMarker) => {
                if (mapMarker.id !== 'ownPositionMarker') {
                  return (
                    <Marker
                      key={mapMarker.id}
                      position={mapMarker.coords}
                      icon={this.createDivIcon(mapMarker)}
                      onClick={() => {
                        this.onMapEvent(MapEvents.ON_MAP_MARKER_CLICKED, {
                          id: mapMarker.id
                        });
                      }}
                    >
                      {mapMarker.title && <Popup>{mapMarker.title}</Popup>}
                    </Marker>
                  );
                } else {
                  return null;
                }
              })}
            </MarkerClusterGroup>
            {this.state.mapMarkers.map((mapMarker) => {
              if (mapMarker.id === 'ownPositionMarker') {
                return (
                  <Marker
                    key={mapMarker.id}
                    position={mapMarker.coords}
                    icon={this.createDivIcon(mapMarker)}
                    onClick={() => {
                      this.onMapEvent(MapEvents.ON_MAP_MARKER_CLICKED, {
                        id: mapMarker.id
                      });
                    }}
                  >
                    {mapMarker.title && <Popup>{mapMarker.title}</Popup>}
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
            {this.state.mapMarkers.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  position={marker.coords}
                  icon={marker.divIcon}
                  onClick={() => {
                    this.onMapEvent(MapEvents.ON_MAP_MARKER_CLICKED, {
                      id: marker.id
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

  private setupBrowserTesting = () => {
    this.setState({
      mapMarkers: mockMapMarkers as MapMarker[],
      ownPositionMarker: {
        coords: this.state.centerPosition,
        icon: '🎃',
        size: [24, 24],
        animation: {
          name: 'pulse',
          duration: '.5',
          delay: 0,
          iterationCount: 'infinite'
        }
      },
      mapLayers: mockMapLayers,
      useMarkerClustering: true
    });

    setTimeout(() => {
      this.setState({
        bounds: [
          [36.8859965, -76.4096793],
          [39.07467659353497, -76.91253011988012]
        ],
        boundsOptions: { padding: [0, 0] }
      });
    }, 5000);
  };

  render() {
    return (
      <React.StrictMode>
        <>
          {this.state.mapLayers.length < 1 ? (
            <div>waiting on map layers</div>
          ) : (
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
              maxZoom={18}
              zoom={this.state.zoom}
              bounds={this.state.bounds}
              boundsOptions={this.state.boundsOptions}
              whenReady={() => {
                this.setState({ isLoaded: true });
                this.printElement(`******* map loaded *******`);
              }}
              onClick={(event: LeafletMouseEvent) => {
                this.onMapEvent(MapEvents.ON_MAP_CLICKED, {
                  coords: [event.latlng.lat, event.latlng.lng]
                });
              }}
              onZoomLevelsChange={() => {
                this.onMapEvent(MapEvents.ON_ZOOM_LEVELS_CHANGE);
              }}
              onResize={() => {
                this.onMapEvent(MapEvents.ON_RESIZE);
              }}
              onZoomStart={() => {
                this.onMapEvent(MapEvents.ON_ZOOM_START);
              }}
              onMoveStart={() => {
                this.onMapEvent(MapEvents.ON_MOVE_START);
              }}
              onZoom={() => {
                this.onMapEvent(MapEvents.ON_ZOOM);
              }}
              onMove={() => {
                this.onMapEvent(MapEvents.ON_MOVE);
              }}
              onZoomEnd={() => {
                this.onMapEvent(MapEvents.ON_ZOOM_END);
              }}
              onMoveEnd={() => {
                this.onMapEvent(MapEvents.ON_MOVE);
              }}
              onUnload={() => {
                this.onMapEvent(MapEvents.ON_UNLOAD);
              }}
              onViewReset={() => {
                this.onMapEvent(MapEvents.ON_VIEW_RESET);
              }}
            >
              {this.state.mapLayers.length === 1 ? (
                <RasterLayer layer={this.state.mapLayers[0]} />
              ) : (
                <LayersControl position="topright">
                  <ControlsLayer mapLayers={this.state.mapLayers} />
                </LayersControl>
              )}
              {this.state.isLoaded && (
                <LayersControl position="topleft">
                  <LayersControl.Overlay name="Markers" checked={true}>
                    {this.renderGeometryLayers()}
                    {this.renderMarkers()}
                  </LayersControl.Overlay>
                </LayersControl>
              )}
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
        </>
      </React.StrictMode>
    );
  }
}

export default withLeaflet(MapComponent);
