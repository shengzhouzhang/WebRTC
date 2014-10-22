
define(['dispatcher'],
  function (dispatcher) {
  'use strict';

  var actions = {

    // app

    APP_INIT: 'APP_INIT',

    APP_START: 'APP_START',

    // stores actions

    UPDATE_INSIDENT_STORE: 'UPDATE_INSIDENT_STORE',

    // api acitons

    REQUEST_INSIDENT: 'REQUEST_INSIDENT',

    // view actions

    TO_LOGIN_VIEW: 'TO_LOGIN_VIEW',

    TO_INSIDENT_VIEW: 'TO_INSIDENT_VIEW',

    // user actions

    REQUIRE_AUTH: 'REQUIRE_AUTH',

    // authenticate actions

    USER_LOGIN: 'USER_LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',

  };

  return actions;
});
