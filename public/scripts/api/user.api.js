define(['dispatcher', 'actions'], function (dispatcher, actions) {
  'use strict';

  var User = {

    login: function (options) {
      if(!options || !options.username || !options.password) { throw new Error ('missing values'); }

      $.ajax({
        type: 'POST',
        url: '/user/login',
        data: JSON.stringify(options),
        contentType: 'application/json',
        success: dispatcher.dispatch.bind(undefined, actions.UPDATE_USER_STORE),
        error: function (xhr) {
          switch(xhr.status) {
            case 401:
              console.log('login', 401);
              break;
            default:
              break;
          }
        }
      });
    }
  };

  dispatcher.dispatch(actions.USER_LOGIN, User.login);

  return;
});
