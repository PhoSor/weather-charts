define(['backbone', 'models/forecast', 'views/chart', 'models/charts/temp'],
    function(Backbone, Forecast, ChartView, Temp) {
      var ChartsView = Backbone.View.extend({
        initialize: function() {
          this.charts = [];
          this.forecast = new Forecast;
          this.forecast.fetch();

          var temp = new Temp(this.forecast.toJSON());
          this.charts.push(new ChartView(temp));
        }
      });

      return ChartsView;
    });

