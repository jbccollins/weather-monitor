import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { displayMode } from './controls';
import { radarTimestamps, radarTimestamp } from './radar';
import { weatherForecast } from './forecast';
export default combineReducers({
  displayMode,
  radarTimestamps,
  radarTimestamp,
  weatherForecast,
  router: routerReducer
});
