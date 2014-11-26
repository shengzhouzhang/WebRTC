#!/usr/bin/env node
'use strict';

require('./process/process.error');
require('./process/process.env');

require('./stores/user.store');
require('./stores/incident.store');

require('./notification/email.notification');
require('./notification/hipchat.notification');

var express = require('./express/express.server').server,
    websocket = require('./websocket/websocket.server').server;

var server = express.create();
websocket.bind(server);

server.listen(process.env.PORT || 3000, function () {
  console.log('Servers listening on ' + (process.env.PORT || 3000));
  console.log('environment ' + (process.env.NODE_ENV || 'development'));
  console.log('mongodb ' + (process.env.MONGODB_URI || ''));
  console.log('redis ' + [process.env.REDIS_HOST, process.env.REDIS_PORT].join(':'));
});
