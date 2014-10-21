
define(['dispatcher', 'actions', 'store.base'],
       function (dispatcher, actions, base) {
  'use strict';

  var store = $.extend({

    _store: new Backbone.Model.extend({

    }),

  }, base);

  dispatcher.register(actions.UPDATE_EVENT, store.set);

  return store;
});
