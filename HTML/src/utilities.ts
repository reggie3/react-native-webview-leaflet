import L, { DivIcon } from "leaflet";
import base64Image from "./webBase64Image";
import { MapMarker, MapMarkerAnimation } from "./models";
import { Point } from "react-leaflet";

export const createDivIcon = (mapMarker: MapMarker): DivIcon => {
  let divIcon: DivIcon = L.divIcon({
    className: "clearMarkerContainer",
    html: mapMarker.animation
      ? getAnimatedHTMLString(
          mapMarker.icon || "📍",
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
export const getAnimatedHTMLString = (
  icon: any,
  animation: MapMarkerAnimation,
  size: Point = [24, 24]
) => {
  return `<div class='animationContainer' style="
animation-name: ${animation.type ? animation.type : "bounce"};
animation-duration: ${animation.duration ? animation.duration : 1}s ;
animation-delay: ${animation.delay ? animation.delay : 0}s;
animation-direction: ${animation.direction ? animation.direction : "normal"};
animation-iteration-count: ${
    animation.iterationCount ? animation.iterationCount : "infinite"
  }">
${getIconFromEmojiOrImageOrSVG(icon, size)}
</div>`;
};

const getUnanimatedHTMLString = (icon: any, size: Point = [24, 24]): string => {
  return `<div class='unanimatedIconContainer'>${getIconFromEmojiOrImageOrSVG(
    icon,
    size
  )}</div>`;
};

const getIconFromEmojiOrImageOrSVG = (icon: any, size: Point) => {
  if (icon.includes("svg") || icon.includes("SVG")) {
    //@ts-ignore
    return ` <div style='font-size: ${Math.max(size[0], size[1])}px'>
${icon}
</div>`;
  } else if (icon.includes("//") && icon.includes("http")) {
    //@ts-ignore

    return `<img src="${icon}" style="width:${size[0]}px;height:${size[1]}px;">`;
  } else if (icon.includes("base64")) {
    //@ts-ignore

    return `<img src="${base64Image}" style="width:${size[0]}px;height:${size[1]}px;">`;
  } else {
    return `<div style='font-size: ${Math.max(
      //@ts-ignore
      size[0],
      //@ts-ignore
      size[1]
    )}px'>${icon}</div>`;
  }
};
