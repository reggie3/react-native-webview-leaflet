"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_webview_leaflet_1 = require("react-native-webview-leaflet");
var mapLayers = [
    {
        name: 'OpenStreetMap',
        isChecked: true,
        type: react_native_webview_leaflet_1.MapLayerTypes.TILE_LAYER,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwUmFzdGVyTGF5ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJlY29tcGlsZS9tb2Nrcy9hcHBSYXN0ZXJMYXllcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBNkU7QUFFN0UsSUFBTSxTQUFTLEdBQXFCO0lBQ2xDO1FBQ0UsSUFBSSxFQUFFLGVBQWU7UUFDckIsU0FBUyxFQUFFLElBQUk7UUFDZixJQUFJLEVBQUUsNENBQWEsQ0FBQyxVQUFVO1FBQzlCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLEdBQUcsRUFBRSxvREFBb0Q7UUFDekQsV0FBVyxFQUNULHVGQUF1RjtLQUMxRjtJQUNEOzs7Ozs7OztRQVFJO0lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUJLO0lBQ0w7Ozs7OztVQU1NO0lBQ047Ozs7O1FBS0k7SUFDSjs7Ozs7O1FBTUk7Q0FDTCxDQUFDO0FBRUYsa0JBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwYm94VG9rZW4gfSBmcm9tICcuLi9zZWNyZXRzJztcclxuaW1wb3J0IHsgTWFwTGF5ZXJUeXBlcywgTWFwUmFzdGVyTGF5ZXIgfSBmcm9tICdyZWFjdC1uYXRpdmUtd2Vidmlldy1sZWFmbGV0JztcclxuXHJcbmNvbnN0IG1hcExheWVyczogTWFwUmFzdGVyTGF5ZXJbXSA9IFtcclxuICB7XHJcbiAgICBuYW1lOiAnT3BlblN0cmVldE1hcCcsXHJcbiAgICBpc0NoZWNrZWQ6IHRydWUsXHJcbiAgICB0eXBlOiBNYXBMYXllclR5cGVzLlRJTEVfTEFZRVIsXHJcbiAgICBpc0Jhc2VMYXllcjogdHJ1ZSxcclxuICAgIHVybDogYGh0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nYCxcclxuICAgIGF0dHJpYnV0aW9uOlxyXG4gICAgICAnJmFtcDtjb3B5IDxhIGhyZWY9JnF1b3Q7aHR0cDovL29zbS5vcmcvY29weXJpZ2h0JnF1b3Q7Pk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICB9XHJcbiAgLyoge1xyXG4gICAgbmFtZTogJ3N0cmVldHMnLFxyXG4gICAgdHlwZTogTWFwTGF5ZXJUeXBlcy5USUxFX0xBWUVSLFxyXG4gICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcblxyXG4gICAgdXJsOiBgaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49JHttYXBib3hUb2tlbn1gLFxyXG4gICAgYXR0cmlidXRpb246XHJcbiAgICAgICcmYW1wO2NvcHkgPGEgaHJlZj0mcXVvdDtodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHQmcXVvdDs+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gIH0gKi9cclxuICAvKlxyXG4gIHtcclxuICAgIG5hbWU6ICdsaWdodCcsXHJcbiAgICB0eXBlOiBNYXBMYXllclR5cGVzLlRJTEVfTEFZRVIsXHJcbiAgICBpc0Jhc2VMYXllcjogdHJ1ZSxcclxuICAgIC8vdXJsOiAnaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLFxyXG4gICAgdXJsOiBgaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC9tYXBib3gubGlnaHQve3p9L3t4fS97eX0ucG5nP2FjY2Vzc190b2tlbj0ke21hcGJveFRva2VufWAsXHJcbiAgICBhdHRyaWJ1dGlvbjpcclxuICAgICAgJyZhbXA7Y29weSA8YSBocmVmPSZxdW90O2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodCZxdW90Oz5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnZGFyaycsXHJcbiAgICB0eXBlOiBNYXBMYXllclR5cGVzLlRJTEVfTEFZRVIsXHJcbiAgICBpc0Jhc2VMYXllcjogdHJ1ZSxcclxuICAgIHVybDogYGh0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQvbWFwYm94LmRhcmsve3p9L3t4fS97eX0ucG5nP2FjY2Vzc190b2tlbj0ke21hcGJveFRva2VufWAsXHJcbiAgICBhdHRyaWJ1dGlvbjpcclxuICAgICAgJyZhbXA7Y29weSA8YSBocmVmPSZxdW90O2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodCZxdW90Oz5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgfSwgKi9cclxuICAvKiB7XHJcbiAgICAgbmFtZTogJ2ltYWdlJyxcclxuICAgICB0eXBlOiAnSW1hZ2VPdmVybGF5JyxcclxuICAgICBpc0Jhc2VMYXllcjogdHJ1ZSxcclxuICAgICB1cmw6ICdodHRwOi8vd3d3LmxpYi51dGV4YXMuZWR1L21hcHMvaGlzdG9yaWNhbC9uZXdhcmtfbmpfMTkyMi5qcGcnLFxyXG4gICAgIGJvdW5kczogW1s0MC43MTIyMTYsIC03NC4yMjY1NV0sIFs0MC43NzM5NDEsIC03NC4xMjU0NF1dXHJcbiAgIH0sICovXHJcbiAgLyogIHtcclxuICAgIG5hbWU6ICdXTVMgVGlsZSBMYXllcicsXHJcbiAgICB0eXBlOiBNYXBMYXllclR5cGVzLlRJTEVfTEFZRVIsXHJcbiAgICB1cmw6ICdodHRwczovL2RlbW8uYm91bmRsZXNzZ2VvLmNvbS9nZW9zZXJ2ZXIvb3dzJyxcclxuICAgIGxheWVyczogJ25hc2E6Ymx1ZW1hcmJsZSdcclxuICB9ICovXHJcbiAgLyoge1xyXG4gICAgdHlwZTogJ1ZpZGVvT3ZlcmxheScsXHJcbiAgICBuYW1lOiAndmlkZW8nLFxyXG4gICAgaXNCYXNlTGF5ZXI6IHRydWUsXHJcbiAgICB1cmw6ICdodHRwczovL3d3dy5tYXBib3guY29tL2JpdGVzLzAwMTg4L3BhdHJpY2lhX25hc2Eud2VibScsXHJcbiAgICBib3VuZHM6IFtbMzIsIC0xMzBdLCBbMTMsIC0xMDBdXVxyXG4gIH0gKi9cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hcExheWVycztcclxuIl19