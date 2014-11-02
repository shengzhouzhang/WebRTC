/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Message = React.createClass({

    _refresh: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents' });
    },

    _sidebar: function (event) {
      event.preventDefault();
      $('#sidebar-container').addClass('shown');
    },

    alarmOn: function () {
      $(_container).find('a.alarm i').removeClass('fa-bell-o')
        .addClass('fa-bell');
    },

    alarmOff: function () {
      $(_container).find('a.alarm i').removeClass('fa-bell')
        .addClass('fa-bell-o');
    },

    _alarm: function (event) {
      event.preventDefault();
    },

    render: function () {
      return (
        <div className="header">
          <div className="menu"><a href="#" onClick={this._sidebar}><i className="fa fa-bars"></i></a></div>
          <div className="actions">
            <a href="#" className="alarm" onClick={this._alarm}><i className="fa fa-bell-o"></i></a>
            <a href="#" className="refresh" onClick={this._refresh}><i className="fa fa-refresh"></i></a>
            <a href="#" onClick={function (event) { event.preventDefault(); } }><i className="fa fa-ellipsis-v"></i></a>
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
    }
  };

  return message;
});
