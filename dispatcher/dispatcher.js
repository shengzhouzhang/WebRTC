
'use strict';

var _ = require('lodash'),
    Promise = require('promise');

var _handlers = {};

var dispatcher = {

  actions: {

    // incidents

    ADD_INCIDENT: 'ADD_INCIDENT',
    REQUEST_TIMELINE: 'REQUEST_TIMELINE',
    REQUEST_INCIDENT: 'REQUEST_INCIDENT',
    UPDATE_INCIDENT: 'UPDATE_INCIDENT',

    NEW_INCIDENT: 'NEW_INCIDENT',
    STATUS_UPDATED: 'STATUS_UPDATED',

    // cache
    UPDATE_CACHE: 'UPDATE_CACHE',


    // channels

    CHANNEL_MESSAGE: 'CHANNEL_MESSAGE',

    // web socket server

    BROADCAST: 'BROADCAST',
    REQUEST_UNPDATES: 'REQUEST_UNPDATES',
  },

  register: function (action, callback) {
    if(!action || !callback) { throw new Error ('missing values'); }
    if(!_handlers[action]) { _handlers[action] = []; }

    _handlers[action].push(callback);
  },

  dispatch: function (action, options) {
    if(!action) { throw new Error ('missing values'); }

    var _promises = [];

    _.each(_handlers[action], function (handler) {
      try {
        _promises.push(handler(options));
      } catch (err) {
        console.log(err.stack || err);
      }
    });

    return Promise.all(_promises).then(
      function (result) {
        if(!result.length) { return null; }
        if(result.length === 1) { return result[0]; }
        return result;
      },
      function (error) { console.log(error.stack || error); return error; }
    );
  }
};

module.exports.dispatcher = dispatcher;
