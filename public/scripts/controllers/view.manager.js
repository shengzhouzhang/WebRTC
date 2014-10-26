define([
  'dispatcher',
  'actions',

  'login.view',
  'timeline.view',
  'incident.view',

  'message.view'
  ], function (dispatcher, actions, loginView, timelineView, incidentView, messageView) {
  'use strict';

  var _views;

  var views = {

    init: function () {
      _views = $('div[container]');

      // init all views

      loginView.init(_views.filter('#login-container')[0]);
      timelineView.init(_views.filter('#timeline-container')[0]);
      incidentView.init(_views.filter('#incident-container')[0]);
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

  dispatcher.register(actions.TO_INCIDENT_VIEW, function (options) {
    dispatcher.dispatch(actions.REQUIRE_AUTH).then(function () {
      _fadeOut().then(function () {

        _views.filter('#incident-container').fadeIn('slow');
        dispatcher.dispatch(actions.REQUEST_INCIDENT);
      });
    });
  });

  dispatcher.register(actions.TO_TIMELINE_VIEW, function (options) {
    // dispatcher.dispatch(actions.REQUIRE_AUTH).then(function () {
      _fadeOut().then(function () {

        _views.filter('#timeline-container').fadeIn('slow');
        dispatcher.dispatch(actions.REQUEST_TIMELINE);
      });
    // });
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
