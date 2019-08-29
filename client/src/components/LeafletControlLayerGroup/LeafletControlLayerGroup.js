import { LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import fetch from 'isomorphic-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setForecast7Data } from 'actions/forecast';

import 'leaflet-tile-loading-progress-control';
import 'leaflet-google-places-autocomplete';
import 'leaflet-google-places-autocomplete/src/css/leaflet-gplaces-autocomplete.css';
import 'leaflet-tile-loading-progress-control/dist/Control.TileLoadingProgress.css';
import './LeafletControlLayerGroup.scss';
class LeafletControlLayerGroup extends LayerGroup {
  componentDidMount() {
    super.componentDidMount();
    const { setForecast7Data } = this.props;
    const map = this.leafletElement._map;
    const tileLoadingProgress = new L.Control.TileLoadingProgress({
      leafletElt: this.leafletElement,
      position: 'bottomleft'
    });
    tileLoadingProgress.addTo(map);

    // new L.Control.GPlaceAutocomplete({
    //   collapsed_mode: true,
    //   callback: function(place) {
    //     if (!place || !place.geometry || !place.geometry.location) {
    //       return;
    //     }
    //     const loc = place.geometry.location;

    //     map.setView([loc.lat(), loc.lng()], 8);

    //     fetch(`https://forecast7.com/api/getUrl/${place.place_id}`, {
    //       method: 'GET',
    //       headers: {
    //         Accept: 'application/json',
    //         Origin: 'https://weatherwidget.io',
    //         Referer: 'https://weatherwidget.io/w/',
    //         DNT: 1
    //       }
    //     })
    //       .then(res => res.text())
    //       .then(text => {
    //         let error = false;
    //         if (text.indexOf('404') > -1) {
    //           error = true;
    //         }
    //         //fetch(`https://forecast7.com/en/${text}/?format=json`,)
    //         const widgetURL = `https://forecast7.com/en/${text}/?unit=us`;
    //         setForecast7Data({
    //           name: place.name,
    //           url: error ? '#' : widgetURL,
    //           error
    //         });
    //       });
    //   }
    // }).addTo(map);
    // document
    //   .getElementsByClassName('leaflet-gac-control')[0]
    //   .setAttribute('placeholder', 'Search for a city (BETA)');
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
