
'use strict';

var _ = require('lodash'),
    Promise = require('promise');

var _handlers = {},
    _promises = [];

var _addPromise = function (handler, options) {
  _promises.push(handler(options));
};

var _clearPromises = function () {
  _promises = [];
};

var dispatcher = {

  actions: {

    // incidents

    UPDATE_INCIDENTS: 'UPDATE_INCIDENTS',
    REQUEST_TIMELINE: 'REQUEST_TIMELINE',
    REQUEST_INCIDENT: 'REQUEST_INCIDENT',

    // web socket server

    BROADCAST: 'BROADCAST',
  },

  register: function (action, callback) {
    if(!action || !callback) { throw new Error ('missing values'); }
    if(!_handlers[action]) { _handlers[action] = []; }

    _handlers[action].push(callback);
  },

  dispatch: function (action, options) {
    if(!action) { throw new Error ('missing values'); }

    _.each(_handlers[action], function (handler) {
      if(!handler) { return; }
      _addPromise(handler, options);
    });

    return Promise.all(_promises).then(function (result) {
      _clearPromises();
      return result;
    }, function (error) {
      console.log('dispatcher', action, error);
      return error;
    });
  }
};

module.exports.dispatcher = dispatcher;
