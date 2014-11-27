
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    Promise = require('promise'),
    incidents = require('../util/mongo/mongo.client').db.incidents,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

require('./channels/incident.channel');
var cache = require('./cache/incident.cache').cache;

var store = {

  add: function (incident) {
    if(!incident || !incident.id) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      incidents.save(incident, function (err, result) {
        if(!!err) { reject(reject); return; }
        resolve(result);
      });

    }.bind(this));
  },

  find: function (options) {
    if(!options) { throw new Error ('missing options'); }

    return new Promise(function (resolve, reject) {
      var start, end;

      if(!!process.env.SPEED_TEST) { start = Date.now(); }

      incidents.find(options)
      .sort({ created_at: -1 })
      .limit(9, function (err, result) {
        if(!!process.env.SPEED_TEST) { end = Date.now(); logger.info('find', (end - start) / 1000); }
        if(!!err) { reject(reject); return; }
        logger.info('store', result.length);
        resolve(result);
      });

    }.bind(this));
  },

  update: function (options) {
    if(!options || !options.query || !options.update) { throw new Error ('invalid options data'); }

    return new Promise(function (resolve, reject) {

      incidents.findAndModify({ query: options.query, update: options.update, new: true },
        function (err, result) {
          if(!!err) { reject(reject); return; }
          resolve(result);
        }
      );

    }.bind(this));
  },

  count: function (options) {
    if(!options) { throw new Error ('invalid incident data'); }

    return new Promise(function (resolve, reject) {

      incidents.count(options, function (err, result) {
        if(!!err) { reject(reject); return; }
        resolve(result);
      });

    }.bind(this));
  }
};

dispatcher.register(dispatcher.actions.ADD_INCIDENT, store.add.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_INCIDENT, store.find.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_UNPDATES, store.count.bind(store));
dispatcher.register(dispatcher.actions.UPDATE_INCIDENT, store.update.bind(store));

dispatcher.register(dispatcher.actions.REQUEST_TIMELINE, function (options) {

  if(!options.notes) {
    return cache.find({
      max: options.created_at['$lt'],
      min: options.created_at['$gt'],
      count: 9
    }).then(function (result) {
      logger.info('cache', result.length);
      return result;
    }, function (err) {
      return store.find(options);
    });
  } else {
    return store.find(options);
  }
});

module.exports.store = store;
