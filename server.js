#!/usr/bin/env node
'use strict';

require('./process/process.error');
require('./process/process.env');

require('./stores/user.store');
require('./stores/home.store');
require('./stores/timeline.store');
require('./stores/incident.store');

var express = require('./express/express.server').server,
    websocket = require('./websocket/websocket.server').server;

var server = express.create();
websocket.bind(server);

server.listen(process.env.PORT || 3000, function () {
  console.log('Servers listening on ' + (process.env.PORT || 3000));
});
