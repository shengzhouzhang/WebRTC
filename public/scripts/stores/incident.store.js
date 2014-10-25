
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      defaults: {
        id: undefined,
        images: undefined
      }
    })
  });

  dispatcher.register(actions.UPDATE_incident_STORE, store.set.bind(store));

  return store;
});
