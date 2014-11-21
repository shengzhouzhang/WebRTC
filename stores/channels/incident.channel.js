
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    dispatcher = require('../../dispatcher/dispatcher').dispatcher,
    logger = require('../../util/log/application.log').logger;


var redis = require('redis'),
    receive = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {});

if(!!process.env.REDIS_PASSWORD) { receive.auth(process.env.REDIS_PASSWORD); }
receive.on('error', function (err) { logger.error('redis', err.stack); });

var send = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {});

if(!!process.env.REDIS_PASSWORD) { send.auth(process.env.REDIS_PASSWORD); }
send.on('error', function (err) { logger.error('redis', err.stack); });

var channel = {

  _id: 'INCIDENT_CHANNEL',

  subscribe: function () {
    receive.subscribe(this._id);
    receive.on('message', function (channel, message) {

      var action;

      try {
        action = JSON.parse(message);
      } catch (err) {

      }

      if(!action || !action.incident) { return; }
      logger.info('subscribe', channel, action);
      dispatcher.dispatch(dispatcher.actions.CHANNEL_MESSAGE, action);
    });
  },

  publish: function (data) {
    if(!data) { return; }
    send.publish(this._id, JSON.stringify(data), function (err, result) {
      if(!!err) { return; }
      logger.info('publish', this._id, err, result);
    }.bind(this));
  }
};

channel.subscribe();

dispatcher.register(dispatcher.actions.NEW_INCIDENT, function (incident) {
  channel.publish({ action: 'NEW_CASE', incident: incident });
});

module.exports.channel = channel;
