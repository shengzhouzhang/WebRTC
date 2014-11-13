
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    incidents = require('../util/mongo/mongo.client').db.incidents,
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    logger = require('../util/log/application.log').logger;

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

      incidents.find(options, function (err, result) {
        if(!!err) { reject(reject); return; }
        resolve(result);

      }).sort({ created_at: -1 }).limit(9);

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
dispatcher.register(dispatcher.actions.REQUEST_TIMELINE, store.find.bind(store));
dispatcher.register(dispatcher.actions.REQUEST_UNPDATES, store.count.bind(store));

dispatcher.register(dispatcher.actions.UPDATE_INCIDENT, store.update.bind(store));

module.exports.store = store;
