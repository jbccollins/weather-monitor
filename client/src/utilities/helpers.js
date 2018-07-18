import { RADAR_TILES } from 'common/constants/urls';
import groupBy from 'lodash.groupby';
import moment from 'moment';

const generateRadarTileURL = timestamp => {
  return RADAR_TILES.replace('{timestamp}', timestamp);
};

const generateIowaRadarTileLayer = timestamp => {
  const time = 50 - timestamp * 5;
  return time === 0
    ? 'nexrad-n0r-900913'
    : `nexrad-n0r-900913-m${String(time).padStart(2, '0')}m`;
};

const groupForecastByDay = weatherForcast => {
  return groupBy(weatherForcast, ({ dt }) => {
    console.log(
      moment
        .unix(dt)
        .startOf('isoDay')
        .format('MM/DD/YYYY')
    );
    //return groupBy(weatherForcast, ({dt}) => moment.unix(dt).startOf('isoDay').format('MM/DD/YYYY'));
    return moment
      .unix(dt)
      .startOf('isoDay')
      .format('MM/DD/YYYY');
  });
};

export { generateRadarTileURL, generateIowaRadarTileLayer, groupForecastByDay };
