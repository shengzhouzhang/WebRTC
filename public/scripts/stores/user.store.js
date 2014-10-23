
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      username: undefined,
      access_token: undefined
    })
  });

  dispatcher.register(actions.UPDATE_USER_STORE, store.set.bind(store));

  return store;
});
