import { LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-tile-loading-progress-control';
import 'leaflet-google-places-autocomplete';
import 'leaflet-tile-loading-progress-control/dist/Control.TileLoadingProgress.css';
import './ProgressLayerGroup.scss';
class ProgressLayerGroup extends LayerGroup {
  componentDidMount() {
    super.componentDidMount();
    const map = this.leafletElement._map;
    const tileLoadingProgress = new L.Control.TileLoadingProgress({
      leafletElt: this.leafletElement,
      position: 'bottomleft'
    });
    tileLoadingProgress.addTo(map);

    new L.Control.GPlaceAutocomplete({
      callback: function(place) {
        const loc = place.geometry.location;
        console.log(place);

        map.setView([loc.lat(), loc.lng()], 8);
      }
    }).addTo(map);
  }
}

export default ProgressLayerGroup;
