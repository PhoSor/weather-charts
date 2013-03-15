function city(request, response) {
  console.log(request.query.q);
  response.send('citu');
}

module.exports = {
  city: city
};
