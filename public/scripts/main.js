require([
  'dispatcher',
  'actions',

  'insident.view',
  'insident.store',
  'insident.api'
  ], function (dispatcher, actions, view, store, api) {
  'use strict';

  var insidentContainer = document.getElementById('insident-container');

  view.init(store, insidentContainer);

  dispatcher.dispatch(actions.APP_READY);
  dispatcher.dispatch(actions.REQUEST_INSIDENT);
});
