/** @jsx React.DOM */
define(['dispatcher', 'actions', 'incident.store'],
       function (dispatcher, actions, store) {
  'use strict';

  var _container, _component;

  var Snapshot = React.createClass({

    render: function () {

      return (
        <div className="snapshot">
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

      var snapshots = this.props.snapshots.map(function (snapshot, index) {
        return (
          <Snapshot key={snapshot.id + index} url={snapshot.url} />
        );
      });

      return (
        <div className="event">
          <div className="event-attr"><label>In:</label><span>{moment(this.props.start).format('YYYY-MM-DD HH:mm:ss')}</span></div>
          <div className="event-attr"><label>Out:</label><span>{moment(this.props.end).format('YYYY-MM-DD HH:mm:ss')}</span></div>
          <div className="event-snapshots">{snapshots}</div>
        </div>
      );
    }
  });

  var Events = React.createClass({

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
      if(!this.state || !this.state.event) { return (<div></div>); }

      var events = <Event key={this.state.event.id} start={this.state.event.start} end={this.state.event.end} snapshots={this.state.event.snapshots} />;

      var contacts = _.map(this.state.contact, function (contact, index) {
        return (
          <div key={this.state.home_alarm_id + '_contact_' + index}>
            <span>{contact.name}</span><span>{contact.relationship}</span><span>{contact.phone}</span>
          </div>
        );
      }.bind(this));

      return (
        <div>
          <div className="header">
            <div className="cover" style={{backgroundImage: 'url(' + this.state.event.cover + ')'}}></div>
            <div className="address">
              <div><span>200 Broadway Av</span><span>NSW</span><span>2112</span><span>Australia</span></div>
            </div>
            <div className="contact">
              <div><label>Contact Info</label></div>
              {contacts}
            </div>
            <div className="actions">
              <a href="#">Close</a>
            </div>
          </div>
          <div className="events">{events}</div>
        </div>
      );
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
