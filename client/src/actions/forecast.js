import fetch from 'isomorphic-fetch';
import { WEATHER_FORECAST } from 'common/constants/urls';

const WEATHER_FORECAST_REQUESTED = 'forecast/WEATHER_FORECAST_REQUESTED';
const WEATHER_FORECAST_RECEIVED = 'forecast/WEATHER_FORECAST_RECEIVED';
const WEATHER_FORECAST_ERRORED = 'forecast/WEATHER_FORECAST_ERRORED';

const requestWeatherForecast = () => ({
  type: WEATHER_FORECAST_REQUESTED
});

const receiveWeatherForecast = weatherForecast => ({
  type: WEATHER_FORECAST_RECEIVED,
  payload: { weatherForecast }
});

const handleWeatherForecastError = error => ({
  type: WEATHER_FORECAST_ERRORED,
  payload: { error }
});

const fetchWeatherForecast = () => {
  return dispatch => {
    dispatch(requestWeatherForecast());
    return fetch(WEATHER_FORECAST, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(weatherForecast => {
        dispatch(receiveWeatherForecast(weatherForecast));
      })
      .catch(e => {
        dispatch(handleWeatherForecastError(e));
        console.warn(e);
      });
  };
};

export {
  WEATHER_FORECAST_REQUESTED,
  WEATHER_FORECAST_RECEIVED,
  WEATHER_FORECAST_ERRORED,
  requestWeatherForecast,
  receiveWeatherForecast,
  handleWeatherForecastError,
  fetchWeatherForecast
};
