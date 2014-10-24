define([
  'dispatcher',
  'actions',

  ], function (dispatcher, actions) {
  'use strict';

  dispatcher.register(actions.APP_START, function (options) {

    var AppRouter = Backbone.Router.extend({
      routes: {
        '*actions': 'default'
      }
    });

    var router = new AppRouter;

    router.on('route:default', dispatcher.dispatch.bind(undefined, actions.TO_incident_VIEW));

    Backbone.history.start();
  });
});
