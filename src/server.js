var express = require('express'),
    app = express();
var port = process.env.PORT || 3000;

var routes = require('../config/routes');

app.models = require('../config/models');

function regRoute(route) {
  app[route.verb](route.path, route.action);
}

function start() {
  app.use(express.static(__dirname + '/../public'));

  routes.forEach(regRoute);

  app.listen(port);
  console.log('Listening on port', port);
}

exports.start = start;
