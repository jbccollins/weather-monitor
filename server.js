import express from 'express';
import path from 'path';
import fetch from 'isomorphic-fetch';
import url from 'url';

import {
  API_PROXY_FORECAST7_GET_URL,
  FORECAST7_GET_URL,
} from './common/constants/urls';

const app = express();
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(__dirname + '/client/build'));

app.get('/splash', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/splash.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// This is super dumb but due to some CORS issue we need to proxy this request
const fetchForecast7GetUrl = async (googlePlaceId) => {
  let res = await fetch(`${FORECAST7_GET_URL}${googlePlaceId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Origin: 'https://weatherwidget.io',
      Referer: 'https://weatherwidget.io/w/',
      DNT: 1
    }
  })
  res = await res.text();
  return res
};

app.get(API_PROXY_FORECAST7_GET_URL, async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const googlePlaceId = urlParts['query']['googlePlaceId'];
  const forecast7Url = await fetchForecast7GetUrl(googlePlaceId)
  res.send({forecast7Url});
});