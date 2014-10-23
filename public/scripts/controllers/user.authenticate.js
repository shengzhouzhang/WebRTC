define([
  'dispatcher',
  'actions',

  'user.store',

  ], function (dispatcher, actions, store) {
  'use strict';

  var _hasAuthenticated = function () {
    return false;
  };

  dispatcher.register(actions.REQUIRE_AUTH, function (options) {
    return new Promise(function (resolve, reject) {
      if(!!_hasAuthenticated()) { resolve(); return; }

      store.once(function () { if(!!_hasAuthenticated()) { resolve(); } });
      dispatcher.dispatch(actions.UNAUTHORIZED);
    });
  });

  dispatcher.register(actions.LOGIN_FAILED, function (options) {
    dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'invalid username or password' });
  });

  dispatcher.register(actions.UNAUTHORIZED, dispatcher.dispatch.bind(undefined, actions.TO_LOGIN_VIEW));
});