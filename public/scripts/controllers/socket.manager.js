define([
  'dispatcher',
  'actions',

  'websocket.client',

  ], function (dispatcher, actions, socket) {
  'use strict';

  dispatcher.register(actions.SOCKET_CONNECT, socket.connect.bind(socket, 5000));
  dispatcher.register(actions.REQUEST_UNPDATES, socket.updates.bind(socket));
});
