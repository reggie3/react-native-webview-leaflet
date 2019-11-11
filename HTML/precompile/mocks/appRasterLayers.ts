import { mapboxToken } from '../secrets';
import { MapLayerTypes, MapRasterLayer } from 'react-native-webview-leaflet';

const mapLayers: MapRasterLayer[] = [
  {
    name: 'OpenStreetMap',
    isChecked: true,
    type: MapLayerTypes.TILE_LAYER,
    isBaseLayer: true,
    url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    attribution:
      '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  }
  /* {
    name: 'streets',
    type: MapLayerTypes.TILE_LAYER,
    isBaseLayer: true,

    url: `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
    attribution:
      '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  } */
  /*
  {
    name: 'light',
    type: MapLayerTypes.TILE_LAYER,
    isBaseLayer: true,
    //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    url: `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
    attribution:
      '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  },
  {
    name: 'dark',
    type: MapLayerTypes.TILE_LAYER,
    isBaseLayer: true,
    url: `https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
    attribution:
      '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  }, */
  /* {
     name: 'image',
     type: 'ImageOverlay',
     isBaseLayer: true,
     url: 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
     bounds: [[40.712216, -74.22655], [40.773941, -74.12544]]
   }, */
  /*  {
    name: 'WMS Tile Layer',
    type: MapLayerTypes.TILE_LAYER,
    url: 'https://demo.boundlessgeo.com/geoserver/ows',
    layers: 'nasa:bluemarble'
  } */
  /* {
    type: 'VideoOverlay',
    name: 'video',
    isBaseLayer: true,
    url: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
    bounds: [[32, -130], [13, -100]]
  } */
];

export default mapLayers;
