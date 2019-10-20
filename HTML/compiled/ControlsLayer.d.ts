/// <reference types="react" />
import { MapRasterLayer } from './models';
interface Props {
    mapRasterLayers: MapRasterLayer[];
}
declare const ControlsLayer: (props: Props) => JSX.Element;
export default ControlsLayer;
