define(['backbone', 'models/search', 'views/city'],
    function(Backbone, Search, CityView) {
      var SearchView = Backbone.View.extend({
        events: {
          'click button': 'btnClick'
        },

        initialize: function() {
          var view = this;

          this.model = new Search;
          this.collection = new Backbone.Collection;

          this.resultList = [];

          this.input = this.$el.children('[type=text]');

          this.input.keyup(function() {
            view.model.set({query: view.input.val()});
          });

          this.listenTo(this.model, 'change:query', this.run);
          this.listenTo(this.model, 'result', this.result);

          this.listenTo(this.collection, 'reset', this.render);

          this.input.val('Moscow').trigger('keyup');
        },

        toggleLoader: function() {
          Backbone.$('.img-loader:first').toggle();
        },

        listEmpty: function(isEmpty) {
          if (isEmpty) {
            Backbone.$('.city-list').addClass('empty');
          } else {
            Backbone.$('.city-list').removeClass('empty');
          }
        },

        btnClick: function() {
          this.model.trigger('change:query',
              this.model, this.model.get('query'));
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

          for (var i = 0; i < search.resultList.length; i++) {
            search.resultList[i].remove();
          }
          search.resultList = [];
          search.listEmpty(true);

          if (search.collection.at(0).get('name') == null) {
            return;
          }

          search.listEmpty(false);

          this.collection.each(function(city) {
            var view = new CityView({model: city});
            search.listenTo(view, 'selected', search.selectCity);
            search.resultList.push(view);
            resultEl.append(view.render().el);
          });
        },

        selectCity: function(view) {
          this.trigger('selected', view);
        }
      });

      return SearchView;
    });
