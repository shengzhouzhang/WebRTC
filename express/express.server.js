
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    redis = require('../util/redis/redis.client').client,
    logger = require('../util/log/application.log').logger;

var _express, _server;

var server = {

  startup: function () {
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

    _server = _express.listen(_express.get('port'), function () {
      logger.info('Express server listening on port ' + _express.get('port'));
    });
  },

  shutdown: function () {
    _express = null;
    _server = null;
    logger.info('Express Server shutting down..');
  }
}

module.exports.server = server;
