import { RADAR_TILES } from 'common/constants/urls';
const generateRadarTileURL = timestamp => {
  return RADAR_TILES.replace('{timestamp}', timestamp);
};

export { generateRadarTileURL };
