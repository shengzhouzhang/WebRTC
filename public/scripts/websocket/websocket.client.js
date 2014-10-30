define([
  'dispatcher',
  'actions',

  'user.store'

  ], function (dispatcher, actions, store) {
  'use strict';

  var _socket, _username;

  var socket = {

    init: function () {
      if(!!_socket) { console.log('socket exists'); return; }

      _socket = new WebSocket("ws://localhost:4000/socket",'json');

      _socket.onopen = this.authenticate;
      _socket.onerror = this._onerror;
      _socket.onmessage = this._onmessage;
    },

    updates: function (options) {
      if(!_socket) { console.log('socket not available'); return; }
      if(!_username) { console.log('unauthorized socket'); return; }

      _socket.send(JSON.stringify({
        action: 'REQUEST_UNPDATES',
        timestamp: options.timestamp
      }));
    },

    authenticate: function () {
      if(!_socket) { console.log('socket not available'); return; }

      _socket.send(JSON.stringify({
        action: 'AUTHENTICATE',
        access_token: store.get().access_token
      }));
    },

    _onerror: function (err) {
      console.log(err);
    },

    _onmessage: function (event) {
      var data;

      try {
        data = JSON.parse(event.data);
      } catch (err) {

      }

      console.log(data);

      if(!data || !data.action) { return; }

      switch(data.action) {
        case 'AUTHENTICATE':
          _username = data.username;
          dispatcher.dispatch(actions.REQUEST_UNPDATES, { timestamp: moment().valueOf() });
          break;
        case 'REQUEST_UNPDATES':
          if(!data.updates) { return; }
          break;
        default:
          break;
      }
    },
  }

  dispatcher.register(actions.REQUEST_UNPDATES, socket.updates.bind(socket));

  return socket;
});
