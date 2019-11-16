/// <reference types="react" />
import { MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolyline, MapVectorLayerPolygon, MapVectorLayerRectangle } from './models';
interface Props {
    vectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
}
declare const VectorLayers: ({ vectorLayers }: Props) => JSX.Element;
export default VectorLayers;
