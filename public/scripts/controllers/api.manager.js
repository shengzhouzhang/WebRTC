define([
  'dispatcher',
  'actions',

  'insident.api',
  ], function (dispatcher, actions, insidentApi) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    console.log('APIS_READY');
  });

  dispatcher.register(actions.REQUEST_INSIDENT, insidentApi.request.bind(insidentApi));
});
