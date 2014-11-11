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
    'sidebar.view': './views/sidebar.react',
    'timeline.view': './views/timeline.react',
    'incident.view': './views/incident.react',
    'message.view': './views/message.react',


    // component
    'contact.component': './views/components/contact.react',
    'snapshot.component': './views/components/snapshot.react',
    'event.component': './views/components/event.react',
    'note.component': './views/components/note.react',
    'notes.component': './views/components/notes.react',
    'border.component': './views/components/border.react',

    // stores
    'user.store': './stores/user.store',
    'timeline.store': './stores/timeline.store',
    'incident.store': './stores/incident.store',
    'message.store': './stores/message.store',

    // api
    'user.api': './api/user.api',
    'timeline.api': './api/timeline.api',
    'incident.api': './api/incident.api',
    'notes.api': './api/notes.api',


    'websocket.client': './websocket/websocket.client',


    // router
    router: './router/router',

    // controllers
    'global.error.handler': './controllers/global.error.handler',
    'view.manager': './controllers/view.manager',
    'api.manager': './controllers/api.manager',
    'store.manager': './controllers/store.manager',
    'socket.manager': './controllers/socket.manager',
    'user.authenticate': './controllers/user.authenticate',


    // flux
    flux: './flux/flux'
  }
});
