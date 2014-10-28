
'use strict';

var redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  _DB: 'INCIDENT_TIMELINE',

  create: function (incident) {
    if(!incident || !incident.id || !incident.home_alarm_id || !incident.created_at) { throw new Error ('invalid incident data'); }

    var data = {
      id: incident.id,
      home_alarm_id: incident.home_alarm_id,
      created_at: incident.created_at
    };

    return new Promise(function (resolve, reject) {

      redis.zadd(this._DB, data.created_at, JSON.stringify(data), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });
  },

  query: function (options) {
    if(!cb) { throw new Error ('missing cb'); }

    var min = options.min || '-inf',
        max = options.max || '+inf';

    return new Promise(function (resolve, reject) {

      redis.zrangebyscore(this._DB, min, max, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));

module.exports.store = store;
