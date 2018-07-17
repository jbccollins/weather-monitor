import React from 'react';
import moment from 'moment';
import { getWeatherIcon } from 'utilities/weatherIcons';
import './ForecastOverlay.scss';

class ForecastOverlay extends React.Component {
  getIconClass = weather => {
    // const iconPath = `../../assets/weather-icons/${getWeatherIcon(weather[0]['id'])}`;
    // return iconPath;
    return getWeatherIcon(weather[0]['id']);
  };

  render() {
    const { weatherForecast } = this.props.forecast;
    return (
      <div
        className="ForecastOverlay"
        style={{ display: weatherForecast ? 'block' : 'none' }}>
        {weatherForecast && (
          <div className="forecast-container">
            <div className="city-name">{weatherForecast['city']['name']}</div>
            <div className="time-bin-container">
              {weatherForecast['list'].map(({ dt, weather }) => (
                <div key={dt}>
                  <div className="timestamp">
                    {moment.unix(dt).format('MM/DD/YYYY hh:mm A')}
                  </div>
                  <div
                    className={`weather-icon ${this.getIconClass(weather)}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ForecastOverlay;
