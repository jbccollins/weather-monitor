import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDisplayMode } from 'actions/controls';
import { setRadarTimestamp } from 'actions/radar';
import { fetchWeatherForecast } from 'actions/forecast';
import 'utilities/leaflet-shims';
import { generateIowaRadarTileLayer } from 'utilities/helpers';
import { IOWA_RADAR_TILES } from 'common/constants/urls';
import './WeatherMap.scss';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, WMSTileLayer, Marker } from 'react-leaflet';
import RadarControls from 'components/RadarControls';
import ForecastOverlay from 'components/ForecastOverlay';
import L from 'leaflet';

const IOWA_RADAR_TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class WeatherMap extends React.Component {
  state = {
    clickedLatLng: null
  };

  handleRadarTimestampChange = timestamp => {
    this.props.setRadarTimestamp(timestamp);
  };

  handleMapClick = ({ latlng }) => {
    this.props.fetchWeatherForecast();
    this.setState({ clickedLatLng: latlng });
  };

  render() {
    const { radarTimestamp, weatherForecast } = this.props;
    const { clickedLatLng } = this.state;
    return (
      <div className="WeatherMap">
        <div className="radar-controls-container">
          <RadarControls
            onChange={this.handleRadarTimestampChange}
            currentTick={radarTimestamp}
            ticks={IOWA_RADAR_TICKS}
          />
        </div>
        <ForecastOverlay forecast={weatherForecast} />
        <Map
          center={[39.5, -98.35]}
          zoom={5}
          attribution={false}
          onClick={this.handleMapClick}>
          <TileLayer
            crossOrigin
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
          />
          {IOWA_RADAR_TICKS.map(t => (
            <WMSTileLayer
              className="RadarTileLayer"
              key={`${t}-iowa`}
              opacity={radarTimestamp === t ? 0.7 : 0}
              layers={generateIowaRadarTileLayer(t)}
              transparent
              url={IOWA_RADAR_TILES}
              //onTileLoadStart={() => {console.log('tls')}}
              format="image/png"
            />
          ))}
          <TileLayer
            crossOrigin
            url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png"
          />
          {clickedLatLng && (
            <Marker
              zIndexOffset={1000}
              position={[clickedLatLng.lat, clickedLatLng.lng]}
              icon={L.divIcon({
                className: `radar-icon`,
                iconSize: [1, 1]
              })}
            />
          )}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayMode: state.displayMode,
  radarTimestamp: state.radarTimestamp,
  weatherForecast: state.weatherForecast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDisplayMode,
      setRadarTimestamp,
      fetchWeatherForecast
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMap);
