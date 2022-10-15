const request = require('postman-request');

const geocode = (address, callback) => {
  const MAPBOX_API = 'https://api.mapbox.com/geocoding/v5';
  const MAPBOX_TOKEN = 'pk.eyJ1IjoicmxjanVzYXkiLCJhIjoiY2w5MHdlaXBvMTNrYjNvcDh6dzNmam1weSJ9.pxUVKMSN2wZg2k1flY882Q'
  const MAPBOX_API_ENDPOINT = 'mapbox.places';
  const url = `${MAPBOX_API}/${MAPBOX_API_ENDPOINT}/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (!body.features.length) {
      callback('Unable to find location try again a different search term!', undefined);
    } else {
      const [mapboxData] = body.features;
      const [longitude, latitude] = mapboxData.geometry.coordinates;
      callback(undefined, {
        longitude,
        latitude,
        location: mapboxData.place_name
      });
    }
  });
}

module.exports = geocode;
