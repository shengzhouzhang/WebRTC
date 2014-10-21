
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      id: undefined,
      images: undefined
    })
  });

  dispatcher.register(actions.APP_INIT, store.init.bind(store));
  dispatcher.register(actions.UPDATE_INSIDENT_STORE, store.set.bind(store));

  return store;
});
