
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  _DB: 'INCIDENT_DETAILS',

  create: function (incident) {
    if(!incident || !incident.id) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      redis.hset(this._DB, incident.id, JSON.stringify(incident), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    }.bind(this));
  },

  request: function (id) {
    if(!id) { throw new Error ('invalid incident id'); }

    return new Promise(function (resolve, reject) {

      redis.hget(this._DB, id, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        try {
          resolve(JSON.parse(result));
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
