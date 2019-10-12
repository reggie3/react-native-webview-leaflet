import * as React from 'react';
import { Map, TileLayer, Marker, Popup } from '../node_modules/react-leaflet';
import { LatLngExpression } from '../node_modules/leaflet';
import { WebviewLeafletMessage } from '../../WebViewLeaflet/models';
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
  debugMessages: string[];
  lat: number;
  lng: number;
  zoom: number;
}

interface Props {}
const SHOW_DEBUG_INFORMATION = false;
const ENABLE_BROWSER_TESTING = false;

class MapComponent extends React.Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      debugMessages: ['test'],
      lat: 51.505,
      lng: -0.09,
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

  protected addDebugMessage = (msg) => {
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

  protected handleMessage = (event) => {
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
    }
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

  render() {
    const position = [this.state.lat, this.state.lng] as LatLngExpression;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: 'auto',
          background: 'yellow'
        }}
      >
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default MapComponent;
