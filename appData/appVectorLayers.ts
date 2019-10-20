import { LatLng, LatLngBounds } from 'leaflet';
import {
  MapVectorLayerCircle,
  MapVectorLayerType,
  MapVectorLayerCircleMarker,
  MapVectorLayerPolygon,
  MapVectorLayerPolyline,
  MapVectorLayerRectangle
} from '../WebViewLeaflet/types';

const CENTER_LAT: number = 51.505;
const CENTER_LNG: number = -0.09;

const circle: MapVectorLayerCircle = {
  type: MapVectorLayerType.CIRCLE,
  color: '#123123',
  id: 1,
  center: new LatLng(34.225727, -77.94471),
  radius: 2000
};

const circleMarker: MapVectorLayerCircleMarker = {
  type: MapVectorLayerType.CIRCLE_MARKER,
  color: 'red',
  id: 2,
  center: new LatLng(38.437424, -78.867912),
  radius: 15
};
const polygon: MapVectorLayerPolygon = {
  type: MapVectorLayerType.POLYGON,
  color: 'blue',
  id: 3,
  positions: [
    new LatLng(38.80118939192329, -74.69604492187501),
    new LatLng(38.19502155795575, -74.65209960937501),
    new LatLng(39.07890809706475, -71.46606445312501)
  ]
};
const multiPolygon: MapVectorLayerPolygon = {
  type: MapVectorLayerType.POLYGON,
  color: 'violet',
  id: 4,
  positions: [
    [
      new LatLng(37.13842453422676, -74.28955078125001),
      new LatLng(36.4433803110554, -74.26208496093751),
      new LatLng(36.43896124085948, -73.00964355468751),
      new LatLng(36.43896124085948, -73.00964355468751)
    ],
    [
      new LatLng(37.505368263398104, -72.38891601562501),
      new LatLng(37.309014074275915, -71.96594238281251),
      new LatLng(36.69044623523481, -71.87805175781251),
      new LatLng(36.58024660149866, -72.75146484375001),
      new LatLng(37.36579146999664, -72.88330078125001)
    ]
  ]
};

const polyline: MapVectorLayerPolyline = {
  type: MapVectorLayerType.POLYLINE,
  color: 'orange',
  id: 5,
  positions: [
    new LatLng(35.411438052435486, -78.67858886718751),
    new LatLng(35.9602229692967, -79.18945312500001),
    new LatLng(35.97356075349624, -78.30505371093751)
  ]
};

const multiPolyline: MapVectorLayerPolyline = {
  type: MapVectorLayerType.POLYLINE,
  color: 'purple',
  id: '5a',
  positions: [
    [
      new LatLng(36.36822190085111, -79.26086425781251),
      new LatLng(36.659606226479696, -79.28833007812501),
      new LatLng(36.721273880045004, -79.81018066406251)
    ],
    [
      new LatLng(35.43381992014202, -79.79370117187501),
      new LatLng(35.44277092585766, -81.23840332031251),
      new LatLng(35.007502842952896, -80.837402343750017)
    ]
  ]
};
const rectangle: MapVectorLayerRectangle = {
  type: MapVectorLayerType.RECTANGLE,
  color: 'yellow',
  id: 6,
  bounds: new LatLngBounds(new LatLng(51.49, -0.08), new LatLng(51.5, -0.06))
};

const mapVectorLayers: (
  | MapVectorLayerCircle
  | MapVectorLayerCircleMarker
  | MapVectorLayerPolyline
  | MapVectorLayerPolygon
  | MapVectorLayerRectangle)[] = [
  circle,
  circleMarker,
  polygon,
  multiPolygon,
  polyline,
  multiPolyline,
  rectangle
];

export default mapVectorLayers;
