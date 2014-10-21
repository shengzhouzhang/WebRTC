
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
    TO_INSIDENT_VIEW: 'TO_INSIDENT_VIEW'

  };

  return actions;
});
