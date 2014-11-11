
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Collection.extend({
      model: Backbone.Model.extend({
        defaults: {
          id: undefined
        }
      }),
      comparator: 'created_at'
    })
  });

  dispatcher.register(actions.UPDATE_TIMELINE_STORE, function (data) {
    store.set(data.incidents, data.options);
  });

  return store;
});
