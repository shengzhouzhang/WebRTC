
'use strict';

var redis = require('../util/redis/redis.client').client,
    logger = require('../util/log/application.log').logger;

var insidents = {

  _DB: 'INSIDENTS_LIST',

  add: function (insident, cb) {
    if(!insident || !insident.id || !insident.received_at) { throw new Error ('invalid insident data'); }
      
    redis.zadd(this._DB, insident.received_at, JSON.stringify(insident), function (err, result) {
      logger.info('new insident', insident.id, result, err);
      if(!!cb) { cb(err, result); }
    });
  },

  query: function (options, cb) {
    if(!cb) { throw new Error ('missing cb'); }
    redis.zrangebyscore(this._DB, options && options.min || '-inf', options && options.max || '+inf', cb);
  }
};

module.exports.store = insidents;
