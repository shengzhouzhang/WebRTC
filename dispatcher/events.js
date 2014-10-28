
'use strict';

var _ = require('lodash'),
    EventEmitter = require('eventemitter2').EventEmitter2,
    logger = require('../util/log/application.log').logger;

var baseClass = new EventEmitter();

var events = _.extend(baseClass, {

  types: {

    // incidents

    INCIDENTS_UPDATED: 'INCIDENTS_UPDATED',
    
    // web socket server

    BROADCAST: 'BROADCAST',
  },

  addEventListener: function (name, callback) {
    if(!this._isDefined(name)) { return; }
    this.addListener(name, callback);
  },

  removeEventListener: function (name, callback) {
    if(!this._isDefined(name)) { return; }
    this.removeListener(name, callback);
  },

  _isDefined: function (name) {
    if(!this.types[name]) {
      logger.error('undefined event type: ', name);
      return false;
    }
    return true;
  },

  fireEvent: function (name) {
    if(!this._isDefined(name)) { return; }
    this.emit.apply(this, arguments);
  }
});

module.exports.events = events;
