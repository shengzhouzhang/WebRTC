define([
  'dispatcher',
  'actions',

  ], function (dispatcher, actions) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'default'
    }
  });

  var router = new AppRouter;

  router.on('route:default', function () {

    dispatcher.dispatch(actions.REQUEST_INSIDENT);
  });

  return router;
});
