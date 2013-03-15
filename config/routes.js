var controllers = require('./controllers');

module.exports = [
  {verb: 'get', path: '/temp', action: controllers.forecast.temp},
  {verb: 'get', path: '/search', action: controllers.search.city}
];
