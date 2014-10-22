define([
  'dispatcher',
  'actions',

  'insident.api',
  ], function (dispatcher, actions, insidentApi) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    $.ajaxSetup({
      statusCode : {
        400: function () {
          console.log('ajaxSetup', 400);
        },
        401: function () {
          console.log('ajaxSetup', 401);
        },
        403: function () {
          console.log('ajaxSetup', 403);
        },
        404: function () {
          console.log('ajaxSetup', 404);
        },
        408: function () {
          console.log('ajaxSetup', 408);
        }
      }
    });

    console.log('APIS_READY');
  });

});
