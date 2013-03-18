function city(request, response) {
  var models = request.app.models,
      http = models.http, weather = models.weather,
      url = weather.getSearchURL(request.query.q);

  function requestDone(content) {
    var cities = content.getChildren('city'),
        geoPosition = cities.map(weather.getGeoPosition);

    response.send(geoPosition);
  }

  http.get(url, requestDone);
}

module.exports = {
  city: city
};
