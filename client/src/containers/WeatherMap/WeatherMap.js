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
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import RadarControls from 'components/RadarControls';
import ForecastOverlay from 'components/ForecastOverlay';
import LeafletControlLayerGroup from 'components/LeafletControlLayerGroup';

const IOWA_RADAR_TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class WeatherMap extends React.Component {
  state = {
    forecastInterval: null
  };

  handleRadarTimestampChange = timestamp => {
    this.props.setRadarTimestamp(timestamp);
  };

  render() {
    const { radarTimestamp, weatherForecast, radarCachebust } = this.props;
    return (
      <div className="WeatherMap">
        <div className="map-and-forecast-container">
          <div className="map-and-radar-container">
            <Map
              center={[38.9072, -77.0369]}
              zoom={6}
              attribution={false}
              onClick={this.handleMapClick}>
              <TileLayer
                crossOrigin
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
              />
              <LeafletControlLayerGroup>
                {IOWA_RADAR_TICKS.map(t => (
                  <WMSTileLayer
                    className="RadarTileLayer"
                    key={`${t}-iowa`}
                    opacity={radarTimestamp === t ? 0.7 : 0}
                    layers={generateIowaRadarTileLayer(t)}
                    transparent
                    styles=""
                    radarCachebust={radarCachebust}
                    url={`${IOWA_RADAR_TILES}?cachebust={radarCachebust}`}
                    format="image/png"
                  />
                ))}
              </LeafletControlLayerGroup>
              <TileLayer
                crossOrigin
                url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png"
              />
            </Map>
            <div className="radar-controls-container">
              <RadarControls
                onChange={this.handleRadarTimestampChange}
                currentTick={radarTimestamp}
                ticks={IOWA_RADAR_TICKS}
              />
            </div>
          </div>
          <ForecastOverlay
            forecast={weatherForecast}
            radarCachebust={radarCachebust}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayMode: state.displayMode,
  radarTimestamp: state.radarTimestamp,
  weatherForecast: state.weatherForecast,
  radarCachebust: state.radarCachebust
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
