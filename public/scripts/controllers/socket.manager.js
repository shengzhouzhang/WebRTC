define([
  'dispatcher',
  'actions',

  'websocket.client',

  ], function (dispatcher, actions, socket) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    socket.init();

    console.log('SOCKET_READY');
  });

});
