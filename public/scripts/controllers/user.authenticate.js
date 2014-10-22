define([
  'dispatcher',
  'actions',

  'login.view',
  'user.store',
  'login,api',

  ], function (dispatcher, actions, loginView, userStore, loginApi) {
  'use strict';


  var _hasAuthenticated = function () {

    return true;
  };

  dispatcher.register(actions.USER_LOGIN, function (options) {

  });
});
