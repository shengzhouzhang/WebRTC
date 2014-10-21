
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      id: undefined,
      images: undefined
    })
  });

  dispatcher.register(actions.APP_READY, store.init.bind(store));
  dispatcher.register(actions.UPDATE_INSIDENT, store.set.bind(store));

  return store;
});
