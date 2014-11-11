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
          <div className="address">
            {
              [
                this.props.home.address.street,
                this.props.home.address.city,
                this.props.home.address.postcode,
                this.props.home.address.country
              ].join(' ')
            }
          </div>
          <div className="status">{this.props.status}</div>
        </div>
      );
    }
  });

  var Incidents = React.createClass({

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

      var timestamp = !!this.state.timeline[0] ? this.state.timeline[0].created_at : moment().valueOf();

      var updates = _.filter(incidents, function (incident) {
        return incident.created_at > timestamp;
      });

      if (!!updates.length) {
        dispatcher.dispatch(actions.UPDATE_MESSAGE, {
          message: updates.length + ' new incidents',
          type: 'success'
        });
      }

      this.setState({
        timeline: incidents
      });

      if(Backbone.history.fragment !== 'incidents' || !incidents.length) { return; }

      dispatcher.dispatch(actions.REQUEST_UNPDATES, {
        timestamp: _.max(incidents, function (incident) { return incident.created_at; }).created_at
      });
    },

    render: function () {
      var incidents = _.map(this.state.timeline, function (incident) {
        return (
          <Incident key={incident.id} home={incident.home} status={incident.status} event={incident.event} createdAt={incident.created_at} />
        );
      });

      return (<div className="timeline">{incidents}</div>);
    }
  });

  return {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Incidents(null),
        _container
      );
    },

    render: function () {
      $(_container).fadeIn('slow');
    }
  };
});
