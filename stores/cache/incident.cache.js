
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    Promise = require('promise'),
    redis = require('../../util/redis/redis.client').client,
    dispatcher = require('../../dispatcher/dispatcher').dispatcher,
    logger = require('../../util/log/application.log').logger;

var _DB = 'INCIDENTS_CACHE';

var cache = {

  add: function (incident) {
    if(!incident || !incident.id) { throw new Error ('invalid incident data'); }
    return new Promise(function (resolve, reject) {

      redis.zadd(_DB, incident.created_at, JSON.stringify(incident), function (err, result) {
        if(!!err) { reject(reject); return; }
        resolve(result);
      });
    }.bind(this));
  },

  find: function (options) {
    if(!options) { throw new Error ('missing options'); }

    return new Promise(function (resolve, reject) {

      var min = options.min || '-inf',
          max = options.max || '+inf',
          count = options.count || 0;

      redis.zrevrangebyscore(_DB, '(' + max, min, 'LIMIT', 0, count, function (err, result) {
        if(!!err) { logger.error(err.stack || err); reject(err); return; }

        var incidents = [];

        _.each(result, function (item) {
          var incident;
          if(incidents.length >= count) {}

          try {
            incident = JSON.parse(item);
          } catch (err) {
          }
          
          if(!!incident) { incidents.push(incident) }
        })

        if(!incidents.length) { reject(); return; }
        resolve(incidents);
      });

    }.bind(this));
  }
};


dispatcher.register(dispatcher.actions.ADD_INCIDENT, cache.add.bind(cache));

module.exports.cache = cache;
