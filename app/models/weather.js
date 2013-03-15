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

function getTime(forecastDay) {
  var date = forecastDay.attr('date'),
      hour = forecastDay.attr('hour'),
      time = new Date(date + ' ' + hour + ':');

  return +time;
}

module.exports = {
  getMinTemp: getMinTemp,
  getMaxTemp: getMaxTemp,
  getTemp: getTemp,
  getPressure: getPressure,
  getTime: getTime
};
