requirejs.config({
  paths: {
    underscore: '/libs/underscore/js/underscore-min',
    jquery: '/libs/jquery/js/jquery.min',
    backbone: '/libs/backbone/js/backbone-min',
    highcharts: '/libs/highcharts/js/highcharts',
    highcharts_more: '/libs/highcharts/js/highcharts-more'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
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

define(['jquery', 'views/search', 'views/charts'],
    function($, SearchView, ChartsView) {
      console.log('hi, i\'m module!');
      var search = new SearchView({el: $('.search'),
        resultEl: $('.city-list')});
      search.on('selected', function(view) {
        console.log(view.model.toJSON());
      });
      // var charts = new ChartsView();
    });
