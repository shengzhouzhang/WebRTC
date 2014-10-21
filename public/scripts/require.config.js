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

    // router
    router: './router/router',

    // controllers
    'view.manager': './controller/view.manager',
    'api.manager': './controller/api.manager',

    // flux
    flux: './flux/flux'
  }
});
