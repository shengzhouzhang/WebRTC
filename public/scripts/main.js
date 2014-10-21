require([
  'dispatcher',
  'actions',

  'view.manager',
  'api.manager',
  'router'
  ], function (dispatcher, actions, views) {
  'use strict';

  dispatcher.dispatch(actions.APP_INIT).done(function () {

    dispatcher.dispatch(actions.APP_START)
  });
});
