
define(['dispatcher'],
  function (dispatcher) {
  'use strict';

  var actions = {

    // app

    APP_INIT: 'APP_INIT',
    APP_START: 'APP_START',

    // router

    NAVIGATE_TO_VIEW: 'NAVIGATE_TO_VIEW',

    // timeline actions

    UPDATE_TIMELINE_STORE: 'UPDATE_TIMELINE_STORE',
    TO_TIMELINE_VIEW: 'TO_TIMELINE_VIEW',
    REQUEST_TIMELINE: 'REQUEST_TIMELINE',

    // incident acitons

    REQUEST_INCIDENT: 'REQUEST_INCIDENT',
    UPDATE_INCIDENT_STORE: 'UPDATE_INCIDENT_STORE',
    TO_INCIDENT_VIEW: 'TO_INCIDENT_VIEW',

    // authenticate actions

    REQUIRE_AUTH: 'REQUIRE_AUTH',
    USER_LOGIN: 'USER_LOGIN',
    UPDATE_USER_STORE: 'UPDATE_USER_STORE',
    LOGIN_FAILED: 'LOGIN_FAILED',
    TO_LOGIN_VIEW: 'TO_LOGIN_VIEW',

    // message actions

    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',

    // web socket

    REQUEST_UNPDATES: 'REQUEST_UNPDATES',

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
