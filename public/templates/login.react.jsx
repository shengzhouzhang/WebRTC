/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Login = React.createClass({

    _onClick: function () {
      var username = $('#login-username').val(),
          password = $('#login-password').val();

      if(!username || !password) { return; }

      dispatcher.dispatch(actions.USER_LOGIN, {
        username: username,
        password: password
      });
    },

    _onKeyPress: function () {
      var code = (event.keyCode ? event.keyCode : event.which);
      if (code !== 13) { return; }

      var username = $('#login-username').val(),
          password = $('#login-password').val();

      if(!username || !password) { return; }

      dispatcher.dispatch(actions.USER_LOGIN, {
        username: username,
        password: password
      });
    },

    render: function () {
      return (
        <div className="login-window">
          <img src="/img/logo-dark.png" />
          <p><input id="login-username" type="email" placeholder="Email" /></p>
          <p><input id="login-password" type="password" placeholder="Password" onKeyPress={this._onKeyPress}/></p>
          <button id="login-submit" onClick={this._onClick}>
            Go
          </button>
        </div>
      );
    }
  });

  var login = {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Login(null),
        _container
      );
    }
  };

  return login;
});
