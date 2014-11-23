/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Siderbar = React.createClass({

    componentDidMount: function () {
      $(_container).click(this._close);
    },

    componentWillUnmount: function () {
    },

    _open: function () {
      $(_container).addClass('shown');
    },

    _close: function () {
      $(_container).removeClass('shown');
      $('#timeline-container').removeClass('blur');
      $('#incident-container').removeClass('blur');
    },

    _toTimelineView: function (event) {
      event.preventDefault();
      this._close();
      console.log('incidents');
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents' });
    },

    _toMyCasesView: function (event) {
      event.preventDefault();
      this._close();
      console.log('mycases');
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'mycases' });
    },

    _onClick: function (event) {
      event.preventDefault();
    },

    _logout: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.LOGOUT).then(function () {
        window.location.reload();
      });
    },

    render: function () {
      return (
        <div className="sidebar">
          <div className="header">Menu</div>
          <div className="menu">
            <a href="#" className="fa fa-home" onClick={this._toTimelineView}>Home</a>
            <a href="#" className="fa fa-tags" onClick={this._toMyCasesView}>My Cases</a>
            <a href="#" className="fa fa-info-circle" onClick={this._onClick}>About</a>
            <a href="#" className="fa fa-sign-out" onClick={this._logout}>Sign Out</a>
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
