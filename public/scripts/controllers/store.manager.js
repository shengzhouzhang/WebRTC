define([
  'dispatcher',
  'actions',

  'user.store',
  'incident.store',
  'message.store',
  ], function (dispatcher, actions, userStore, incidentStore, messageStore) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    userStore.init();
    incidentStore.init();
    messageStore.init();
    console.log('STORES_READY');
  });
});
