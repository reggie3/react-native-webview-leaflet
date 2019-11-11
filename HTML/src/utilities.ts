import { DivIcon, LatLng, Bounds, LatLngBounds } from 'leaflet';
const L = require('leaflet');
import {
  MapMarkerAnimation,
  MapMarker,
  WebViewLeafletLatLngBounds,
  WebViewLeafletLatLngBoundsCorners
} from './models';
import base64Image from './webBase64Image';
import { WebViewLeafletLatLng } from '../../WebViewLeaflet/models';

export const createDivIcon = (mapMarker: MapMarker): DivIcon => {
  let divIcon: DivIcon = L.divIcon({
    className: 'clearMarkerContainer',
    html: mapMarker.animation
      ? getAnimatedHTMLString(
          mapMarker.icon || '📍',
          mapMarker.animation || null,
          mapMarker.size || [24, 24]
        )
      : getUnanimatedHTMLString(mapMarker.icon, mapMarker.size),
    iconAnchor: mapMarker.iconAnchor || null
  });
  return divIcon;
};

/*
  Get the HTML string containing the icon div, and animation parameters
  */
const getAnimatedHTMLString = (
  icon: any,
  animation: MapMarkerAnimation,
  size: L.PointExpression = [24, 24]
) => {
  return `<div class='animationContainer' style="
    animation-name: ${animation.name ? animation.name : 'bounce'}; 
    animation-duration: ${animation.duration ? animation.duration : 1}s ;
    animation-delay: ${animation.delay ? animation.delay : 0}s;
    animation-direction: ${
      animation.direction ? animation.direction : 'normal'
    };
    animation-iteration-count: ${
      animation.iterationCount ? animation.iterationCount : 'infinite'
    }">
    ${getIconFromEmojiOrImageOrSVG(icon, size)}
    </div>`;
};

const getUnanimatedHTMLString = (
  icon: any,
  size: L.PointExpression = [24, 24]
): string => {
  return `<div class='unanimatedIconContainer' >
    ${getIconFromEmojiOrImageOrSVG(icon, size)}
    </div>`;
};

const getIconFromEmojiOrImageOrSVG = (icon: any, size: L.PointExpression) => {
  if (icon.includes('svg') || icon.includes('SVG')) {
    return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
    ${icon}
    </div>`;
  } else if (icon.includes('//') || icon.includes('base64')) {
    return `<img src="${base64Image}" style="width:${size[0]}px;height:${size[1]}px;">`;
  } else {
    return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
  ${icon}
  </div>`;
  }
};

export const convertSingleLatLngToNumberArray = (
  latLng: WebViewLeafletLatLng
): [number, number] => {
  return [latLng.lat, latLng.lng];
};

export const convertLatLngArrayToNumberArray = (
  latLngs: WebViewLeafletLatLng[]
) => {
  return latLngs.map((latLng: WebViewLeafletLatLng) => {
    return convertSingleLatLngToNumberArray(latLng);
  });
};

export const convertWebViewLeafletLatLngToNumberArray = (
  latLngs:
    | WebViewLeafletLatLng
    | WebViewLeafletLatLng[]
    | WebViewLeafletLatLng[][]
): [number, number] | [number, number][] => {
  // received a signle LatLng
  if (!Array.isArray(latLngs)) {
    return convertSingleLatLngToNumberArray(latLngs);
  } else {
    // @ts-ignore TS doesn't like that I'm mapping this.
    return latLngs.map((latLng) => {
      return convertWebViewLeafletLatLngToNumberArray(latLng);
    });
  }
};

export const convertWebViewLeafletLatLngBoundsToLeaftletBounds = (
  bounds: WebViewLeafletLatLngBounds
): LatLngBounds => {
  let convertedBounds = null;
  if (bounds.hasOwnProperty('southWest')) {
    const {
      southWest,
      northEast
    } = bounds as WebViewLeafletLatLngBoundsCorners;
    convertedBounds = {
      southWest: convertWebViewLeafletLatLngToNumberArray(southWest),
      northEast: convertWebViewLeafletLatLngToNumberArray(northEast)
    };
  } else {
    convertedBounds = convertWebViewLeafletLatLngToNumberArray(
      bounds as WebViewLeafletLatLng[]
    );
  }
  console.log(convertedBounds);
  return convertedBounds as LatLngBounds;
};
