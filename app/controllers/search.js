var search = 'http://xml.weather.co.ua/1.2/city/?lang=en&search=';

function getGeoPosition(city) {
  var geoPosition = {
    name: city.getChildText('name'),
    region: city.getChildText('region'),
    country: city.getChildText('country')
  };

  return geoPosition;
}

function city(request, response) {
  var http = request.app.models.http,
      url = search + request.query.q;

  function requestDone(content) {
    var cities = content.getChildren('city'),
        geoPosition = cities.map(getGeoPosition);

    response.send(geoPosition);

  }

  http.get(url, requestDone);

}

module.exports = {
  city: city
};
