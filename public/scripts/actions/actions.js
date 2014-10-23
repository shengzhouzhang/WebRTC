
define(['dispatcher'],
  function (dispatcher) {
  'use strict';

  var actions = {

    // app

    APP_INIT: 'APP_INIT',
    APP_START: 'APP_START',

    // insident acitons

    REQUEST_INSIDENT: 'REQUEST_INSIDENT',
    UPDATE_INSIDENT_STORE: 'UPDATE_INSIDENT_STORE',
    TO_INSIDENT_VIEW: 'TO_INSIDENT_VIEW',

    // authenticate actions

    REQUIRE_AUTH: 'REQUIRE_AUTH',
    USER_LOGIN: 'USER_LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    TO_LOGIN_VIEW: 'TO_LOGIN_VIEW',

    // message actions

    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',

    // error handler actions

    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',

    UNEXPECTED_ERROR_CODE: 'UNEXPECTED_ERROR_CODE',
  };

  return actions;
});
