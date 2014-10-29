/** @jsx React.DOM */
define(['dispatcher', 'actions', 'incident.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Snapshot = React.createClass({

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

  var Event = React.createClass({

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

      var snapshots = this.props.snapshots.map(function (snapshot) {
        return (
          <Snapshot key={snapshot.id} url={snapshot.url} />
        );
      });

      return (<div className="row">{snapshots}</div>);
    }
  });

  var Events = React.createClass({

    getInitialState: function () {
      return {
        events: []
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

      var events = this.state.events.map(function (event, index) {
        // TODO: need to have unique id
        return (
          <Event key={event.id + index} start={event.start} end={event.end} snapshots={event.snapshots} />
        );
      }.bind(this));

      return (<div className="row">{events}</div>);
    }
  });

  return {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Events(null),
        _container
      );
    }
  };
});
