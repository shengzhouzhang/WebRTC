
'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    path = require('path'),
    redis = require('../util/redis/redis.client').client,
    logger = require('../util/log/application.log').logger;

var _express, _server;

var server = {

  create: function () {
    if(!!_express || !!_server) { logger.info('Express Server is running..'); return; }

    _express = express();

    _express.set('port', process.env.PORT || 3000);

    // middlewares

    _express.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
    _express.use(bodyParser.json({ limit: '5mb' }));
    _express.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '5mb' }));
    _express.use(express.static(path.join(__dirname, '..', 'public')));

    // routers

    _express.use('/user', require('./routers/user.router').router);
    _express.use('/incidents', require('./routers/incident.router').router);

    // server

    _server = http.Server(_express);

    return _server;
  },

  shutdown: function () {
    _express = null;
    _server = null;
    logger.info('Express Server shutting down..');
  }
}

module.exports.server = server;
