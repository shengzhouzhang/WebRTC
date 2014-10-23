define([
  'dispatcher',
  'actions',

  'user.store',
  'insident.store',
  'message.store',
  ], function (dispatcher, actions, userStore, insidentStore, messageStore) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    userStore.init();
    insidentStore.init();
    messageStore.init();
    console.log('STORES_READY');
  });
});
