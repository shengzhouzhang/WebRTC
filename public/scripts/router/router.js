define([
  'dispatcher',
  'actions',

  ], function (dispatcher, actions) {
  'use strict';

  var router;

  dispatcher.register(actions.APP_START, function (options) {

    var AppRouter = Backbone.Router.extend({
      routes: {
        'incidents/request': 'incidents',
        'incidents/:id': 'incident',
        'incidents': 'incidents',
        '*actions': 'redirect'
      }
    });

    router = new AppRouter;

    router.on('route:incident', dispatcher.dispatch.bind(undefined, actions.TO_INCIDENT_VIEW));
    router.on('route:incidents', dispatcher.dispatch.bind(undefined, actions.TO_TIMELINE_VIEW));

    router.on('route:redirect', dispatcher.dispatch.bind(undefined, actions.NAVIGATE_TO_VIEW, { uri: 'incidents '}));

    Backbone.history.start();
  });

  dispatcher.register(actions.NAVIGATE_TO_VIEW, function (options) {
    if(!router) { throw new Error ('router is not available')};

    if(!!options.refresh) { Backbone.history.fragment = null; }
    router.navigate(options.uri, {trigger: true});
  });
});
