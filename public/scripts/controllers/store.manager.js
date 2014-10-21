define([
  'dispatcher',
  'actions',

  'insident.store',
  ], function (dispatcher, actions, insidentStore) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    insidentStore.init();

    console.log('STORES_READY');
  });
});
