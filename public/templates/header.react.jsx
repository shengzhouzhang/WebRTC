/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Message = React.createClass({

    render: function () {
      return (
        <div className="header">
          <div className="menu"><a href="#" ><i className="fa fa-bars"></i></a></div>
          <div className="actions">
            <a href="#" ><i className="fa fa-bell-o"></i></a>
            <a href="#" ><i className="fa fa-refresh"></i></a>
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
    }
  };

  return message;
});
