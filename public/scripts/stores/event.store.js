
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _store: new Backbone.Model.extend({

    })

  });

  console.log(store);

  dispatcher.register(actions.UPDATE_EVENT, store.set);

  return store;
});
