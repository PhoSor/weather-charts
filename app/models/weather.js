var minTemp = [],
    maxTemp = [];

var temperature = [],
    pressure = [],
    time = [];

function int(number) {
  return parseInt(number, 10);
}

function getMinTemp(forecastDay) {
  var temp = forecastDay.getChild('t'),
      min = int(temp.getChildText('min'));

  return min;
}

function getMaxTemp(forecastDay) {
  var temp = forecastDay.getChild('t'),
      max = int(temp.getChildText('max'));

  return max;
}

function getTemp(forecastDay) {
  var temp = forecastDay.getChild('t'),
      min = int(temp.getChildText('min')),
      max = int(temp.getChildText('max'));

  return [min, max];
}

function getPressure(forecastDay) {
  var pressure = forecastDay.getChild('p'),
      max = int(pressure.getChildText('max'));

  return max;
}

function getHumidity(forecastDay) {
  var humidity = forecastDay.getChild('hmid'),
      max = int(humidity.getChildText('max'));

  return max;
}

function getCloud(forecastDay) {
  var cloud = int(forecastDay.getChildText('cloud'));

  return cloud;
}

function getTime(forecastDay) {
  var date = forecastDay.attr('date'),
      hour = forecastDay.attr('hour'),
      time = new Date(date + ' ' + hour + ':');

  return +time;
}

function getGeoPosition(city) {
  var geoPosition = {
    id: city.attr('id'),
    name: city.getChildText('name'),
    region: city.getChildText('region'),
    country: city.getChildText('country')
  };

  return geoPosition;
}

function getGeoPositionFromForecast(city) {
  var geoPosition = {
    id: city.attr('id'),
    name: city.getChildText('name'),
    region: city.getChildText('region'),
    country: city.getChild('country').getChildText('name')
  };

  return geoPosition;
}

function getSearchURL(query) {
  return 'http://xml.weather.co.ua/1.2/city/?lang=en&search=' + query;
}

function getForecastURL(id) {
  return 'http://xml.weather.co.ua/1.2/forecast/' + id + '?lang=en&dayf=5';
}

module.exports = {
  getGeoPosition: getGeoPosition,
  getGeoPositionFromForecast: getGeoPositionFromForecast,
  getMinTemp: getMinTemp,
  getMaxTemp: getMaxTemp,
  getPressure: getPressure,
  getHumidity: getHumidity,
  getCloud: getCloud,
  getTemp: getTemp,
  getTime: getTime,
  getSearchURL: getSearchURL,
  getForecastURL: getForecastURL
};
