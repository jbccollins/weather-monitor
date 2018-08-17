import { LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-tile-loading-progress-control';
import './ProgressLayerGroup.scss';
console.log(L.Control.TileLoadingProgress);
class ProgressLayerGroup extends LayerGroup {
  componentDidMount() {
    super.componentDidMount();
    console.log(this.leafletElement);
    const tileLoadingProgress = new L.Control.TileLoadingProgress({
      leafletElt: this.leafletElement
    });
    tileLoadingProgress.addTo(this.leafletElement._map);
  }
}

export default ProgressLayerGroup;
