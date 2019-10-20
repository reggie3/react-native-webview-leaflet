import { LatLng } from 'leaflet';
declare const locations: ({
    id: number;
    coords: LatLng;
    icon: string;
    size: number[];
    animation?: undefined;
} | {
    id: number;
    coords: LatLng;
    icon: string;
    size: number[];
    animation: {
        name: string;
        duration: number;
        delay: number;
        interationCount: string;
    };
} | {
    id: number;
    coords: LatLng;
    icon: string;
    animation: {
        name: string;
        duration: number;
        delay: number;
        interationCount: string;
    };
    size?: undefined;
})[];
export default locations;
