import { MapMarker, MapShape } from 'expo-leaflet'

export const circle: MapShape = {
  shapeType: 'circle',
  color: '#123123',
  id: '1',
  center: { lat: 34.225727, lng: -77.94471 },
  radius: 2000,
}

export const circleMarker: MapShape = {
  shapeType: 'circle',
  color: 'red',
  id: '2',
  center: { lat: 38.437424, lng: -78.867912 },
  radius: 15,
}

export const polygon: MapShape = {
  shapeType: 'polygon',
  color: 'blue',
  id: '3',
  positions: [
    { lat: 38.80118939192329, lng: -74.69604492187501 },
    { lat: 38.19502155795575, lng: -74.65209960937501 },
    { lat: 39.07890809706475, lng: -71.46606445312501 },
  ],
}

export const multiPolygon: MapShape = {
  shapeType: 'polygon',
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
  shapeType: 'polyline',
  color: 'orange',
  id: '5',
  positions: [
    { lat: 35.411438052435486, lng: -78.67858886718751 },
    { lat: 35.9602229692967, lng: -79.18945312500001 },
    { lat: 35.97356075349624, lng: -78.30505371093751 },
  ],
}

export const multiPolyline: MapShape = {
  shapeType: 'polyline',
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
  shapeType: 'rectangle',
  color: 'yellow',
  id: '6',
  bounds: [
    [36.5, -75.7],
    [38.01, -73.13],
  ],
}

export const mapShapes: Array<MapShape> = [
  {
    shapeType: 'circle',
    color: '#123123',
    id: '1',
    center: { lat: 34.225727, lng: -77.94471 },
    radius: 2000,
  },
  {
    shapeType: 'circleMarker',
    color: '#dd2245',
    id: '2',
    center: { lat: 38.437424, lng: -78.867912 },
    radius: 15,
  },
  {
    shapeType: 'polygon',
    color: '#4545dd',
    id: '3',
    positions: [
      { lat: 38.80118939192329, lng: -74.69604492187501 },
      { lat: 38.19502155795575, lng: -74.65209960937501 },
      { lat: 39.07890809706475, lng: -71.46606445312501 },
    ],
  },
  {
    shapeType: 'polygon',
    color: '#25cc25',
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
    shapeType: 'polyline',
    color: 'orange',
    id: '5',
    positions: [
      { lat: 35.411438052435486, lng: -78.67858886718751 },
      { lat: 35.9602229692967, lng: -79.18945312500001 },
      { lat: 35.97356075349624, lng: -78.30505371093751 },
    ],
  },
  {
    shapeType: 'polyline',
    color: 'purple',
    id: '6',
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
    shapeType: 'rectangle',
    color: 'yellow',
    id: '6',
    bounds: [
      [36.5, -75.7],
      [38.01, -73.13],
    ],
  },
]

export const mapMarkers: MapMarker[] = [
  {
    id: '1',
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: '2',
    position: { lat: 37.06452161, lng: -75.67364786 },
    icon: '😴',
    size: [64, 64],
  },
  {
    id: '3',
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
    size: [32, 32],
  },
  {
    id: '4',
    position: { lat: 37.23310632, lng: -76.23518332 },
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
  },
]
