#!/usr/bin/env node
'use strict';

require('./process/process.error');
require('./process/process.env');

var express = require('./express/express.server').server,
    websocket = require('./websocket/websocket.server').server;

express.startup();
websocket.startup();
