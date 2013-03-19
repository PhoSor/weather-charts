define(['backbone', 'highcharts'], function(Backbone, Highcharts) {
  var ChartView = Backbone.View.extend({
    initialize: function(options) {
      this.chart = new Highcharts.Chart(options.data);
    }
  });

  return ChartView;
});
