
'use strict';

var redis = require('../util/redis/redis.client').client,
    logger = require('../util/log/application.log').logger;

var incidents = {

  _DB: 'incidentS_LIST',

  add: function (incident, cb) {
    if(!incident || !incident.id || !incident.received_at) { throw new Error ('invalid incident data'); }

    redis.zadd(this._DB, incident.received_at, JSON.stringify(incident), function (err, result) {
      logger.info('new incident', incident.id, result, err);
      if(!!cb) { cb(err, result); }
    });
  },

  query: function (options, cb) {
    if(!cb) { throw new Error ('missing cb'); }
    redis.zrangebyscore(this._DB, options && options.min || '-inf', options && options.max || '+inf', cb);
  }
};

module.exports.store = incidents;
