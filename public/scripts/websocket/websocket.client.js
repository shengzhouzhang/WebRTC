define([
  'dispatcher',
  'actions',

  'user.store'

  ], function (dispatcher, actions, store) {
  'use strict';

  var _socket, _status;

  var status = { OPENED: 'OPENED', CLOSED: 'CLOSED' };

  var socket = {

    connect: function () {
      if(!!_socket) { console.log('socket exists'); return; }

      _socket = new WebSocket('ws://localhost:4000/socket', 'json');

      _socket.onopen = this._onopen;
      _socket.onmessage = this._onmessage;
      _socket.onerror = this._onerror;
      _socket.onclose = this._onclose;
    },

    updates: function (options) {
      if(!_socket) { console.log('socket not available'); return; }
      if(!_socket.username) { console.log('unauthorized socket'); return; }

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

    _onopen: function () {
      socket.authenticate();
      _status = status.OPENED;
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
          _socket.username = data.username;
          break;
        case 'REQUEST_UNPDATES':
          if(!data.updates) { return; }
          break;
        default:
          break;
      }
    },

    _onerror: function (err) {
      console.log(err.message || err);
    },

    _onclose: function () {
      _socket = null;
      _status = status.CLOSED;
      setTimeout(socket.connect.bind(socket), 5000);
    },
  };

  return socket;
});
