/// <reference types="react" />
import { MapVectorLayerCircle, MapVectorLayerCircleMarker, MapVectorLayerPolyline, MapVectorLayerPolygon, MapVectorLayerRectangle } from './models';
interface Props {
    addDebugMessage: (msg: any) => void;
    debugMessages: string[];
    vectorLayers: (MapVectorLayerCircle | MapVectorLayerCircleMarker | MapVectorLayerPolyline | MapVectorLayerPolygon | MapVectorLayerRectangle)[];
}
export declare const CircleLayer: ({ layer }: {
    layer: MapVectorLayerCircle;
}) => JSX.Element;
declare const VectorLayers: ({ addDebugMessage, debugMessages, vectorLayers }: Props) => JSX.Element;
export default VectorLayers;
