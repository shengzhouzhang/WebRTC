require([
  'dispatcher',
  'actions',

  // controllers

  'view.manager',
  'api.manager',
  'store.manager',

  // router

  'router'
  
  ], function (dispatcher, actions) {
  'use strict';

  dispatcher.dispatch(actions.APP_INIT).done(function () {

    dispatcher.dispatch(actions.APP_START)
  });
});
