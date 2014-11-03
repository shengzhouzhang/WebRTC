/** @jsx React.DOM */
define(['dispatcher', 'actions', 'timeline.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    _onClick: function (event) {
      event.preventDefault();
      if(!this.props.key) { return; }
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents/' + this.props.key });
    },

    render: function () {
      return (
        <div className="incident" onClick={this._onClick} >
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
    },

    componentWillUnmount: function () {
      store.removeEventListener(this._onLoad);
    },

    _onLoad: function () {
      var incidents = _.sortBy(store.get(), function (incident) { return -incident.created_at; });

      this.setState({
        timeline: incidents
      });

      var timestamp = !!incidents && !!incidents[0] ? incidents[0].created_at: null;

      dispatcher.dispatch(actions.REQUEST_UNPDATES, { timestamp: timestamp });
    },

    render: function () {
      var incidents = _.map(this.state.timeline, function (incident) {
        return (
          <Incident key={incident.id} address={incident.address} event={incident.event} createdAt={incident.created_at} />
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
