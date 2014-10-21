require.config({

  deps: ['../main'],

  paths: {

    EventEmitter: '../../lib/EventEmitter.min',

    // dispatcher
    dispatcher: '../dispatcher/dispatcher',

    // actions
    'store.actions': '../actions/store.actions/store.actions',

    // stores
    'store.base': './stores/base/store'
  }
});
