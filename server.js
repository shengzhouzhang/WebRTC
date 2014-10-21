#!/usr/bin/env node
'use strict';

require('./process/process.error');
require('./process/process.env');

var express = require('./express/express.server').server;

express.startup();
