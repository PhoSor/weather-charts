define(['backbone', 'models/search'], function(Backbone, Search) {
  var CityView = Backbone.View.extend({
    tagName: 'li',

    template: function(city) {
      var region = '', listItem;
      if (city.region) {
        region = ', ' + city.region;
      }

      listItem = [
        '<strong>', city.name, '</strong><br />',
        city.country, region
      ].join('');

      return listItem;
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return CityView;
});

