require.config({

  deps: ['main'],

  paths: {

    EventEmitter: '../lib/EventEmitter.min',

    // dispatcher
    dispatcher: './dispatcher/dispatcher',

    // actions
    'store.actions': './actions/store.actions/store.actions',

    // stores
    'event.store': './stores/event.store',

    // actions
    actions: './actions/actions',

    // flux
    flux: './flux/flux'
  }
});
