import { MapVectorLayer } from '.';
import { MapRasterLayer } from '.';
import { MapMarker } from '.';
import { NativeSyntheticEvent } from 'react-native';
import { LatLng } from 'leaflet';
import React from 'react';
import { WebviewLeafletMessage } from 'react-native-webview-leaflet';
import { WebViewError } from 'react-native-webview/lib/WebViewTypes';

// Type definitions for react-native-webivew-leaflet
// Project: react-native-webview-leaflet
// Definitions by: Reginald Johnson https://

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace ReactNativeWebViewLeaflet;

export interface WebViewLeafletProps extends React.Props<WebViewLeaflet> {
  backgroundColor?: string;
  doShowDebugMessages?: boolean;
  loadingIndicator?: () => React.ReactElement;
  onError?: (syntheticEvent: NativeSyntheticEvent<WebViewError>) => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
  onMessageReceived: (message: WebviewLeafletMessage) => void;
  vectorLayers?: MapVectorLayer[];
  rasterLayers?: MapRasterLayer[];
  mapMarkers?: MapMarker[];
  mapCenterCoords?: LatLng;
}

declare class WebViewLeaflet extends React.Component<
  WebViewLeafletProps,
  any
> {}

export { default as WebViewLeaflet } from './WebViewLeaflet';
export {
  AnimationType,
  MapComponentMessages,
  MapEvent,
  MapMarkerAnimation,
  MapMarker,
  MapLayer,
  MapVectorLayer,
  MapVectorLayerCircle,
  MapVectorLayerCircleMarker,
  MapVectorLayerPolyline,
  MapVectorLayerPolygon,
  MapVectorLayerRectangle,
  MapVectorLayerType,
  MapRasterLayer,
  MapLayerTypes,
  MapStartupMessage,
  WebViewLeafletLatLng,
  WebviewLeafletMessage
} from './models';
