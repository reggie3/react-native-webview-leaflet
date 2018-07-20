import {mapboxToken} from '../secrets'

const mapLayers = [
    {
      name:'streets',
      checked: 'true',
       type: 'TileLayer',
       baseLayer: true,
        //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     }, 
     {
       name:'light',
       type: 'TileLayer',
        //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       url: `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     }, 
     {
       name: 'dark',
       type: 'TileLayer',
        //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       url: `https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     }, 
   /* {
     type: 'ImageOverlay',
     url: 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
     bounds: [[40.712216, -74.22655], [40.773941, -74.12544]]
   }, */
   /* {
     type: 'WMSTileLayer',
     url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
   }, */
   /* {
     type: 'VideoOverlay',
     url: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
     bounds: [[ 32, -130], [ 13, -100]]
   } */
 ]

 export default mapLayers;