/** @jsx React.DOM */
define(['dispatcher', 'actions', 'timeline.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    render: function () {
      return (
        <div className="incident" data-home-alarm-id={this.props.homeId}>
          <div className="cover" style={{backgroundImage: 'url(' + this.props.event.cover + ')'}}></div>
          <div className="timestamp">{moment(this.props.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          <div className="address">{this.props.address}</div>
        </div>
      );
    }
  });

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
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incident/' + $(event.target).attr('data-home-alarm-id') });
    },

    render: function () {
      var incidents = _.map(this.state.timeline, function (incident) {
        return (
          <Incident key={incident.id} homeId={incident.home_alarm_id} address={incident.address} event={incident.event} createdAt={incident.created_at} />
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
