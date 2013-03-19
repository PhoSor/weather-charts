var controllers = require('./controllers');

module.exports = [
  {verb: 'get', path: '/forecast/:id', action: controllers.forecast.get},
  {verb: 'get', path: '/search', action: controllers.search.city}
];
