const RADAR_TIMESTAMPS = "https://tilecache.rainviewer.com/api/maps.json";
const RADAR_TILES = "https://tilecache.rainviewer.com/v2/radar/{timestamp}/256/{z}/{x}/{y}.png";

const IOWA_RADAR_TILES = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
const WEATHER_FORECAST = "https://api.openweathermap.org/data/2.5/forecast?lat=38.889931&lon=-77.009003&units=imperial&appid=9962461c93445dbaf2529f24d498bab5&cnt=16";

const API_PROXY_FORECAST7_GET_URL = "/api/proxy/forecast7/getUrl/";
const FORECAST7_GET_URL = "https://forecast7.com/api/getUrl/";
export {
    RADAR_TILES,
    RADAR_TIMESTAMPS,
    IOWA_RADAR_TILES,
    WEATHER_FORECAST,
    API_PROXY_FORECAST7_GET_URL,
    FORECAST7_GET_URL
};