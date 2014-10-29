
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    redis = require('../util/redis/redis.client').client,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

var store = {

  _DB: 'INCIDENT_TIMELINE',

  create: function (incident) {
    if(!incident || !incident.id || !incident.home_alarm_id || !incident.created_at) { throw new Error ('invalid incident data'); }

    var data = {
      id: incident.id,
      home_alarm_id: incident.home_alarm_id,
      address: incident.address,
      contact: incident.contact,
      event: {
        id: incident.event.id,
        start: incident.event.start,
        end: incident.event.end,
        cover: incident.event.cover
      },
      created_at: incident.created_at,
    };

    return new Promise(function (resolve, reject) {

      redis.zadd(this._DB, data.created_at, JSON.stringify(data), function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }
        if(!result) { reject(new Error (result)); return; }
        resolve(result);
      });
    }.bind(this));
  },

  request: function (options) {

    var min = options.min || '-inf',
        max = options.max || '+inf';

    return new Promise(function (resolve, reject) {

      redis.zrangebyscore(this._DB, min, max, function (err, result) {
        if(!!err) { logger.error(err.message || err); reject(err); return; }

        try {
          var incidents = _.map(result, function (item) {
            return JSON.parse(item);
          });
          resolve(incidents);
        } catch (err) {
          reject(err);
        }
      });
    }.bind(this));
  }
};

dispatcher.register(dispatcher.actions.UPDATE_INCIDENTS, store.create.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_TIMELINE, store.request.bind(store));

module.exports.store = store;
