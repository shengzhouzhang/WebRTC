define([
  'dispatcher',
  'actions',

  'user.store'

  ], function (dispatcher, actions, store) {
  'use strict';

  var _socket, _conneciton, _authentication;

  var handlers = {

    AUTHENTICATE: function (data, options) {
      _socket.username = data.username;
      if(!!options && !!options.resolve) { options.resolve(); }
    },

    NEW_CASE: function (data, options) {
      dispatcher.dispatch(actions.NEW_CASE, data.incident);
      if(!!options && !!options.resolve) { options.resolve(); }
    },

    REQUEST_UNPDATES: function (data, options) {
      if(!data.updates) { dispatcher.dispatch(actions.NO_NEW_CASE); return; }
      dispatcher.dispatch(actions.NEW_CASE);
      if(!!options && !!options.resolve) { options.resolve(); }
    },
  }

  var socket = {

    connect: function (delay) {
      if(!!_socket) { return; }

      console.log('connect.......');

      _conneciton = new Promise(function (resolve, reject) {

        setTimeout(function () {

          var host = location.origin.replace(/^http/, 'ws');

          _socket = new WebSocket(host + '/socket', 'json');

          _socket.onopen = function () {
            dispatcher.dispatch(actions.CLEAR_MESSAGE);
            resolve();
          };

          _socket.onclose = function () {
            reject();
            this._onclose();
          }.bind(this);

        }.bind(this), delay || 0);
      }.bind(this));

      _authentication = new Promise(function (resolve, reject) {

        this.authenticate({
          resolve: resolve,
          reject: reject
        });

      }.bind(this));
    },

    authenticate: function (options) {
      _conneciton.then(function () {

        this._execute({
          action: 'AUTHENTICATE',
          access_token: store.get().access_token
        }, options)

      }.bind(this));
    },

    updates: function (options) {

      _conneciton.then(function () {
        _authentication.then(function () {

          this._execute({
            action: 'REQUEST_UNPDATES',
            timestamp: options && options.timestamp || -1
          });

        }.bind(this));
      }.bind(this));
    },

    _execute: function (action, options) {

      _socket.onmessage = this._onmessage.bind(this, options);
      _socket.send(JSON.stringify(action));
    },

    _onmessage: function (options, event) {

      var data;

      try { data = JSON.parse(event.data); } catch (err) { }

      console.log(data);

      if(!data || !data.action || !handlers[data.action]) { return; }

      handlers[data.action](data, options);
    },

    _onclose: function () {
      console.log('close.......');
      _socket = null;
      _conneciton = null;
      _authentication = null;
      this.connect(5000);

      dispatcher.dispatch(actions.UPDATE_MESSAGE, {
        message: 'connection lost, trying to reconnect...',
        type: 'error'
      });
    },
  };

  return socket;
});
