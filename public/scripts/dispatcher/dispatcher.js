define([],
       function () {
  'use strict';

  var _handlers = {};

  var Dispatcher = {

    register: function (action, callback) {
      if(!action || !callback) { throw new Error ('missing values'); }
      if(!_handlers[action]) { _handlers[action] = []; }

      _handlers[action].push(callback);
    },

    dispatch: function (action, options) {
      console.log('dispatch action: ' + action.actionType);
      if(!action) { throw new Error ('missing values'); }
      if(!_handlers[action]) { return; }

      _.each(_handlers[action], function (handler) {
        if(!handler) { return; }
        handler(options);
      });
    }
  };

  return Dispatcher;
});
