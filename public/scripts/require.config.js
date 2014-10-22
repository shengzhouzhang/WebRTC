require.config({

  deps: ['main'],

  paths: {

    EventEmitter: '../lib/EventEmitter.min',

    // dispatcher
    dispatcher: './dispatcher/dispatcher',

    // actions
    actions: './actions/actions',

    // views
    'login.view': './views/login.react',
    'insident.view': './views/insident.react',

    // stores
    'user.store': './stores/user.store',
    'insident.store': './stores/insident.store',

    // api
    'insident.api': './api/insident.api',

    // router
    router: './router/router',

    // controllers
    'view.manager': './controllers/view.manager',
    'api.manager': './controllers/api.manager',
    'store.manager': './controllers/store.manager',
    'user.authenticate': './controllers/user.authenticate',

    // flux
    flux: './flux/flux'
  }
});
