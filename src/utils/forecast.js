const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const WEATHERSTACK_API = "http://api.weatherstack.com";
  const WEATHERSTACK_TOKEN = "0bc25ddb7339bfd2fbdee651fa794455";
  const UNITS = "f";
  const WEATHERSTACK_ENDPOINT = "current";
  const url = `${WEATHERSTACK_API}/${WEATHERSTACK_ENDPOINT}?access_key=${WEATHERSTACK_TOKEN}&query=${latitude},${longitude}&units=${UNITS}`;
  request({ url: url, json: true }, (error, { body }) => {
    const currentData = body.current;
    if (error) {
      callback("Unable to connect to forecast service!", undefined);
    } else if (!currentData) {
      callback("Unable to find location!", undefined);
    } else {
      const [weatherDescription] = currentData.weather_descriptions;
      const { temperature, feelslike, humidity } = currentData;
      callback(
        undefined,
        `It's currently ${weatherDescription} and ${temperature} degrees outside, but it feels like ${feelslike} degrees outside. And the humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
