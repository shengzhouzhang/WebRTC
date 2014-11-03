
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  create: function (incident) {
    if(!incident || !incident.id || !incident.event) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      redis.rpush(incident.id, JSON.stringify(incident.event), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    }.bind(this));
  },

  request: function (id) {
    if(!id) { throw new Error ('invalid incident id'); }

    return new Promise(function (resolve, reject) {

      redis.lrange(id, 0, -1, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        try {
          var incidents = _.map(result, function (item) {
            return JSON.parse(item);
          });
          resolve(incidents);
        } catch (err) {
          reject(err);
        }
      });
    }.bind(this));
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_INCIDENT, store.request.bind(store));

module.exports.store = store;
