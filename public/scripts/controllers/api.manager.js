define([
  'dispatcher',
  'actions',

  'user.api',
  'insident.api',
  ], function (dispatcher, actions, userApi, insidentApi) {
  'use strict';

  dispatcher.register(actions.APP_INIT, function (options) {

    $.ajaxSetup({
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      statusCode: {
        400: dispatcher.dispatch.bind(undefined, actions.BAD_REQUEST),
        401: dispatcher.dispatch.bind(undefined, actions.UNAUTHORIZED),
        403: dispatcher.dispatch.bind(undefined, actions.FORBIDDEN),
        404: dispatcher.dispatch.bind(undefined, actions.NOT_FOUND),
        408: dispatcher.dispatch.bind(undefined, actions.REQUEST_TIMEOUT),
      }
    });

    console.log('APIS_READY');
  });

});
