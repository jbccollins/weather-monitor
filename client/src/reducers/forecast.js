import {
  WEATHER_FORECAST_REQUESTED,
  WEATHER_FORECAST_RECEIVED,
  WEATHER_FORECAST_ERRORED
} from '../actions/forecast';
import { groupForecastByDay } from 'utilities/helpers';

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
        weatherForecast: {
          list: groupForecastByDay(action.payload.weatherForecast['list']),
          name: action.payload.weatherForecast['city']['name']
        },
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
