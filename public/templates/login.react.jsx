/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _component;

  var Login = React.createClass({

    getInitialState: function () {
      return {
        disabled: true
      };
    },

    _onKeyPress: function () {
      var code = (event.keyCode ? event.keyCode : event.which);
      if (code !== 13) { return; }
      this._login();
    },

    _login: function () {

      var username = $('#login-username').val(),
          password = $('#login-password').val();

      if(!username || !password) { return; }

      this._disable();

      dispatcher.dispatch(actions.USER_LOGIN, {
        username: username,
        password: password
      });
    },

    _enable: function () {
      this.setState({ disabled: false });
    },

    _disable: function () {
      this.setState({ disabled: true });
    },

    render: function () {
      return (
        <div className="login-window">
          <p>
            <span className="title">Incident Response Center</span>
            <span className="icon--logo-text brand"></span>
            <span className="icon--logo brand"></span>
          </p>
          <p><input id="login-username" type="email" placeholder="Email" /></p>
          <p><input id="login-password" type="password" placeholder="Password" onInput={this._enable} onKeyPress={this._onKeyPress}/></p>
          <button id="login-submit" disabled={this.state.disabled} onClick={this._login}>
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
