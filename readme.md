# React Native Webview Leaflet V6

[![npm](https://img.shields.io/npm/v/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/dm/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/dt/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/l/react-native-webview-leaflet.svg)](https://github.com/react-native-component/react-native-webview-leaflet/blob/master/LICENSE)

## A Leaflet map component with no native code for React Native applications

[![Alt text](https://img.youtube.com/vi/Jpo-Mg3BSVk/0.jpg)](https://www.youtube.com/watch?v=Jpo-Mg3BSVk)

## Installation

Install using npm or yarn like this:

```sh
npm install --save react-native-webview-leaflet
```

or

```sh
yarn add react-native-webview-leaflet
```

## Usage

and import like so

```javascript
import { WebViewLeaflet } from "react-native-leaflet-webview";
```

### Example Marker

```javascript
let marker = {
    id: '1',
    coords: { lat: 36.00, lng, - 76.00
  },
  icon: "❤️",
  size: [24, 24],
  animation: {
    name: AnimationType.BOUNCE,
    duration: ".5",
    delay: 0,
    interationCount: INFINITE_ANIMATION_ITERATIONS
  }
}
```

After loading, the map expects to receive an array of map layer information objects. A sample object showing
a [MapBox](https://www.mapbox.com/) tile layer is shown below.

```javascript
  let mapLayer = {
  baseLayerName: 'OpenStreetMap',  // the name of the layer, this will be seen in the layer selection control
  baseLayerIsChecked: 'true',  // if the layer is selected in the layer selection control
  layerType: 'TileLayer',  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
  baseLayer: true,
  // url of tiles
  url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  // attribution string to be shown for this layer
  attribution:
    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
}
```

### Types of Layers

```ts
export enum MapLayerType {
  IMAGE_LAYER = "ImageOverlay",
  TILE_LAYER = "TileLayer",
  VECTOR_LAYER = "VectorLayer",
  VIDEO_LAYER = "VideoOverlay",
  WMS_TILE_LAYER = "WMSTileLayer"
}
```

### Creating Map Markers

```javascript
{
  id: uuidV1(), // The ID attached to the marker. It will be returned when onMarkerClicked is called
    position
:
  {
    lat: [LATITTUDE], lng
  :
    [LONGITUDE]
  }
, // Latitude and Longitude of the marker
  icon: '🍇', // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
    size
:
  [32, 32],
    animation
:
  {
    duration: getDuration(),
      delay
  :
    getDelay(),
      iterationCount,
      type
  :
    AnimationType.BOUNCE
  }
}
```

### Adding Leaflet Geometry Layers to the Map

Thanks to @gotoglup for the PR adding leaflet geometry layers. A geometry layer can be added to the may by following the
example below:

```javascript
mapShapes = {
  [
    {
      shapeType: MapShapeType.CIRCLE,
      color: "#123123",
      id: "1",
      center: { lat: 34.225727, lng: -77.94471 },
      radius: 2000
    }
    ]
}
```

### Available Animations

Marker animations can be specified by setting the animation.type of the marker object to an AnimationType enum. Values
for AnimationType can be found in the models.ts file in the WebViewLeaflet directory of this project.

### Animation Information

Animations are kept in the
file [markers.css](https://github.com/reggie3/react-native-webview-leaflet/blob/master/web/markers.css) They are just
keyframe animations like this:

```javascript
@keyframes
spin
{
  50 % {
    transform: rotateZ(-20deg
)
  ;
  animation - timing - function: ease;
}
  100 % {
    transform: rotateZ(360deg
)
  ;
}
}
```

```
## Changelog

### 6.0.0

* Web support

### 4.5.0

* Removed Expo dependencies from the library and added polygons vectors (Thanks @gutoglup - https://github.com/gutoglup)

### 4.3.1

* Fixed issue with using expo-asset-utils that prevented this package from working with iOS apps in simulator

### 4.2.0

* Replace Expo dependency with expo-asset-utils
* Fixed bug that caused map to not display when no ownPositionMarker was provided

### 4.1.15

* Keep own position marker from being clustered

### 4.1.0

* Added optional marker clustering using react-leaflet-markercluster
* Update preview video in readme

### 4.0.0

* Fixed map centering, and map centering button (see issue #36(https://github.com/reggie3/react-native-webview-leaflet/issues/36) )
#### BREAKING CHANGES:
* Center map on own current location button defaults to not being shown
* Center map on own current location button requires that a "ownPositionMarker" object be passed to the WebViewLeaflet component
* WebViewLeaflet component requires a "centerPosition" prop for initial centering
* Map tile Layers are now passed as props to the WebViewLeaflet component


### 3.1.45

* Works in production APK files.
* Renders http images as map icons.

### 3.0.0

* Introduced user specified tile layers.

### 2.0.0

* Initial release of version 2 built on React-Leaflet

### 5.0.0

* Add TypeScript support
* Switch to react-native-community/react-native-webview implementation
* Add ability to draw shapes on the map (Leaflet vector layers)
* Display map layer vector icons
* Simplify event communication

## LICENSE

MIT
```
