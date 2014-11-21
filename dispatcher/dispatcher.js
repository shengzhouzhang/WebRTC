
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

    ADD_INCIDENT: 'ADD_INCIDENT',
    REQUEST_TIMELINE: 'REQUEST_TIMELINE',
    REQUEST_INCIDENT: 'REQUEST_INCIDENT',
    UPDATE_INCIDENT: 'UPDATE_INCIDENT',

    NEW_INCIDENT: 'NEW_INCIDENT',


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

    _.each(_handlers[action], function (handler) {
      if(!handler) { return; }
      _addPromise(handler, options);
    });

    return Promise.all(_promises).then(
      function (result) {
        _clearPromises();
        if(!result.length) { return null; }
        if(result.length === 1) { return result[0]; }
        return result;
      },
      function (error) { _clearPromises(); return error; }
    );
  }
};

module.exports.dispatcher = dispatcher;
