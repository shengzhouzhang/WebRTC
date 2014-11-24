/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component, _previous;

  var Message = React.createClass({

    _refresh: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents', refresh: true });
    },

    _sidebar: function (event) {
      event.preventDefault();
      $('#sidebar-container').addClass('shown');
      $('#timeline-container').addClass('blur');
      $('#incident-container').addClass('blur');
    },

    _back: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: Backbone.history._back || 'incidents', refresh: true });
    },

    alarmOn: function () {
      $(_container).find('a.alarm i').removeClass('fa-bell-o')
        .addClass('fa-bell');
    },

    alarmOff: function () {
      $(_container).find('a.alarm i').removeClass('fa-bell')
        .addClass('fa-bell-o');
    },

    render: function () {

      return (
        <div className="header">
          <div className="menu"><a href="#" onClick={this._sidebar}><i className="fa fa-bars"></i></a></div>
          <div className="backbtn"><a href="#" onClick={this._back}><i className="fa fa-chevron-left"></i></a></div>
          <div className="brand">
            <span className="icon--logo-text"></span>
            <span>Incident Response Center</span>
          </div>
          <div className="actions">
            <a href="#" className="alarm" onClick={this._refresh}><i className="fa fa-bell-o"></i></a>
            <a href="#" className="refresh" onClick={this._refresh}><i className="fa fa-refresh"></i></a>
          </div>
        </div>
      );
    }
  });

  var message = {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Message(null),
        _container
      );

      dispatcher.register(actions.ALARM_ON, _component.alarmOn);
      dispatcher.register(actions.ALARM_OFF, _component.alarmOff);
    },

    render: function (page, back) {
      $(_container).addClass('shown');
      switch(page) {
        case 'TIMELINE_VIEW':
          $(_container).find('.menu').show();
          $(_container).find('.backbtn').hide();
          break;
        case 'INCIDENT_VIEW':
          $(_container).find('.menu').hide();
          $(_container).find('.backbtn').show();
          break;
        case 'MYCASES_VIEW':
          $(_container).find('.menu').show();
          $(_container).find('.backbtn').hide();
          break;
      }
      _previous = back;
    }
  };

  return message;
});
