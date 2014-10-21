define([],
       function () {
  'use strict';

  var _handlers = {},
      _promises = [];

  var _addPromise = function (handler, options) {
    _promises.push((function () {
      var def = $.Deferred();

      try {
        handler(options);
        def.resolve();
      } catch (err)  {
        def.reject(new Error (err));
      }

      return def.promise();
    })());
  };

  var _clearPromises = function () {
    _promises = [];
  };

  var Dispatcher = {

    register: function (action, callback) {
      if(!action || !callback) { throw new Error ('missing values'); }
      if(!_handlers[action]) { _handlers[action] = []; }

      _handlers[action].push(callback);
    },

    dispatch: function (action, options) {
      console.log('dispatch action: ' + action);
      if(!action) { throw new Error ('missing values'); }
      if(!_handlers[action]) { return; }

      _.each(_handlers[action], function (handler) {
        if(!handler) { return; }
        _addPromise(handler, options);
      });

      return $.when(_promises).then(_clearPromises);
    }
  };

  return Dispatcher;
});
