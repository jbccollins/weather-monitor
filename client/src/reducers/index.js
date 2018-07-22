import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { displayMode } from './controls';
import { radarTimestamps, radarTimestamp, radarCachebust } from './radar';
import { weatherForecast } from './forecast';
export default combineReducers({
  displayMode,
  radarTimestamps,
  radarTimestamp,
  weatherForecast,
  radarCachebust,
  router: routerReducer
});
