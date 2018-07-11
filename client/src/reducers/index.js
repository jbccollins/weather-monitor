import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { displayMode } from './controls';
import { radarTimestamps, radarTimestamp } from './radar';
export default combineReducers({
  displayMode,
  radarTimestamps,
  radarTimestamp,
  router: routerReducer
});
