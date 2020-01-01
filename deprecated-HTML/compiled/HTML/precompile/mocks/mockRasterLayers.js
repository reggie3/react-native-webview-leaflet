"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var mapLayers = [
    {
        name: 'OpenStreetMap',
        isChecked: true,
        type: models_1.MapLayerTypes.TILE_LAYER,
        isBaseLayer: true,
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
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
exports.default = mapLayers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Jhc3RlckxheWVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3ByZWNvbXBpbGUvbW9ja3MvbW9ja1Jhc3RlckxheWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG9DQUEwRDtBQUUxRCxJQUFNLFNBQVMsR0FBcUI7SUFDbEM7UUFDRSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUsSUFBSTtRQUNmLElBQUksRUFBRSxzQkFBYSxDQUFDLFVBQVU7UUFDOUIsV0FBVyxFQUFFLElBQUk7UUFDakIsR0FBRyxFQUFFLG9EQUFvRDtRQUN6RCxXQUFXLEVBQ1QsdUZBQXVGO0tBQzFGO0lBQ0Q7Ozs7Ozs7O1FBUUk7SUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQks7SUFDTDs7Ozs7O1VBTU07SUFDTjs7Ozs7UUFLSTtJQUNKOzs7Ozs7UUFNSTtDQUNMLENBQUM7QUFFRixrQkFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXBib3hUb2tlbiB9IGZyb20gJy4uL3NlY3JldHMnO1xyXG5pbXBvcnQgeyBNYXBSYXN0ZXJMYXllciwgTWFwTGF5ZXJUeXBlcyB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5jb25zdCBtYXBMYXllcnM6IE1hcFJhc3RlckxheWVyW10gPSBbXHJcbiAge1xyXG4gICAgbmFtZTogJ09wZW5TdHJlZXRNYXAnLFxyXG4gICAgaXNDaGVja2VkOiB0cnVlLFxyXG4gICAgdHlwZTogTWFwTGF5ZXJUeXBlcy5USUxFX0xBWUVSLFxyXG4gICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcbiAgICB1cmw6IGBodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ2AsXHJcbiAgICBhdHRyaWJ1dGlvbjpcclxuICAgICAgJyZhbXA7Y29weSA8YSBocmVmPSZxdW90O2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodCZxdW90Oz5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgfVxyXG4gIC8qIHtcclxuICAgIG5hbWU6ICdzdHJlZXRzJyxcclxuICAgIHR5cGU6IE1hcExheWVyVHlwZXMuVElMRV9MQVlFUixcclxuICAgIGlzQmFzZUxheWVyOiB0cnVlLFxyXG5cclxuICAgIHVybDogYGh0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPSR7bWFwYm94VG9rZW59YCxcclxuICAgIGF0dHJpYnV0aW9uOlxyXG4gICAgICAnJmFtcDtjb3B5IDxhIGhyZWY9JnF1b3Q7aHR0cDovL29zbS5vcmcvY29weXJpZ2h0JnF1b3Q7Pk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICB9ICovXHJcbiAgLypcclxuICB7XHJcbiAgICBuYW1lOiAnbGlnaHQnLFxyXG4gICAgdHlwZTogTWFwTGF5ZXJUeXBlcy5USUxFX0xBWUVSLFxyXG4gICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcbiAgICAvL3VybDogJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJyxcclxuICAgIHVybDogYGh0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQvbWFwYm94LmxpZ2h0L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49JHttYXBib3hUb2tlbn1gLFxyXG4gICAgYXR0cmlidXRpb246XHJcbiAgICAgICcmYW1wO2NvcHkgPGEgaHJlZj0mcXVvdDtodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHQmcXVvdDs+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ2RhcmsnLFxyXG4gICAgdHlwZTogTWFwTGF5ZXJUeXBlcy5USUxFX0xBWUVSLFxyXG4gICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcbiAgICB1cmw6IGBodHRwczovL2FwaS50aWxlcy5tYXBib3guY29tL3Y0L21hcGJveC5kYXJrL3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49JHttYXBib3hUb2tlbn1gLFxyXG4gICAgYXR0cmlidXRpb246XHJcbiAgICAgICcmYW1wO2NvcHkgPGEgaHJlZj0mcXVvdDtodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHQmcXVvdDs+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gIH0sICovXHJcbiAgLyoge1xyXG4gICAgIG5hbWU6ICdpbWFnZScsXHJcbiAgICAgdHlwZTogJ0ltYWdlT3ZlcmxheScsXHJcbiAgICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcbiAgICAgdXJsOiAnaHR0cDovL3d3dy5saWIudXRleGFzLmVkdS9tYXBzL2hpc3RvcmljYWwvbmV3YXJrX25qXzE5MjIuanBnJyxcclxuICAgICBib3VuZHM6IFtbNDAuNzEyMjE2LCAtNzQuMjI2NTVdLCBbNDAuNzczOTQxLCAtNzQuMTI1NDRdXVxyXG4gICB9LCAqL1xyXG4gIC8qICB7XHJcbiAgICBuYW1lOiAnV01TIFRpbGUgTGF5ZXInLFxyXG4gICAgdHlwZTogTWFwTGF5ZXJUeXBlcy5USUxFX0xBWUVSLFxyXG4gICAgdXJsOiAnaHR0cHM6Ly9kZW1vLmJvdW5kbGVzc2dlby5jb20vZ2Vvc2VydmVyL293cycsXHJcbiAgICBsYXllcnM6ICduYXNhOmJsdWVtYXJibGUnXHJcbiAgfSAqL1xyXG4gIC8qIHtcclxuICAgIHR5cGU6ICdWaWRlb092ZXJsYXknLFxyXG4gICAgbmFtZTogJ3ZpZGVvJyxcclxuICAgIGlzQmFzZUxheWVyOiB0cnVlLFxyXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cubWFwYm94LmNvbS9iaXRlcy8wMDE4OC9wYXRyaWNpYV9uYXNhLndlYm0nLFxyXG4gICAgYm91bmRzOiBbWzMyLCAtMTMwXSwgWzEzLCAtMTAwXV1cclxuICB9ICovXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXBMYXllcnM7XHJcbiJdfQ==