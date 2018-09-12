# React Native Webview Leaflet

## A Leaflet map component with no native code for React Native applications

### ⚠️ This is version 2 of this library.  Its API includes breaking changes from version 1.  Version 1 can be found in the version 1 branch

#### Difference Between Versions

Version 2 is built on top of [react-leaflet](https://github.com/PaulLeCam/react-leaflet) Version 2, while the previous version interfaced directly with the Leaflet.js library.  This version implements a simpler process for adding the map component to your applications while building on top of react-leaflet's proven stability.

### Why Use This Library

This component is useful if you want to display HTML elements on an interactive map. Since the elements are just HTML items, you can use SVG's, emojis, text, images, etc., and they can even be animated, updated, and changed as required.

### Why Not Use This Library

You may not want to use this library if you'd rather use Google map tiles and data or the tiles and map data from Open Street Maps.

[![npm](https://img.shields.io/npm/v/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/dm/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/dt/react-native-webview-leaflet.svg)](https://www.npmjs.com/package/react-native-webview-leaflet)
[![npm](https://img.shields.io/npm/l/react-native-webview-leaflet.svg)](https://github.com/react-native-component/react-native-webview-leaflet/blob/master/LICENSE)

![Image](https://thumbs.gfycat.com/CraftyKnobbyApe-size_restricted.gif)

## Example

A working example of this library is in the App.js file included in the root of this repository.

## Installation

Install using npm or yarn like this:

```javascript
npm install --save react-native-webview-leaflet
```

or

```javascript
yarn add react-native-webview-leaflet
```

## Usage

and import like so

```javascript
import WebViewLeaflet from 'react-native-webview-leaflet';
```

Add the following component to your code.

```javascript
<WebViewLeaflet
  // get a reference to the web view so that messages can be sent to the map
  ref={(component) => (this.webViewLeaflet = component)}

  // the component that will receive map events
  eventReceiver={this}  
/>
```

### Communicating with the map

#### Listening for Events

This library supports map clicked, map marker clicked, and the map events that are exposed by Leaflet.  

##### Map Clicked and Map Marker Clicked Events

To receive map clicked and on map marker clicked events, add the following functions to the component that contains the WebViewLeaflet.

```javascript
onMapClicked = ({ payload }) => {
  console.log(`Map Clicked: app received: ${payload.coords}`);
  this.showAlert('Map Clicked', `Coordinates = ${payload.coords}`);
};

onMapMarkerClicked = ({ payload }) => {
  console.log(`Marker Clicked: ${payload.id}`);
  this.showAlert('Marker Clicked', `Marker ID = ${payload.id}`);
};
```

##### Leaflet Map Events

To react to leaflet map events, you need to create functions in your component to handle them. These functions' names must be camelCased and prefixed by 'on'.
For example, to listen for the `zoomlevelschange` event, you will need to create a function
called `onZoomLevelsChange`. These functions will receive the following object

```javascript
{
  center,   // center of the map
  bounds,   // the bounds of the map
  zoom      // the zoom level of the map
}
```

### Sending Events to the Map

The map can be be updated by sending messages from your component to the  WebViewLeaflet component via its reference like so:

```javascript
this.webViewLeaflet.sendMessage({
  zoom: 6,
  locations: this.state.locations,  // an array of locations
  showAttributionControl: this.state.mapState.showAttributionControl, // a boolean controlling whether the map displays its attribution control
  showZoomControl: this.state.mapState.showZoomControl // a boolean controlling whether the map displays its zoom control
});
```

A [react-leaflet](https://react-leaflet.js.org/en/) component makes up the map that is rendered by `WebViewLeaflet`.  This allows messages like the one above to be used to directly set values in the map's state.

### Creating Map Markers

The map builds and displays its markers based on the value of the `locations` key in its own state.  You can update the value of its `locations` by sending a message containing an object containing a key of `locations` and a value that is an array of location objects like the one shown below. An example of such a call and a location object is show below.

```javascript
// sending locations to the map
this.webViewLeaflet.sendMessage({
  locations: [
  ...this.state.locations]
})
```

```javascript
// a location object
{
  id: uuidV1(), // The ID attached to the marker. It will be returned when onMarkerClicked is called
  coords: [LATITUDE, LONGITUDE], // Latitude and Longitude of the marker
  icon: '🍇', // HTML element that will be displayed as the marker.  It can also be text or an SVG string.

  // The child object, "animation", controls the optional animation that will be attached to the marker.
  // See below for a list of available animations
  animation: {
    name: animations[Math.floor(Math.random() * animations.length)],
    duration: Math.floor(Math.random() _ 3) + 1,
    delay: Math.floor(Math.random()) _ 0.5,
    interationCount
  }
  // optional size for this individual icon
  // will default to the WebViewLeaflet `defaultIconSize` property if not provided
  size: [64, 64],
}
```

### Available Animations

Animations for "bounce", "fade", "pulse", "jump", "waggle", "spin", and "beat" can be specified in the animation.name property of an individual location.

### Animation Information

Animations are kept in the file [markers.css](https://github.com/reggie3/react-native-webview-leaflet/blob/master/web/markers.css)  They are just keyframe animations like this:

```javascript
@keyframes spin {
  50% {
    transform: rotateZ(-20deg);
    animation-timing-function: ease;
  }
  100% {
    transform: rotateZ(360deg);
  }
}
```

## Changelog

### 2.0.0

* Initial release of version 2

## LICENSE

MIT
