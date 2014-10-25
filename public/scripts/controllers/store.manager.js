define([
  'dispatcher',
  'actions',

  'user.store',
  'timeline.store',
  'incident.store',
  'message.store',
  ], function (dispatcher, actions, userStore, timelineStore, incidentStore, messageStore) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    userStore.init();
    timelineStore.init();
    incidentStore.init();
    messageStore.init();
    console.log('STORES_READY');
  });
});
