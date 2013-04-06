define(['backbone', 'views/chart',
  'models/charts/temp', 'models/charts/pressure',
  'models/charts/cloud', 'models/charts/humidity'
],
function(Backbone, ChartView, Temp, Pressure, Cloud, Humidity) {
  var Forecasts = Backbone.Collection.extend({
    model: Backbone.Model,
    url: '/forecast'
  });

  var ChartsView = Backbone.View.extend({
    initialize: function() {
      this.forecasts = new Forecasts;
      this.charts = new Backbone.Collection;
      this.$overlay = Backbone.$('.overlay');
      this.$tabs = this.$('.nav-tabs');
      this.$tabsContent = this.$('.tab-content');
    },

    create: function(id) {
      var temp, view = this, forecast = new Backbone.Model({id: id});
      this.forecasts.add(forecast);
      view.$tabsContent.children().removeClass('active');
      view.$tabs.children().tab('show').addClass('disabled');
      this.loading(true);
      forecast.fetch({success: function() {
        data = forecast.toJSON();
        // console.log(data);

        temp = Temp(data);
        pressure = Pressure(data);
        cloud = Cloud(data);
        humidity = Humidity(data);

        view.charts.add(new ChartView({data: temp}));
        view.charts.add(new ChartView({data: pressure}));
        view.charts.add(new ChartView({data: cloud}));
        view.charts.add(new ChartView({data: humidity}));

        view.$tabs.children().removeClass('disabled');
        view.$tabs.find('a:first').tab('show');
        view.loading(false);
      }});
    },

    loading: function(isLoading) {
      if (isLoading) {
        this.$overlay.removeClass('hide');
      } else {
        this.$overlay.addClass('hide');
      }
    },

    refresh: function(id) {
    }
  });

  return ChartsView;
});

