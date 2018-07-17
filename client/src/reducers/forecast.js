import {
  WEATHER_FORECAST_REQUESTED,
  WEATHER_FORECAST_RECEIVED,
  WEATHER_FORECAST_ERRORED
} from '../actions/forecast';

const initialWeatherForecast = {
  weatherForecast: null,
  fetching: false,
  error: false
};

const weatherForecast = (state = initialWeatherForecast, action) => {
  switch (action.type) {
    case WEATHER_FORECAST_REQUESTED:
      return {
        ...state,
        fetching: true
      };
    case WEATHER_FORECAST_RECEIVED:
      return {
        ...state,
        weatherForecast: action.payload.weatherForecast,
        fetching: false,
        error: false
      };
    case WEATHER_FORECAST_ERRORED:
      return {
        ...state,
        weatherForecast: null,
        fetching: false,
        error: true
      };
    default:
      return state;
  }
};

export { weatherForecast };
