import { RADAR_TILES } from 'common/constants/urls';
const generateRadarTileURL = timestamp => {
  return RADAR_TILES.replace('{timestamp}', timestamp);
};

const generateIowaRadarTileLayer = timestamp => {
  const time = 50 - timestamp * 5;
  return time === 0
    ? 'nexrad-n0r-900913'
    : `nexrad-n0r-900913-m${String(time).padStart(2, '0')}m`;
};

export { generateRadarTileURL, generateIowaRadarTileLayer };
