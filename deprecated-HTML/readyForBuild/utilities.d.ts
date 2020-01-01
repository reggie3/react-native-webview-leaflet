import { DivIcon, LatLngBounds } from 'leaflet';
import { MapMarker, WebViewLeafletLatLngBounds } from './models';
import { WebViewLeafletLatLng } from '../../WebViewLeaflet/models';
export declare const createDivIcon: (mapMarker: MapMarker) => DivIcon;
export declare const convertSingleLatLngToNumberArray: (latLng: WebViewLeafletLatLng) => [number, number];
export declare const convertLatLngArrayToNumberArray: (latLngs: WebViewLeafletLatLng[]) => [number, number][];
export declare const convertWebViewLeafletLatLngToNumberArray: (latLngs: WebViewLeafletLatLng | WebViewLeafletLatLng[] | WebViewLeafletLatLng[][]) => [number, number] | [number, number][];
export declare const convertWebViewLeafletLatLngBoundsToLeaftletBounds: (bounds: WebViewLeafletLatLngBounds) => LatLngBounds;
