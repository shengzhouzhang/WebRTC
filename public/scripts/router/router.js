define([
  'dispatcher',
  'actions',

  ], function (dispatcher, actions) {
  'use strict';

  var router;

  dispatcher.register(actions.APP_START, function (options) {

    var AppRouter = Backbone.Router.extend({
      routes: {
        'incident/:id': 'incident',
        '*actions': 'incidents'
      }
    });

    router = new AppRouter;

    router.on('route:incident', dispatcher.dispatch.bind(undefined, actions.TO_INCIDENT_VIEW));
    router.on('route:incidents', dispatcher.dispatch.bind(undefined, actions.TO_TIMELINE_VIEW));

    Backbone.history.start();
  });

  dispatcher.register(actions.NAVIGATE_TO_VIEW, function (options) {
    if(!router) { throw new Error ('router is not available')};
    router.navigate(options.uri, {trigger: true});
  });
});
