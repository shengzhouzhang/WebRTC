define([
  'dispatcher',
  'actions',

  'user.store',
  'insident.store',
  ], function (dispatcher, actions, userStore, insidentStore) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    userStore.init();
    insidentStore.init();
    console.log('STORES_READY');
  });
});
