
'use strict';

var redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  create: function (incident) {
    if(!incident || !incident.home_alarm_id || !incident.event) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      redis.rpush(incident.home_alarm_id, JSON.stringify(incident.event), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });
  },

  retrieve: function (id) {
    if(!id) { throw new Error ('invalid home alarm id'); }

    return new Promise(function (resolve, reject) {

      redis.lrang(id, 0, -1, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));

module.exports.store = store;
