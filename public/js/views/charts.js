define(['backbone', 'views/chart', 'models/charts/temp'],
    function(Backbone, ChartView, Temp) {
      var Forecasts = Backbone.Collection.extend({
        model: Backbone.Model,
        url: '/forecast'
      });

      var ChartsView = Backbone.View.extend({
        initialize: function() {
          this.forecasts = new Forecasts;
          this.charts = new Backbone.Collection;
        },

        create: function(id) {
          var temp, view = this, forecast = new Backbone.Model({id: id});
          this.forecasts.add(forecast);
          forecast.fetch({success: function() {
            temp = Temp(forecast.toJSON());
            view.charts.add(new ChartView({data: temp}));
          }});
        }
      });

      return ChartsView;
    });

