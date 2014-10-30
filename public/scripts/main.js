require([
  'dispatcher',
  'actions',

  // controllers

  'global.error.handler',
  'view.manager',
  'api.manager',
  'store.manager',
  'socket.manager',
  'user.authenticate',

  // router

  'router'

  ], function (dispatcher, actions) {
  'use strict';

  dispatcher.dispatch(actions.APP_INIT).then(function () {

    dispatcher.dispatch(actions.APP_START)
  });
});
