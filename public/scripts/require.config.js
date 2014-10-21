require.config({

  deps: ['main'],

  paths: {

    EventEmitter: '../lib/EventEmitter.min',

    // dispatcher
    dispatcher: './dispatcher/dispatcher',

    // actions
    actions: './actions/actions',

    // views
    'insident.view': './views/insident.react',

    // stores
    'insident.store': './stores/insident.store',

    // api
    'insident.api': './api/insident.api',

    // flux
    flux: './flux/flux'
  }
});
