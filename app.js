var express = require('express'),
    app = express();
var port = process.env.PORT || 3000;

var http = require('http'),
    ltx = require('ltx');

var url = 'http://xml.weather.co.ua/1.2/forecast/1515?dayf=5',
    xml = '';

/* var minTemp = [],
    maxTemp = [], */
var temperature = [],
    time = [];

function int(number) {
  return parseInt(number, 10);
}

function collectData(data) {
  xml += data.toString();
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

function getTime(forecastDay) {
  var date = forecastDay.attr('date'),
      hour = forecastDay.attr('hour'),
      time = new Date(date + ' ' + hour + ':');

  return +time;
}

function makeForecastJSON() {
  var content = ltx.parse(xml),
      forecastDays = content.getChild('forecast').getChildren('day');

  minTemp = forecastDays.map(getMinTemp);
  maxTemp = forecastDays.map(getMaxTemp);
  // temperature = forecastDays.map(getTemp);
  time = forecastDays.map(getTime);

  console.log('JSON done.');
}

function requestDone(response) {
  response.on('data', collectData);
  response.on('end', makeForecastJSON);
}
var request = http.get(url, requestDone);


app.use(express.static(__dirname + '/public'));

app.get('/temp', function(require, response) {
  var data = {
    time: time,
    // temperature: temperature
    temperature: {
      min: minTemp,
      max: maxTemp
    }
  };

  response.send(data);
});

app.get('/', function(require, response) {
  response.sendfile('index.html');
});

app.listen(port);
console.log('Listening on port', port);
