/** @jsx React.DOM */
define(['dispatcher', 'actions', 'timeline.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    render: function () {
      return (
        <div className="incident" data-home-alarm-id={this.props.homeId}>
        </div>
      );
    }
  });

  var toIncidentView = dispatcher.dispatch.bind(undefined, actions.TO_INCIDENT_VIEW);

  var Images = React.createClass({

    getInitialState: function () {
      return { timeline: [] };
    },

    componentDidMount: function () {
      store.addEventListener(this._onLoad);
      $(_container).delegate('div.incident', 'click', this._onClick);
    },

    componentWillUnmount: function () {
      store.removeEventListener(this._onLoad);
      $(_container).undelegate('div.incident', 'click', this._onClick);
    },

    _onLoad: function () {
      this.setState({
        timeline: store.get()
      });
    },

    _onClick: function (event) {
      toIncidentView($(event.target).attr('data-home-alarm-id'));
    },

    render: function () {
      var incidents = _.map(this.state.timeline, function (incident) {
        console.log(incident);
        return (
          <Incident key={incident.id} homeId={incident.home_alarm_id} />
        );
      });

      return (<div className="timeline">{incidents}</div>);
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
