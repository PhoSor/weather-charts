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
          // console.log('request', this.get('query'));
          var model = this;
          $.getJSON(this.get('url'), {q: this.get('query')}, function(data) {
            // console.log('done', model.get('query'));
            model.trigger('result', data);
          });
        }

      });

      return Search;
    });

