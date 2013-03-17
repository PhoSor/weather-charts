requirejs.config({
  paths: {
    underscore: '/libs/underscore/js/underscore-min',
    jquery: '/libs/jquery/js/jquery.min',
    backbone: '/libs/backbone/js/backbone-min'
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
    }
  }
});

define(['jquery', 'views/search'],
    function($, SearchView) {
      console.log('hi, i\'m module!');
      var search = new SearchView({el: $('.search'),
        resultEl: $('.city-list')});
    });
