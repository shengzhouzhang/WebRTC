/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var _container, _store, _component;

  var Image = React.createClass({

    render: function () {

      return (
        <div className="image">
          <a href="#" data-snapshot-id={this.props.key}>
            <img src={this.props.url} />
          </a>
        </div>
      );
    }
  });

  var Images = React.createClass({

    getInitialState: function () {
      return {
        id: undefined,
        images: []
      };
    },

    componentDidMount: function () {
      _store.addEventListener(this._onLoad);
    },

    componentWillUnmount: function () {
      _store.removeEventListener(this._onLoad);
    },

    _onLoad: function () {
      this.setState(_store.get());
    },

    render: function () {

      var images = this.state.images.map(function (image) {
        return (
          <Image key={image.id} url={image.url} />
        );
      });

      return (<div className="row">{images}</div>);
    }
  });

  return {

    init: function (store, container) {
      _store = store;
      _container = container;
      _component = React.renderComponent(
        Images(null),
        _container
      );
    },

    fadeIn: function (cb) {
      $(_container).fadeIn('slow', cb);
    },

    hide: function () {
      $(_container).hide();
    }
  };
});
