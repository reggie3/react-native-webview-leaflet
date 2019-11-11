/// <reference types="react" />
import { MapMarker, MapEvent } from './models';
interface Props {
    mapMarkers: MapMarker[];
    onMapEvent: (mapEvent: MapEvent, mapMarkerId: any) => void;
    useMarkerClustering?: boolean;
}
declare const MapMarkers: ({ mapMarkers, onMapEvent, useMarkerClustering }: Props) => JSX.Element;
export default MapMarkers;
