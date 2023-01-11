import { LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setForecast7Data } from 'actions/forecast';
import { API_PROXY_FORECAST7_GET_URL } from 'common/constants/urls';

import 'leaflet-tile-loading-progress-control';
import 'leaflet-google-places-autocomplete';
import 'leaflet-google-places-autocomplete/src/css/leaflet-gplaces-autocomplete.css';
import 'leaflet-tile-loading-progress-control/dist/Control.TileLoadingProgress.css';
import './LeafletControlLayerGroup.scss';
class LeafletControlLayerGroup extends LayerGroup {
  componentDidMount() {
    super.componentDidMount();
    const that = this;
    const map = this.leafletElement._map;
    const tileLoadingProgress = new L.Control.TileLoadingProgress({
      leafletElt: this.leafletElement,
      position: 'bottomleft'
    });
    tileLoadingProgress.addTo(map);

    new L.Control.GPlaceAutocomplete({
      collapsed_mode: true,
      callback: function(place) {
        if (!place || !place.geometry || !place.geometry.location) {
          return;
        }
        const loc = place.geometry.location;

        map.setView([loc.lat(), loc.lng()], 8);

        fetch(
          `${API_PROXY_FORECAST7_GET_URL}?googlePlaceId=${place.place_id}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        )
          .then(res => res.json())
          .then(res => {
            let error = false;
            if (!res.forecast7Url) {
              error = true;
            }
            const widgetURL = `https://forecast7.com/en/${
              res.forecast7Url
            }/?unit=us`;
            that.props.setForecast7Data({
              name: place.name,
              url: error ? '#' : widgetURL,
              error
            });
          })
          .catch(e => {
            console.error(e);
          });
      }
    }).addTo(map);
    document
      .getElementsByClassName('leaflet-gac-control')[0]
      .setAttribute('placeholder', 'Search for a city (BETA)');
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setForecast7Data
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletControlLayerGroup);
