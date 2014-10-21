require.config({

  deps: ['main'],

  paths: {

    EventEmitter: '../lib/EventEmitter.min',

    // dispatcher
    dispatcher: './dispatcher/dispatcher',

    // actions
    actions: './actions/actions',

    // stores
    'insident.store': './stores/insident.store',

    // actions
    actions: './actions/actions',

    // api
    'insident.api': './api/insident.api',

    // flux
    flux: './flux/flux'
  }
});
