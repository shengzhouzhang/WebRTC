
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  _DB: 'INCIDENT_TIMELINE',

  create: function (incident) {
    if(!incident || !incident.id) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      redis.zadd(this._DB, incident.created_at, incident.id, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        if(!result) { reject(new Error (result)); return; }
        resolve(result);
      });
    }.bind(this));
  },

  request: function (options) {

    var min = !!options && !!options.min ? '(' + options.min : '-inf',
        max = options.max || '+inf';

    return new Promise(function (resolve, reject) {

      redis.zrangebyscore(this._DB, min, max, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    }.bind(this));
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_TIMELINE, store.request.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_UNPDATES, store.request.bind(store));

module.exports.store = store;
