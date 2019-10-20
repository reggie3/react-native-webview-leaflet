import { DivIcon } from 'leaflet';
import L = require('leaflet');
import { MapMarkerAnimation, MapMarker } from './models';
import base64Image from './webBase64Image';

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
  icon,
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
  icon,
  size: L.PointExpression = [24, 24]
): string => {
  return `<div class='unanimatedIconContainer' >
    ${getIconFromEmojiOrImageOrSVG(icon, size)}
    </div>`;
};

const getIconFromEmojiOrImageOrSVG = (icon, size: L.PointExpression) => {
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
