import { MapLayer } from "../MapLayers";

const mockMapLayers: MapLayer[] = [
  {
    attribution:
      '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap.Mapnik",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    attribution:
      '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: false,
    baseLayerName: "OpenStreetMap.BlackAndWhite",
    url: "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
  }
];

export default mockMapLayers;
