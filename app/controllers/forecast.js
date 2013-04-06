function makeForecast(u, weather, days) {
  var tempMap = {
    min: 'getMinTemp',
    max: 'getMaxTemp'
  }, forecastMap = {
    time: 'getTime',
    pressure: 'getPressure',
    cloud: 'getCloud',
    humidity: 'getHumidity',
    temperature: u.mapMethods(tempMap, weather, days)
  }, forecast = u.mapMethods(forecastMap, weather, days);

  return forecast;
}

function get(request, response) {
  var models = request.app.models,
      http = models.http, weather = models.weather, u = models.util,
      cityId = request.params.id, url = weather.getForecastURL(cityId);

  function requestDone(content) {
    var days = content.getChild('forecast').getChildren('day'),
        city = content.getChild('city'),
        forecast = makeForecast(u, weather, days);
    forecast.city = weather.getGeoPositionFromForecast(city);

    response.send(forecast);
  }

  http.get(url, requestDone);
}

module.exports = {
  get: get
};
