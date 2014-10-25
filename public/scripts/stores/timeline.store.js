
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Collection.extend({
      model: Backbone.Model.extend({
        defaults: {
          id: undefined,
          created_at: undefined
        }
      })
    })
  });

  dispatcher.register(actions.UPDATE_TIMELINE_STORE, store.set.bind(store));

  return store;
});
