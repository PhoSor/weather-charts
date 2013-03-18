define(['backbone'],
    function(Backbone) {
      var Search = Backbone.Model.extend({
        defaults: {
          query: null,
          minQueryLength: 2,
          timeout: 500,
          timerId: null,
          url: '/search'
        },

        request: function() {
          var model = this;
          $.getJSON(this.get('url'), {q: this.get('query')}, function(data) {
            model.trigger('result', data);
          });
        }

      });

      return Search;
    });

