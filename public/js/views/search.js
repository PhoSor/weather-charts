define(['backbone', 'models/search', 'collections/cities', 'views/city'],
    function(Backbone, Search, Cities, CityView) {
      var SearchView = Backbone.View.extend({
        initialize: function() {
          var view = this;

          this.model = new Search;
          this.collection = new Cities;

          this.input = this.$el.children('[type=text]');

          this.input.keyup(function() {
            view.model.set({query: view.input.val()});
          });

          this.listenTo(this.model, 'change:query', this.run);
          this.listenTo(this.model, 'result', this.result);

          this.listenTo(this.collection, 'reset', this.render);
        },

        toggleLoader: function() {
          Backbone.$('.img-loader').toggle();
        },

        run: function(search, query) {
          var timerId, view = this,
              minQueryLength = search.get('minQueryLength');

          clearTimeout(search.get('timerId'));

          if (query.length > minQueryLength) {
            timerId = setTimeout(function() {
              view.toggleLoader();
              search.request();
            }, search.get('timeout'));
            search.set('timerId', timerId);
          }
        },

        result: function(data) {
          this.collection.reset(data);
          this.toggleLoader();
        },

        render: function() {
          var resultEl = this.options.resultEl,
              search = this;

          resultEl.html('');

          this.collection.each(function(city) {
            var view = new CityView({model: city});
            search.listenTo(view, 'selected', search.selectCity);
            resultEl.append(view.render().el);
          });
        },

        selectCity: function(view) {
          this.trigger('selected', view);
        }
      });

      return SearchView;
    });
