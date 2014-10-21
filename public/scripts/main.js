require([
  'dispatcher',
  'actions',

  'insident.store',
  'insident.api'
  ], function (dispatcher, actions, store, api) {
  'use strict';


  dispatcher.dispatch(actions.APP_READY);

  api.request();
});
