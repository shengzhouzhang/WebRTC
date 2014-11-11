
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

  dispatcher.register(actions.UPDATE_TIMELINE_STORE, store.set.bind(store));
  dispatcher.register(actions.UPDATE_INCIDENT_STORE, function (incident) {
    try {
      store.set(incident, { add: false, merge: true, remove: false });
    } catch (err) {

    }
  });

  return store;
});
