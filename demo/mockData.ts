import { LatLng, LatLngLiteral } from 'leaflet'
import {
  AnimationType,
  MapMarker,
  MapShape,
  MapShapeType,
} from 'react-native-leaflet-webview'

export const circle: MapShape = {
  shapeType: MapShapeType.CIRCLE,
  color: '#123123',
  id: '1',
  center: { lat: 34.225727, lng: -77.94471 },
  radius: 2000,
}

export const circleMarker: MapShape = {
  shapeType: MapShapeType.CIRCLE_MARKER,
  color: 'red',
  id: '2',
  center: { lat: 38.437424, lng: -78.867912 },
  radius: 15,
}

export const polygon: MapShape = {
  shapeType: MapShapeType.POLYGON,
  color: 'blue',
  id: '3',
  positions: [
    { lat: 38.80118939192329, lng: -74.69604492187501 },
    { lat: 38.19502155795575, lng: -74.65209960937501 },
    { lat: 39.07890809706475, lng: -71.46606445312501 },
  ],
}

export const multiPolygon: MapShape = {
  shapeType: MapShapeType.POLYGON,
  color: 'violet',
  id: '4',
  positions: [
    [
      { lat: 37.13842453422676, lng: -74.28955078125001 },
      { lat: 36.4433803110554, lng: -74.26208496093751 },
      { lat: 36.43896124085948, lng: -73.00964355468751 },
      { lat: 36.43896124085948, lng: -73.00964355468751 },
    ],
    [
      { lat: 37.505368263398104, lng: -72.38891601562501 },
      { lat: 37.309014074275915, lng: -71.96594238281251 },
      { lat: 36.69044623523481, lng: -71.87805175781251 },
      { lat: 36.58024660149866, lng: -72.75146484375001 },
      { lat: 37.36579146999664, lng: -72.88330078125001 },
    ],
  ],
}

export const polyline: MapShape = {
  shapeType: MapShapeType.POLYLINE,
  color: 'orange',
  id: '5',
  positions: [
    { lat: 35.411438052435486, lng: -78.67858886718751 },
    { lat: 35.9602229692967, lng: -79.18945312500001 },
    { lat: 35.97356075349624, lng: -78.30505371093751 },
  ],
}

export const multiPolyline: MapShape = {
  shapeType: MapShapeType.POLYLINE,
  color: 'purple',
  id: '5a',
  positions: [
    [
      { lat: 36.36822190085111, lng: -79.26086425781251 },
      { lat: 36.659606226479696, lng: -79.28833007812501 },
      { lat: 36.721273880045004, lng: -79.81018066406251 },
    ],
    [
      { lat: 35.43381992014202, lng: -79.79370117187501 },
      { lat: 35.44277092585766, lng: -81.23840332031251 },
      { lat: 35.007502842952896, lng: -80.837402343750017 },
    ],
  ],
}

export const rectangle: MapShape = {
  shapeType: MapShapeType.RECTANGLE,
  color: 'yellow',
  id: '6',
  bounds: [
    [36.5, -75.7],
    [38.01, -73.13],
  ],
}

export const mapShapes: Array<MapShape> = [
  {
    shapeType: MapShapeType.CIRCLE,
    color: '#123123',
    id: '1',
    center: { lat: 34.225727, lng: -77.94471 },
    radius: 2000,
  },
  {
    shapeType: MapShapeType.CIRCLE_MARKER,
    color: 'red',
    id: '2',
    center: { lat: 38.437424, lng: -78.867912 },
    radius: 15,
  },
  {
    shapeType: MapShapeType.POLYGON,
    color: 'blue',
    id: '3',
    positions: [
      { lat: 38.80118939192329, lng: -74.69604492187501 },
      { lat: 38.19502155795575, lng: -74.65209960937501 },
      { lat: 39.07890809706475, lng: -71.46606445312501 },
    ],
  },
  {
    shapeType: MapShapeType.POLYGON,
    color: 'violet',
    id: '4',
    positions: [
      [
        { lat: 37.13842453422676, lng: -74.28955078125001 },
        { lat: 36.4433803110554, lng: -74.26208496093751 },
        { lat: 36.43896124085948, lng: -73.00964355468751 },
        { lat: 36.43896124085948, lng: -73.00964355468751 },
      ],
      [
        { lat: 37.505368263398104, lng: -72.38891601562501 },
        { lat: 37.309014074275915, lng: -71.96594238281251 },
        { lat: 36.69044623523481, lng: -71.87805175781251 },
        { lat: 36.58024660149866, lng: -72.75146484375001 },
        { lat: 37.36579146999664, lng: -72.88330078125001 },
      ],
    ],
  },
  {
    shapeType: MapShapeType.POLYLINE,
    color: 'orange',
    id: '5',
    positions: [
      { lat: 35.411438052435486, lng: -78.67858886718751 },
      { lat: 35.9602229692967, lng: -79.18945312500001 },
      { lat: 35.97356075349624, lng: -78.30505371093751 },
    ],
  },
  {
    shapeType: MapShapeType.POLYLINE,
    color: 'purple',
    id: '5a',
    positions: [
      [
        { lat: 36.36822190085111, lng: -79.26086425781251 },
        { lat: 36.659606226479696, lng: -79.28833007812501 },
        { lat: 36.721273880045004, lng: -79.81018066406251 },
      ],
      [
        { lat: 35.43381992014202, lng: -79.79370117187501 },
        { lat: 35.44277092585766, lng: -81.23840332031251 },
        { lat: 35.007502842952896, lng: -80.837402343750017 },
      ],
    ],
  },
  {
    shapeType: MapShapeType.RECTANGLE,
    color: 'yellow',
    id: '6',
    bounds: [
      [36.5, -75.7],
      [38.01, -73.13],
    ],
  },
]

const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇']
const duration = Math.floor(Math.random() * 3) + 1
const delay = Math.floor(Math.random()) * 0.5
const iterationCount = 'infinite'

const locations: { icon: string; position: LatLngLiteral; name: string }[] = [
  {
    icon: '⭐',
    position: { lat: 38.895, lng: -77.0366 },
    name: 'Washington DC',
  },
  {
    icon: '🎢',
    position: { lat: 37.8399, lng: -77.4442 },
    name: 'Kings Dominion',
  },
  {
    icon: '🎢',
    position: { lat: 37.23652, lng: -76.646 },
    name: 'Busch Gardens Williamsburg',
  },
  {
    icon: '⚓',
    position: { lat: 36.8477, lng: -76.2951 },
    name: 'USS Wisconsin (BB-64)',
  },
  {
    icon: '🏰',
    position: { lat: 28.3852, lng: -81.5639 },
    name: 'Walt Disney World',
  },
]

export const mapMarkers: MapMarker[] = [
  {
    id: '2',
    position: { lat: 37.06452161, lng: -75.67364786 },
    icon: '😴',
    size: [64, 64],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.PULSE,
    },
  },
  {
    id: '19',
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
    size: [32, 32],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.BOUNCE,
    },
  },
  {
    id: '100',
    position: new LatLng(37.23310632, -76.23518332),
    icon: emoji[Math.floor(Math.random() * emoji.length)],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.WAGGLE,
    },
  },
  {
    id: '1',
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon: '😴',
    size: [32, 32],
    animation: {
      type: AnimationType.SPIN,
      duration,
      delay,
      iterationCount,
    },
  },
  {
    id: '1000',
    position: new LatLng(36.60061515, -76.48888338),
    icon: `<svg xmlns="http://www.w3.org/2000/svg">
    <circle id="greencircle" cx="30" cy="30" r="30" fill="green" />
</svg>`,
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.PULSE,
    },
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    position: { lat: 37.0580835, lng: -75.82318747 },
    icon: 'Fish',
    animation: {
      type: AnimationType.WAGGLE,
      duration,
      delay,
      iterationCount,
    },
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    position: { lat: 37.23310632, lng: -76.23518332 },
    icon: emoji[Math.floor(Math.random() * emoji.length)],
    size: [4, 4],
    animation: {
      type: AnimationType.PULSE,
      duration,
      delay,
      iterationCount,
    },
  },
]
