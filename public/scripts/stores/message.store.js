
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      default: {
        message: undefined,
      }
    })
  });

  dispatcher.register(actions.UPDATE_MESSAGE, store.set.bind(store));
  dispatcher.register(actions.CLEAR_MESSAGE, store.clear.bind(store));

  return store;
});
