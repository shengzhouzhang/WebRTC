/** @jsx React.DOM */
define(['dispatcher', 'actions', 'timeline.store', 'border.component'],
       function (dispatcher, actions, store, Border) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    componentDidMount: function () {
      setTimeout(function () {
        $(this.getDOMNode()).removeClass('opacity');
      }.bind(this), 100)
    },

    _onClick: function (event) {
      event.preventDefault();
      if(!this.props.key) { return; }
      dispatcher.dispatch(actions.NAVIGATE_TO_VIEW, { uri: 'incidents/' + this.props.key });
    },

    render: function () {

      var status = 'action ' + (this.props.status.join(' ') || this.props.action);

      var owner = !!this.props.contacts ? [this.props.contacts.first_name, this.props.contacts.last_name].join(' ') : '';

      return (
        <div className="incident opacity" onClick={this._onClick} >
          <div className="cover" style={{backgroundImage: 'url(' + this.props.event.cover + ')'}}></div>
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
          <div className="owner">{owner}</div>
          <div className={status}></div>
          <div className="timestamp">
            <span className="date">{moment(this.props.createdAt).format('Do MMM YYYY')}</span>
            <span className="time">{moment(this.props.createdAt).format('hh:mmA')}</span>
          </div>
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
    },

    render: function () {
      var incidents = _.map(this.state.timeline, function (incident, index) {

        return (
          <Incident key={incident.id} home={incident.home} status={incident.status} contacts={incident.contacts} action={incident.action} event={incident.event} createdAt={incident.created_at} />
        );
      }.bind(this));

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
