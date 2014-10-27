
'use strict';

var _ = require('lodash'),
    EventEmitter = require('eventemitter2').EventEmitter2,
    logger = require('../util/log/application.log').logger;

var baseClass = new EventEmitter();

var events = _.extend(baseClass, {

  types: {

    // job queues
    JOB_RECEIVED: 'JOB_RECEIVED',
    JOB_ASSIGNED: 'JOB_ASSIGNED',
    JOB_PROCESSED: 'JOB_PROCESSED',
    JOB_FINISHED: 'JOB_FINISHED',

    JOB_SCAN: 'JOB_SCAN',
    JOB_NOTIFY: 'JOB_NOTIFY',
    JOB_EXPIRE: 'JOB_EXPIRE',
    JOB_DIRTY: 'JOB_DIRTY',

    // service
    REGISTER: 'REGISTER',

    // scheduler
    START_SCHEDULE: 'START_SCHEDULE',
    STOP_SCHEDULE: 'STOP_SCHEDULE',

    // users
    USER_LOGIN: 'USER_LOGIN',
    USER_HEARTBEAT: 'USER_HEARTBEAT',

    // web socket server

    BROADCAST: 'BROADCAST',

    // admin
    REMOVE_CACHE: 'REMOVE_CACHE',
    GC: 'GC'
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
