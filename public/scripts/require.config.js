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
    'header.view': './views/header.react',
    'timeline.view': './views/timeline.react',
    'incident.view': './views/incident.react',
    'message.view': './views/message.react',

    // stores
    'user.store': './stores/user.store',
    'timeline.store': './stores/timeline.store',
    'incident.store': './stores/incident.store',
    'message.store': './stores/message.store',

    // api
    'user.api': './api/user.api',
    'timeline.api': './api/timeline.api',
    'incident.api': './api/incident.api',

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
