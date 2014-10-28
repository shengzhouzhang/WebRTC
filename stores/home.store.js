
'use strict';

var redis = require('../util/redis/redis.client').client,
    logger = require('../util/log/application.log').logger;

var incidents = {

  _DB: 'HOME_DETAILS',

  update: function (incident) {
    if(!incident || !incident.home_alarm_id || !incident.address || !incident.contact) { throw new Error ('invalid incident data'); }

    var data = {
      home_alarm_id: incident.home_alarm_id,
      address: incident.address,
      contact: incident.contact
    };

    return new Promise(function (resolve, reject) {

      redis.hset(this._DB, data.home_alarm_id, JSON.stringify(data), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });
  },

  retrieve: function (id) {
    if(!id) { throw new Error ('invalid home alarm id'); }

    return new Promise(function (resolve, reject) {

      redis.hget(this._DB, id, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    });

  }
};

module.exports.store = incidents;
