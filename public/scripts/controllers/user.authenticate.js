define([
  'dispatcher',
  'actions',

  // 'login.view',
  // 'user.store',
  // 'login,api',

  ], function (dispatcher, actions, loginView, userStore, loginApi) {
  'use strict';

  var _hasAuthenticated = function () {
    return false;
  };

  dispatcher.register(actions.REQUIRE_AUTH, function (options) {
    return new Promise(function (resolve, reject) {
      if(!!_hasAuthenticated()) { resolve(); return; }
        
      dispatcher.dispatch(actions.TO_LOGIN_VIEW, { callback: resolve });
    });
  });
});
