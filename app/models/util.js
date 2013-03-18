function mapMethods(map, model, data) {
  var result = {};

  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      if (typeof map[key] == 'string') {
        method = map[key];
        result[key] = data.map(model[method]);
      } else {
        result[key] = map[key];
      }
    }
  }

  return result;
}

module.exports = {
  mapMethods: mapMethods
};
