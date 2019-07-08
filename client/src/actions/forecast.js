import fetch from 'isomorphic-fetch';
import { generateWeatherForecastURL } from 'utilities/helpers';

const SET_FORECAST7_DATA = 'forecast/SET_FORECAST7_DATA';

const setForecast7Data = data => {
  return dispatch => {
    dispatch({
      type: SET_FORECAST7_DATA,
      payload: { data }
    });
  };
};

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

const fetchWeatherForecast = latlng => {
  return dispatch => {
    dispatch(requestWeatherForecast());
    return fetch(generateWeatherForecastURL(latlng), {
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
  SET_FORECAST7_DATA,
  WEATHER_FORECAST_ERRORED,
  WEATHER_FORECAST_RECEIVED,
  WEATHER_FORECAST_REQUESTED,
  fetchWeatherForecast,
  handleWeatherForecastError,
  receiveWeatherForecast,
  requestWeatherForecast,
  setForecast7Data
};
