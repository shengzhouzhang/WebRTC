define([
  'dispatcher',
  'actions',

  'header.view',
  'login.view',
  'timeline.view',
  'incident.view',

  'message.view'
  ], function (dispatcher, actions, headerView, loginView, timelineView, incidentView, messageView) {
  'use strict';

  var _views;

  var views = {

    init: function () {
      _views = $('div[container]');

      // init all views

      headerView.init(_views.filter('#header-container')[0]);
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

        dispatcher.dispatch(actions.SOCKET_CONNECT);

        _views.filter('#incident-container').fadeIn('slow');
        dispatcher.dispatch(actions.REQUEST_INCIDENT, options);
      });
    });
  });

  dispatcher.register(actions.TO_TIMELINE_VIEW, function (options) {
    dispatcher.dispatch(actions.REQUIRE_AUTH).then(function () {
      _fadeOut().then(function () {

        dispatcher.dispatch(actions.SOCKET_CONNECT);

        _views.filter('#timeline-container').fadeIn('slow');
        dispatcher.dispatch(actions.REQUEST_TIMELINE);
      });
    });
  });

  dispatcher.register(actions.TO_LOGIN_VIEW, function (options) {
    _fadeOut().then(function () {

      _views.filter('#login-container').show()
      .find('div.login-window').fadeIn('slow');
    });
  });

  // message bar

  dispatcher.register(actions.NEW_CASE, function (incident) {

    var msg = 'New Incidents' + (!!incident ? ' at ' + moment(incident.created_at).format('HH:mm:ss') : '');
    dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: msg })
  });

  // header

  dispatcher.register(actions.NEW_CASE, dispatcher.dispatch.bind(undefined, actions.ALARM_ON));
  dispatcher.register(actions.NO_NEW_CASE, dispatcher.dispatch.bind(undefined, actions.ALARM_OFF));

  // app

  dispatcher.register(actions.APP_INIT, views.init.bind(views));

  return views;
});
