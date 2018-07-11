import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDisplayMode } from 'actions/controls';
import { fetchRadarTimestamps, setRadarTimestamp } from 'actions/radar';
import 'utilities/leaflet-shims';
import { generateRadarTileURL } from 'utilities/helpers';
import './WeatherMap.scss';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import RadarControls from 'components/RadarControls';

class WeatherMap extends React.Component {
  componentDidMount() {
    const { fetchRadarTimestamps } = this.props;
    fetchRadarTimestamps();
  }

  handleRadarTimestampChange = timestamp => {
    this.props.setRadarTimestamp(timestamp);
  };

  // 9962461c93445dbaf2529f24d498bab5

  render() {
    const { fetching, error, radarTimestamps } = this.props.radarTimestamps;
    const { radarTimestamp } = this.props;
    console.log(radarTimestamp);
    return (
      <div className="WeatherMap">
        <div className="radar-controls-container">
          {error && (
            <div className="radar-error-indicator">Error Loading Radar :(</div>
          )}
          {fetching &&
            !error &&
            !radarTimestamps && (
              <div className="radar-loading-indicator">Loading Radar...</div>
            )}
          {!fetching &&
            !error &&
            radarTimestamps && (
              <RadarControls
                onChange={this.handleRadarTimestampChange}
                currentTick={radarTimestamp}
                ticks={radarTimestamps}
              />
            )}
        </div>
        <Map center={[38.9072, -77.0369]} zoom={10}>
          <TileLayer
            crossOrigin
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
          />
          {/*<TileLayer crossOrigin url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=9962461c93445dbaf2529f24d498bab5"/>*/}
          {radarTimestamps !== null &&
            radarTimestamp !== null && (
              <TileLayer
                className="RadarTileLayer"
                key={radarTimestamp}
                crossOrigin
                url={generateRadarTileURL(radarTimestamps[radarTimestamp])}
              />
            )}
          <TileLayer
            crossOrigin
            url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayMode: state.displayMode,
  radarTimestamps: state.radarTimestamps,
  radarTimestamp: state.radarTimestamp
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDisplayMode,
      fetchRadarTimestamps,
      setRadarTimestamp
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMap);
