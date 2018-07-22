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

const generateWeatherForecastURL = latlng => {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${
    latlng.lat
  }&lon=${
    latlng.lng
  }&units=imperial&appid=9962461c93445dbaf2529f24d498bab5&cnt=16`;
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

export {
  generateRadarTileURL,
  generateIowaRadarTileLayer,
  groupForecastByDay,
  generateWeatherForecastURL
};
