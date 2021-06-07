# expo-leaflet

A [Leaflet](https://leafletjs.com) map component with no native code

## Installation

```sh
expo install expo-asset expo-file-system react-native-webview
```

If you want web support you also need to 

```sh
npm install --save react-measure
```

Then:

```sh
npm install --save expo-leaflet
```

## Usage

and import like so

```ts
import { ExpoLeaflet } from "expo-leaflet";
```

### Example Marker

```ts
let marker = {
  id: '1',
  coords: { lat: 36.00, lng: -76.00 },
  icon: "<div>❤️</div>",
  size: [24, 24]
}
```

After loading, the map expects to receive an array of map layer information objects. A sample object showing
a [MapBox](https://www.mapbox.com/) tile layer is shown below.

```javascript
let mapLayer = {
  baseLayerName: 'OpenStreetMap',  // This will be seen in the layer selection control
  baseLayerIsChecked: 'true',  // If the layer is selected in the layer selection control
  layerType: 'TileLayer', 
  baseLayer: true,
  url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  attribution:
    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
}
```

### Creating Map Markers

```javascript
let marker = {
  id: '1', // The ID attached to the marker. It will be returned when onMarkerClicked is called
  position: {
    lat: 52.1,
    lng: 2.3,
  },
  // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
  icon: '<span>🍇</span>',
  size: [32, 32],
}
```

### Adding Leaflet Geometry Layers to the Map

A geometry layer can be added to the may by following the example below:

```javascript
let mapShapes = [
  {
    shapeType: 'Circle',
    color: "#123123",
    id: "1",
    center: { lat: 34.225727, lng: -77.94471 },
    radius: 2000
  }
]

```

## LICENSE

MIT
