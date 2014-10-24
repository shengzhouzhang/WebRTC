/** @jsx React.DOM */
define(['dispatcher', 'actions', 'incident.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

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
      store.addEventListener(this._onLoad);
    },

    componentWillUnmount: function () {
      store.removeEventListener(this._onLoad);
    },

    _onLoad: function () {
      this.setState(store.get());
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

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Images(null),
        _container
      );
    }
  };
});
