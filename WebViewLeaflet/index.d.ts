import React from "react";
import { WebViewError } from "react-native-webview/lib/WebViewTypes";

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

export {
  default as WebViewLeaflet,
  WebViewLeafletProps
} from "./WebViewLeaflet";
export {
  LatLng,
  Point,
  LatLngBounds,
  AnimationDirection,
  AnimationType,
  INFINITE_ANIMATION_ITERATIONS,
  WebViewLeafletEvents,
  MapMarkerAnimation,
  MapMarker,
  MapLayer,
  MapLayerType,
  MapShapeType,
  WebviewLeafletMessage
} from "./models";
