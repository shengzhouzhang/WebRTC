/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Siderbar = React.createClass({

    componentDidMount: function () {
      $(_container).click(this._onClose);
    },

    componentWillUnmount: function () {
    },

    _open: function () {
      $(_container).addClass('shown');
    },

    _close: function () {
      $(_container).removeClass('shown');
    },

    _toTimelineView: function (event) {
      event.preventDefault();
      this._close();
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents' });
    },

    render: function () {
      return (
        <div className="sidebar">
          <div className="header">Menu</div>
          <div className="menu">
            <a href="#" onClick={this._toTimelineView}>Incidents</a>
            <a href="#" >Guide</a>
            <a href="#" >About</a>
            <a href="#" >Sign Out</a>
          </div>
        </div>
      );
    }
  });

  var siderbar = {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Siderbar(null),
        _container
      );
    }
  };

  return siderbar;
});
