/// <reference types="react" />
import { MapRasterLayer } from './models';
interface Props {
    layer: MapRasterLayer;
}
declare const RasterLayer: (props: Props) => JSX.Element;
export default RasterLayer;
