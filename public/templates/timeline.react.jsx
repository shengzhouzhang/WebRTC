/** @jsx React.DOM */
define(['dispatcher', 'actions', 'timeline.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    render: function () {

      return (
        <div className="incident">
        </div>
      );
    }
  });

  var Images = React.createClass({

    getInitialState: function () {
      return {
        id: undefined,
        incidents: []
      };
    },

    componentDidMount: function () {
      store.addEventListener(this._onLoad);
    },

    componentWillUnmount: function () {
      store.removeEventListener(this._onLoad);
    },

    _onLoad: function () {
      console.log('_onLoad');
      this.setState(store.get());
    },

    render: function () {

      var incidents = this.state.incidents.map(function (incident) {
        return (
          <Incident key={incident.id} />
        );
      });

      return (<div className="row">{incidents}</div>);
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
