
'use strict';

var _ = require('lodash'),
    Server = require('ws').Server,
    jwt = require('../express/util/jwt.token').token,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var _server;

var server = {

  startup: function (server) {

    // var port = process.env.PORT || 4000;

    // _server = new Server({ port: port, path: '/socket' }, function () {
    //   logger.info('WebSocket server listening on port ' + port);
    // });

    // console.log(server);

    _server = new Server({ server: server, path: '/socket' }, function () {
      console.log('WebSocket server listening');
      // logger.info('WebSocket server listening on port ' + port);
    });

    _server.on('connection', function (client) {
      logger.info('socket', 'connections', this.clients.length);

      client.on('message', function (data) {

        try {
          data = JSON.parse(data);
        } catch (err) {
          data = null;
        }

        if(!data || !data.action) { logger.error('socket', 'invalid message data', data); return; }
        if(!handlers[data.action]) { logger.error('socket', 'unknown action', data.action); return; }

        handlers[data.action](client, data);
      });
    });
  }
};

var broadcast = function (data) {
  if(!data || !data.action) { throw new Error ('invalid message data'); }
  if(!_server) { logger.error('broadcast', 'server is not available'); return; }
  if(!_server.clients || !_server.clients.length) { logger.info('broadcast', 'no clients'); return; }

  _.each(_server.clients, function (client) {

    client.send(JSON.stringify(data), function (err) {
      if(!!err) { logger.error(err.message || err); return; }
    });
  });
};

var _error = function (client, msg) {
  client.send(JSON.stringify({ error: msg }));
  logger.error('socket', msg);
};

var handlers = {

  AUTHENTICATE: function (client, options) {

    if(!options || !options.access_token) { _error(client, 'invalid token'); return; }

    var token = jwt.decode(options.access_token);

    if (!token || jwt.isExpired(token.timestamp)) { _error(client, 'invalid token'); return; }

    var data = JSON.stringify({ action: 'AUTHENTICATE', username: token.username });

    client.send(data, function (err) {
      if(!!err) { logger.error(err.message || err); return; }
    });

    client.username = token.username;
  },

  REQUEST_UNPDATES: function (client, options) {
    if(!client.username) { _error(client, 'unauthorized'); return; }
    if(!options.timestamp) { _error(client, 'missing timestamp'); return; }

    var options = { min: options.timestamp };

    dispatcher.dispatch(dispatcher.actions.REQUEST_UNPDATES, options)
      .then(function (result) {

      if(!result || !result[0]) { _error(client, 'invalid result'); return; }

      var data = JSON.stringify({
        action: 'REQUEST_UNPDATES',
        updates: result[0].length,
        timestamp: options.timestamp
      });

      client.send(data, function (err) {
        if(!!err) { logger.error(err.message || err); return; }
      });
    });
  },
};

dispatcher.register(dispatcher.actions.BROADCAST, broadcast.bind(undefined));

module.exports.server = server;
