/** @jsx React.DOM */
define(['dispatcher', 'actions', 'message.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Message = React.createClass({

    getInitialState: function () {
      return {};
    },

    componentDidMount: function () {
      store.addEventListener(this._onLoad);
      $(_container).delegate('a', 'click', this._onClose);
    },

    componentWillUnmount: function () {
      store.removeEventListener(this._onLoad);
      $(_container).undelegate('a', 'click', this._onClose);
    },

    _onLoad: function () {
      var data = store.get();

      if(!data || !data.message) { this._close(); return; }

      this.setState(data);

      if($('#login-container').css('display') !== 'none') {
        $(_container).addClass('shown');
      } else {
        $(_container).addClass('shown-width-header');
      }

      var timeout;

      if(data.type === 'success') { timeout = 1500; }
      if(data.type === 'warning') { timeout = 2000; }

      if(!timeout) { return; }
      setTimeout(dispatcher.dispatch.bind(undefined, actions.CLEAR_MESSAGE), timeout);
    },

    _close: function () {
      $(_container).removeClass('shown');
      $(_container).removeClass('shown-width-header');
    },

    _onClose: function (event) {
      event.preventDefault();
      this._close();
    },

    render: function () {
      return (
        <div className={ this.state.type || 'message' }>
          {this.state.message}
          <a href="#"><i className="fa fa-times"></i></a>
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
