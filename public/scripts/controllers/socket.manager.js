define([
  'dispatcher',
  'actions',

  'websocket.client',

  ], function (dispatcher, actions, socket) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    socket.connect();

    console.log('SOCKET_READY');
  });

});
