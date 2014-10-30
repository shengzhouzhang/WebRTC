/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Message = React.createClass({


    componentDidMount: function () {
      $(_container).delegate('a.refresh', 'click', this._refresh);
    },

    componentWillUnmount: function (event) {
      $(_container).undelegate('a.refresh', 'click', this._refresh);
    },

    _refresh: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.TO_TIMELINE_VIEW);
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
          <div className="menu"><a href="#" ><i className="fa fa-bars"></i></a></div>
          <div className="actions">
            <a href="#" className="alarm" ><i className="fa fa-bell-o"></i></a>
            <a href="#" className="refresh" ><i className="fa fa-refresh"></i></a>
            <a href="#" ><i className="fa fa-ellipsis-v"></i></a>
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

      dispatcher.register(actions.NEW_CASE, _component.alarmOn.bind(_component));
    }
  };

  return message;
});
