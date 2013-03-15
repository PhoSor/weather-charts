// var url = 'http://xml.weather.co.ua/1.2/forecast/1515?dayf=5';

function makeForecastJSON(content) {
  var forecastDays = content.getChild('forecast').getChildren('day');

  minTemp = forecastDays.map(weather.getMinTemp);
  maxTemp = forecastDays.map(weather.getMaxTemp);
  // temperature = forecastDays.map(getTemp);
  pressure = forecastDays.map(weather.getPressure);
  time = forecastDays.map(weather.getTime);

  console.log('JSON done.');
}

function nan() {
  console.log('nan');
  arguments[1].send('ok!');
}

/* app.get('/temp', function(request, response, next) {
  // console.log('request', request.app.models);
  // console.log('response', response);
  var data = {
    time: time,
    pressure: pressure,
    // temperature: temperature
    temperature: {
      min: minTemp,
      max: maxTemp
    }
  };

  response.send(data);
}); */
module.exports = {
  temp: nan
};
