define([
  'dispatcher',
  'actions',

  'user.store'

  ], function (dispatcher, actions, store) {
  'use strict';

  var socket = new WebSocket("ws://localhost:4000/socket",'json');

  socket.onopen = function () {

    socket.send(JSON.stringify({
      action: 'AUTHENTICATE',
      access_token: store.get().access_token
    }));

    // socket.send(JSON.stringify({
    //   access_token: store.get().access_token,
    //   action: 'REQUEST_UNPDATES',
    //   timestamp: moment().valueOf()
    //   // timestamp: 1414621586651
    // }));
  };

  socket.onerror = function (error) {

    socket.log('Error Logged: ' + error);
  };

  socket.onmessage = function (event) {
    var data;

    try {
      data = JSON.parse(event.data);
    } catch (err) {

    }
    console.log(data);
    if(!data || !data.action) { return; }

    switch(data.action) {
      case '':
        break;
      default:
        break;
    }
  };

});
