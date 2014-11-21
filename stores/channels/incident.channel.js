
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../../util/redis/redis.client').client,
    dispatcher = require('../../dispatcher/dispatcher').dispatcher,
    logger = require('../../util/log/application.log').logger;

var channel = {

  _id: 'INCIDENT_CHANNEL',

  init: function () {
    redis.subscribe(this._id);
    redis.on('message', function (channel, message) {

      var action;

      try {
        action = JSON.parse(message);
      } catch (err) {

      }

      if(!aciton || !aciton.incident) { return; }
      logger.info('channel received', channel, aciton);
      dispatcher.dispatch(dispatcher.actions.CHANNEL_MESSAGE, aciton);
    });
  },

  post: function (data) {
    if(!data) { return; }
    logger.info('channel sent', this._id, data);
    client2.publish(this._id, JSON.stringify(data));
  }
};

dispatcher.register(dispatcher.actions.NEW_INCIDENT, function (incident) {
  channel.post({ action: 'NEW_CASE', incident: incident });
});

module.exports.channel = channel;
