define([
  'dispatcher',
  'actions',

  'insident.api',
  ], function (dispatcher, actions, insidentApi) {
  'use strict';


  dispatcher.register(actions.REQUEST_INSIDENT, insidentApi.request.bind(insidentApi));
});
