define([
  'dispatcher',
  'actions',

  'insident.view',
  ], function (dispatcher, actions, insidentView) {
  'use strict';

  var _views;

  var views = {

    init: function () {
      _views = $('div[container]').hide();
      insidentView.init(_views.filter('#insident-container')[0]);
      console.log('VIEWS_READY');
    }
  };

  dispatcher.register(actions.TO_INSIDENT_VIEW, function (options) {
    if(!_views) { throw new Error ('empty views'); }

    _views.filter('#insident-container').fadeIn();

    dispatcher.dispatch(actions.REQUEST_INSIDENT);
  });

  dispatcher.register(actions.APP_INIT, views.init.bind(views));

  return views;
});
