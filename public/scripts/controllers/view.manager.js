define([
  'dispatcher',
  'actions',

  'login.view',
  'insident.view',

  'message.view'
  ], function (dispatcher, actions, loginView, insidentView, messageView) {
  'use strict';

  var _views;

  var views = {

    init: function () {
      _views = $('div[container]');

      // init all views

      loginView.init(_views.filter('#login-container')[0]);
      insidentView.init(_views.filter('#insident-container')[0]);
      messageView.init(_views.filter('#message-container')[0]);

      console.log('VIEWS_READY');
    }
  };

  var _fadeOut = function () {
    var animates = _.map(_views, function (view) {
      if(!$(view).attr('hidden')) { return; }
      return new Promise(function (resolve, reject) {
        $(view).fadeOut('slow', resolve);
      });
    });

    dispatcher.dispatch(actions.CLEAR_MESSAGE);
    return Promise.all(animates);
  }

  dispatcher.register(actions.TO_INSIDENT_VIEW, function (options) {
    dispatcher.dispatch(actions.REQUIRE_AUTH).then(function () {
      _fadeOut().then(function () {

        _views.filter('#insident-container').fadeIn('slow');
        dispatcher.dispatch(actions.REQUEST_INSIDENT);
      });
    });
  });

  dispatcher.register(actions.TO_LOGIN_VIEW, function (options) {
    _fadeOut().then(function () {

      _views.filter('#login-container').show()
      .find('div.login-window').fadeIn('slow');
    });
  });

  dispatcher.register(actions.APP_INIT, views.init.bind(views));

  return views;
});
