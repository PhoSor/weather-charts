function makeForecast(u, weather, days) {
  var tempMap = {
    min: 'getMinTemp',
    max: 'getMaxTemp'
  }, forecastMap = {
    time: 'getTime',
    pressure: 'getPressure',
    temperature: u.mapMethods(tempMap, weather, days)
  }, forecast = u.mapMethods(forecastMap, weather, days);

  return forecast;
}

function get(request, response) {
  var models = request.app.models,
      http = models.http, weather = models.weather, u = models.util,
      cityId = request.query.id, url = weather.getForecastURL(cityId);

  function requestDone(content) {
    var days = content.getChild('forecast').getChildren('day'),
        forecast = makeForecast(u, weather, days);

    response.send(forecast);
  }

  http.get(url, requestDone);
}

module.exports = {
  get: get
};
