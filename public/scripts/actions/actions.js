
define(['dispatcher'],
  function (dispatcher) {
  'use strict';

  var actions = {

    // app

    APP_INIT: 'APP_INIT',
    APP_START: 'APP_START',

    // timeline actions
    UPDATE_TIMELINE_STORE: 'UPDATE_TIMELINE_STORE',

    // incident acitons

    REQUEST_incident: 'REQUEST_incident',
    UPDATE_incident_STORE: 'UPDATE_incident_STORE',
    TO_incident_VIEW: 'TO_incident_VIEW',

    // authenticate actions

    REQUIRE_AUTH: 'REQUIRE_AUTH',
    USER_LOGIN: 'USER_LOGIN',
    UPDATE_USER_STORE: 'UPDATE_USER_STORE',
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
