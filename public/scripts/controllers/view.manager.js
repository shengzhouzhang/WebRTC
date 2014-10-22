define([
  'dispatcher',
  'actions',

  'login.view',
  'insident.view',
  ], function (dispatcher, actions, loginView, insidentView) {
  'use strict';

  var _views;

  var views = {

    init: function () {
      _views = $('div[container]').hide();

      // init all views

      loginView.init(_views.filter('#login-container')[0]);
      insidentView.init(_views.filter('#insident-container')[0]);

      console.log('VIEWS_READY');
    }
  };

  dispatcher.register(actions.TO_INSIDENT_VIEW, function (options) {
    dispatcher.dispatch(actions.REQUIRE_AUTH).then(function () {

      _views.filter('#insident-container').fadeIn();
      dispatcher.dispatch(actions.REQUEST_INSIDENT);
    });
  });

  dispatcher.register(actions.TO_LOGIN_VIEW, function (options) {
    _views.filter('#login-container').fadeIn();
  });

  dispatcher.register(actions.APP_INIT, views.init.bind(views));

  return views;
});
