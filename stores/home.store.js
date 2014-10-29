
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  _DB: 'HOME_DETAILS',

  create: function (incident) {
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
    }.bind(this));
  },

  request: function (options) {
    if(!options || !options.home_alarm_id) { throw new Error ('invalid home alarm id'); }

    return new Promise(function (resolve, reject) {

      redis.hget(this._DB, options.home_alarm_id, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        resolve(result);
      });
    }.bind(this));
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));
// dispatcher.register(dispatcher.actions.REQUEST_TIMELINE, store.request.bind(store));

module.exports.store = store;
