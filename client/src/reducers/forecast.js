import {
  WEATHER_FORECAST_REQUESTED,
  WEATHER_FORECAST_RECEIVED,
  WEATHER_FORECAST_ERRORED,
  SET_FORECAST7_DATA
} from '../actions/forecast';
import { groupForecastByDay } from 'utilities/helpers';

const initialWeatherForecast = {
  weatherForecast: null,
  fetching: false,
  error: false
};

const initialForecast7Data = {
  url: 'https://forecast7.com/en/38d91n77d04/washington/?unit=us',
  name: 'Washington DC',
  error: false
};

const forecast7Data = (state = initialForecast7Data, action) => {
  switch (action.type) {
    case SET_FORECAST7_DATA:
      return action.payload.data;
    default:
      return state;
  }
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

export { weatherForecast, forecast7Data };
