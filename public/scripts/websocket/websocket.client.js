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
      case 'AUTHENTICATE':
        dispatcher.dispatch(actions.REQUEST_UNPDATES, { timestamp: moment().valueOf() });
        break;
      case 'REQUEST_UNPDATES':
        // dispatcher.dispatch(actions.REQUEST_UNPDATES, { timestamp: moment().valueOf() }
        break;
      default:
        break;
    }
  };


  dispatcher.register(actions.REQUEST_UNPDATES, function (options) {

    socket.send(JSON.stringify({
      action: 'REQUEST_UNPDATES',
      timestamp: options.timestamp
    }));
  });

});
