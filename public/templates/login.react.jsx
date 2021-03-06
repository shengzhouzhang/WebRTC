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
          <div>
            <span className="icon--logo-text brand"></span>
            <span className="title">Incident Response Center</span>
          </div>
          <div><input id="login-username" type="email" placeholder="Email" /></div>
          <div><input id="login-password" type="password" placeholder="Password" onInput={this._enable} onKeyPress={this._onKeyPress}/></div>
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

      dispatcher.register(actions.LOGIN_FAILED, _component._enable.bind(undefined));
    }
  };

  return login;
});
