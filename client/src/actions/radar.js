import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { RADAR_TIMESTAMPS } from 'common/constants/urls';

const RADAR_TIMESTAMPS_REQUESTED = 'radar/RADAR_TIMESTAMPS_REQUESTED';
const RADAR_TIMESTAMPS_RECEIVED = 'radar/RAIL_PREDICTIONS_RECEIVED';
const RADAR_TIMESTAMPS_ERRORED = 'radar/RAIL_PREDICTIONS_ERRORED';
const SET_RADAR_TIMESTAMP = 'radar/SET_RADAR_TIMESTAMP';
const SET_RADAR_CACHEBUST = 'radar/SET_RADAR_CACHEBUST';

const setRadarCachebust = () => {
  // Defined in https://weatherwidget.io/js/widget.min.js
  window.__weatherwidget_init();
  return dispatch => {
    dispatch({
      type: SET_RADAR_CACHEBUST,
      payload: { radarCachebust: moment().format('X') }
    });
  };
};

const setRadarTimestamp = radarTimestamp => {
  return dispatch => {
    dispatch({
      type: SET_RADAR_TIMESTAMP,
      payload: { radarTimestamp }
    });
  };
};

const requestRadarTimestamps = () => ({
  type: RADAR_TIMESTAMPS_REQUESTED
});

const receiveRadarTimestamps = radarTimestamps => ({
  type: RADAR_TIMESTAMPS_RECEIVED,
  payload: { radarTimestamps }
});

const handleRadarTimestampsError = error => ({
  type: RADAR_TIMESTAMPS_ERRORED,
  payload: { error }
});

const fetchRadarTimestamps = () => {
  return dispatch => {
    dispatch(requestRadarTimestamps());
    return fetch(RADAR_TIMESTAMPS, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(radarTimestamps => {
        dispatch(receiveRadarTimestamps(radarTimestamps));
      })
      .catch(e => {
        dispatch(handleRadarTimestampsError(e));
        console.warn(e);
      });
  };
};

export {
  RADAR_TIMESTAMPS_REQUESTED,
  RADAR_TIMESTAMPS_RECEIVED,
  RADAR_TIMESTAMPS_ERRORED,
  requestRadarTimestamps,
  receiveRadarTimestamps,
  handleRadarTimestampsError,
  fetchRadarTimestamps,
  setRadarTimestamp,
  SET_RADAR_TIMESTAMP,
  setRadarCachebust,
  SET_RADAR_CACHEBUST
};
