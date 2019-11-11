"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities");
var singleLatLng = { lat: 34.225727, lng: -77.94471 };
var latLngArray = [
    { lat: 38.80118939192329, lng: -74.69604492187501 },
    { lat: 38.19502155795575, lng: -74.65209960937501 },
    { lat: 39.07890809706475, lng: -71.46606445312501 }
];
var latLng2DArray = [
    [
        { lat: 37.13842453422676, lng: -74.28955078125001 },
        { lat: 36.4433803110554, lng: -74.26208496093751 },
        { lat: 36.43896124085948, lng: -73.00964355468751 },
        { lat: 36.43896124085948, lng: -73.00964355468751 }
    ],
    [
        { lat: 37.505368263398104, lng: -72.38891601562501 },
        { lat: 37.309014074275915, lng: -71.96594238281251 },
        { lat: 36.69044623523481, lng: -71.87805175781251 },
        { lat: 36.58024660149866, lng: -72.75146484375001 },
        { lat: 37.36579146999664, lng: -72.88330078125001 }
    ]
];
describe('convertWebViewLeafletLatLngToNumberArray', function () {
    it('can covert a single lat lng to a number array ', function () {
        var singleConverted = utilities_1.convertWebViewLeafletLatLngToNumberArray(singleLatLng);
        expect(singleConverted).toEqual([34.225727, -77.94471]);
    });
    it('can covert a an array of latLng to an array of number arrays', function () {
        var convertedLatLongArray = utilities_1.convertWebViewLeafletLatLngToNumberArray(latLngArray);
        expect(convertedLatLongArray).toEqual([
            [38.80118939192329, -74.69604492187501],
            [38.19502155795575, -74.65209960937501],
            [39.07890809706475, -71.46606445312501]
        ]);
    });
    it('can covert a 2D Array of latLngs to a 2D number array ', function () {
        var latLng2DArrayConverted = utilities_1.convertWebViewLeafletLatLngToNumberArray(latLng2DArray);
        expect(latLng2DArrayConverted).toEqual([
            [
                [37.13842453422676, -74.28955078125001],
                [36.4433803110554, -74.26208496093751],
                [36.43896124085948, -73.00964355468751],
                [36.43896124085948, -73.00964355468751]
            ],
            [
                [37.505368263398104, -72.38891601562501],
                [37.309014074275915, -71.96594238281251],
                [36.69044623523481, -71.87805175781251],
                [36.58024660149866, -72.75146484375001],
                [37.36579146999664, -72.88330078125001]
            ]
        ]);
    });
});
var cornerBounds = {
    southWest: { lat: 36.665099, lng: -76.842042 },
    northEast: { lat: 37.365855, lng: -76.158245 }
};
var arrayBounds = [
    { lat: 38.89688, lng: -77.302505 },
    { lat: 37.829395, lng: -76.756299 }
];
describe('convertWebViewLeafletLatLngBoundsToLeaftletBounds', function () {
    it('can figure out whether the bounds of type WebViewLeafletLatLngBoundsCorners or WebViewLeafletLatLng[]', function () {
        console.log('******************************');
    });
    it('can covert WebViewLeafletLatLngBoundsCorner objects', function () {
        var convertedBounds = utilities_1.convertWebViewLeafletLatLngBoundsToLeaftletBounds(cornerBounds);
        expect(convertedBounds).toEqual({
            southWest: [36.665099, -76.842042],
            northEast: [37.365855, -76.158245]
        });
    });
    it('can covert WebViewLeafletLatLngBounds[] objects', function () {
        var convertedBounds = utilities_1.convertWebViewLeafletLatLngBoundsToLeaftletBounds(arrayBounds);
        expect(convertedBounds).toEqual([
            [38.89688, -77.302505],
            [37.829395, -76.756299]
        ]);
    });
});
//# sourceMappingURL=utilities.test.js.map