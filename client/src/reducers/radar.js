import {
  RADAR_TIMESTAMPS_REQUESTED,
  RADAR_TIMESTAMPS_RECEIVED,
  RADAR_TIMESTAMPS_ERRORED,
  SET_RADAR_TIMESTAMP
} from '../actions/radar';

const initialRadarTimestamps = {
  radarTimestamps: null,
  fetching: false,
  error: false
};

const radarTimestamps = (state = initialRadarTimestamps, action) => {
  switch (action.type) {
    case RADAR_TIMESTAMPS_REQUESTED:
      return {
        ...state,
        fetching: true
      };
    case RADAR_TIMESTAMPS_RECEIVED:
      return {
        ...state,
        radarTimestamps: action.payload.radarTimestamps,
        fetching: false,
        error: false
      };
    case RADAR_TIMESTAMPS_ERRORED:
      return {
        ...state,
        radarTimestamps: null,
        fetching: false,
        error: true
      };
    default:
      return state;
  }
};

const radarTimestamp = (state = 0, action) => {
  switch (action.type) {
    case SET_RADAR_TIMESTAMP:
      return action.payload.radarTimestamp;
    default:
      return state;
  }
};

export { radarTimestamps, radarTimestamp };
