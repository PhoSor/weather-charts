requirejs.config({
  paths: {
    backbone: '/libs/backbone/js/backbone-min',
    bootstrap: '/libs/bootstrap/js/bootstrap.min',
    jquery: '/libs/jquery/js/jquery.min',
    highcharts: '/libs/highcharts/js/highcharts',
    highcharts_more: '/libs/highcharts/js/highcharts-more',
    underscore: '/libs/underscore/js/underscore-min'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: 'jQuery'
    },
    'highcharts': {
      exports: 'Highcharts'
    },
    'highcharts-more': {
      deps: ['highcharts']
    }
  }
});

define(['jquery', 'views/search', 'views/charts', 'bootstrap'],
    function($, SearchView, ChartsView) {
      console.log('hi, i\'m module!');
      var search = new SearchView({el: $('.search'),
        resultEl: $('.city-list')});
      search.on('selected', function(view) {
        console.log(view.model.toJSON());
      });
      var charts = new ChartsView;
      charts.create(1515);
    });
