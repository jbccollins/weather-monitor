import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { displayMode } from './controls';
import { radarTimestamps, radarTimestamp, radarCachebust } from './radar';
import { weatherForecast, forecast7Data } from './forecast';
export default combineReducers({
  displayMode,
  radarTimestamps,
  radarTimestamp,
  weatherForecast,
  radarCachebust,
  forecast7Data,
  router: routerReducer
});
