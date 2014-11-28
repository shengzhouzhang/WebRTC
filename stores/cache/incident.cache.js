
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    Promise = require('promise'),
    redis = require('../../util/redis/redis.client').client,
    dispatcher = require('../../dispatcher/dispatcher').dispatcher,
    logger = require('../../util/log/application.log').logger;

var _DB = 'INCIDENTS_CACHE';

var cache = {

  find: function (options) {
    if(!options) { throw new Error ('missing options'); }

    return new Promise(function (resolve, reject) {

      var min = options.min || '-inf',
          max = options.max || '+inf',
          count = options.count || 0;

      redis.zrevrangebyscore(_DB, '(' + max, min, 'LIMIT', 0, count, function (err, result) {
        if(!!err) { logger.error(err.stack || err); reject(err); return; }
        if(_.isNumber(max) && result.length !== count) { reject(); return; }

        var incidents = [];

        _.each(result, function (item) {
          var incident;
          if(incidents.length >= count) {}

          try {
            incident = JSON.parse(item);
          } catch (err) {
          }

          if(!!incident) { incident.source = _DB; incidents.push(incident); }
        });

        resolve(incidents);
      });

    }.bind(this));
  },

  update: function (incident) {
    if(!incident || !incident.id) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {
      if(!this.isCached(incident)) { resolve(); return; }

      redis.multi()
      .zremrangebyscore(_DB, incident.created_at, incident.created_at)
      .zadd(_DB, incident.created_at, JSON.stringify(incident))
      .exec(function (err, result) {
        if(!!err) { logger.error(err.stack || err); reject(err); return; }
        resolve();
      }.bind(this));
    }.bind(this));
  },

  isCached: function (incident) {
    if(!incident || !incident.created_at) { throw new Error ('invalid incident data'); }
    return moment(incident.created_at).valueOf() > moment().subtract(7, 'days').valueOf();
  }
};

dispatcher.register(dispatcher.actions.UPDATE_CACHE, cache.update.bind(cache));

module.exports.cache = cache;
