
'use strict';

var _ = require('lodash'),
    Server = require('ws').Server,
    events = require('../dispatcher/events').events,
    logger = require('../util/log/application.log').logger;

var _server;

var server = {

  startup: function () {

    var port = process.env.PORT || 4000;

    _server = new Server({ port: port, path: '/socket' }, function () {
      logger.info('WebSocket server listening on port ' + port);
    });

    _server.on('connection', function (client) {
      logger.info('socket', 'connections', this.clients.length);

      client.on('message', function (data) {
        if(!data || !data.username || !data.action) { logger.error('socket', 'invalid message data', data); return; }

        switch(data.action) {
          case '':
            break;
          default:
            logger.error('socket', 'unknown action type', data.action);
        }
      });
    });
  }
};

var broadcast = function (data) {
  if(!data || !data.action) { throw new Error ('invalid message data'); }
  if(!_server) { logger.error('broadcast', 'server is not available'); return; }
  if(!_server.clients || !_server.clients.length) { logger.info('broadcast', 'no clients'); return; }

  _.each(_server.clients, function (client) {

    client.send(data, function (err) {
      if(!!err) { logger.error(err.message || err); return; }
    });
  });
};

events.addEventListener(events.types.BROADCAST, broadcast.bind(undefined));

module.exports.server = server;
