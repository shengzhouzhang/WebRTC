
define(['dispatcher', 'actions', 'flux'],
       function (dispatcher, actions, Flux) {
  'use strict';

  var store = new Flux.Store({

    _Model: Backbone.Model.extend({
      default: {
        username: undefined,
        access_token: undefined
      }
    }),

    init: function () {
      if(!this._Model) { throw new Error ('missing model'); }
      this._data = new this._Model();
      if(!sessionStorage || !sessionStorage.username || !sessionStorage.access_token) { return; }
      this.set({ username: sessionStorage.username, access_token: sessionStorage.access_token });
    },

    setSession: function (data) {
      if(!sessionStorage) { return; }
      sessionStorage.username = data.username;
      sessionStorage.access_token = data.access_token;
    },

    clearSession: function () {
      if(!sessionStorage) { return; }
      console.log('clear session storage');
      sessionStorage.clear();
    }
  });

  dispatcher.register(actions.LOGOUT, store.clearSession.bind(store));
  dispatcher.register(actions.UPDATE_USER_STORE, store.set.bind(store));
  dispatcher.register(actions.UPDATE_USER_STORE, store.setSession.bind(store));

  return store;
});
