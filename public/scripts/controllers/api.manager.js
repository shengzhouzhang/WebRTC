define([
  'dispatcher',
  'actions',

  'user.api',
  'timeline.api',
  'incident.api',

  'websocket.client',
  
  ], function (dispatcher, actions, userApi, incidentApi) {
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
        500: dispatcher.dispatch.bind(undefined, actions.INTERNAL_SERVER_ERROR),
      }
    });

    console.log('APIS_READY');
  });

});
