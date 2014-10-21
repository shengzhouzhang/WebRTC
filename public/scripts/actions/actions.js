
define(['dispatcher'],
  function (dispatcher) {
  'use strict';

  var actions = {

    // app
    APP_READY: 'APP_READY',

    // stores actions
    UPDATE_INSIDENT_STORE: 'UPDATE_INSIDENT_STORE',

    // api acitons
    REQUEST_INSIDENT: 'REQUEST_INSIDENT'

  };

  return actions;
});
