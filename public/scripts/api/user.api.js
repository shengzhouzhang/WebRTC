define(['dispatcher', 'actions'], function (dispatcher, actions) {
  'use strict';

  var User = {

    authenticate: function (options) {
      if(!options || !options.username || !options.password) { throw new Error ('missing values'); }

      $.ajax({
        type: 'POST',
        url: '/user/authenticate',
        data: JSON.stringify(options),
        statusCode: { 400: null, 401: null, 408: null },
        success: dispatcher.dispatch.bind(undefined, actions.UPDATE_USER_STORE),
        error: function (xhr) {
          switch(xhr.status) {
            case 400:
            case 401:
            case 408:
              dispatcher.dispatch(actions.LOGIN_FAILED);
              break;
            default:
              dispatcher.dispatch(actions.UNEXPECTED_ERROR_CODE);
              break;
          }
        }
      });
    }
  };

  dispatcher.register(actions.USER_LOGIN, User.authenticate);

  return;
});
