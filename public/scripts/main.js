require([
  'dispatcher',
  'actions',

  'insident.view',
  'insident.store',
  'insident.api',
  'router'
  ], function (dispatcher, actions, view, store, api) {
  'use strict';

  var insidentContainer = document.getElementById('insident-container');

  view.init(store, insidentContainer);

  Backbone.history.start();

  dispatcher.dispatch(actions.APP_READY);
});
