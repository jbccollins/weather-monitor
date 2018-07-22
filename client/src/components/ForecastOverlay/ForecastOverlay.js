import React from 'react';
import moment from 'moment';
import { getWeatherIcon } from 'utilities/weatherIcons';
import './ForecastOverlay.scss';

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: 'dddd',
    nextWeek: 'dddd',
    sameElse: 'L'
  }
});

class ForecastOverlay extends React.Component {
  getIconClass = weather => {
    // const iconPath = `../../assets/weather-icons/${getWeatherIcon(weather[0]['id'])}`;
    // return iconPath;
    return getWeatherIcon(weather[0]['id']);
  };

  render() {
    const { weatherForecast } = this.props.forecast;
    const { list, name } = weatherForecast
      ? weatherForecast
      : { list: null, name: null };

    return (
      <div
        className="ForecastOverlay"
        style={{ display: weatherForecast ? 'block' : 'none' }}>
        {weatherForecast && <div className="city-name">{name}</div>}
        {weatherForecast && (
          <div className="forecast-container">
            {Object.keys(list).map(k => {
              const items = list[k];
              return (
                <div className="day-block" key={k}>
                  <div className="day-title">{moment(k).calendar()}</div>
                  {items.map(({ dt, weather }) => (
                    <div className="forecast-slot" key={dt}>
                      <div className="timestamp">
                        {moment.unix(dt).format('h:mm A')}
                      </div>
                      <div
                        className={`weather-icon ${this.getIconClass(weather)}`}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ForecastOverlay;
