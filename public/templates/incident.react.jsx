/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',
  'incident.store',

  'contact.component',
  'event.component',
  'notes.component'
], function (dispatcher, actions, store, Contact, Event, Notes) {
  'use strict';

  var _container, _component;

  var Incident = React.createClass({

    getInitialState: function () {
      return {};
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

    _showEvent: function (event) {
      event.preventDefault();
      $('div.taps a').removeClass('active');
      $(event.target).addClass('active');
      $('div[data-target-tap=notes]').fadeOut('fast', function () {
        $('div[data-target-tap=event]').fadeIn('fast');
      });

    },

    _showNote: function (event) {
      event.preventDefault();
      $('div.taps a').removeClass('active');
      $(event.target).addClass('active');
      $('div[data-target-tap=event]').fadeOut('fast', function () {
        $('div[data-target-tap=notes]').fadeIn('fast');
      });
    },

    _onAction: function (event) {
      event.preventDefault();
      switch(this.state.status) {
        case 'OPEN':
          dispatcher.dispatch(actions.CLOSE_INCIDENT, this.state.id);
          break;
        case 'CLOSE':
          dispatcher.dispatch(actions.OPEN_INCIDENT, this.state.id);
          break;
      }
    },

    _actions: {
      'OPEN': 'Close',
      'CLOSE': 'Open'
    },

    render: function () {
      if(!this.state || !this.state.event) { return (<div></div>); }

      var contacts = _.map(this.state.contacts, function (contact, index) {
        return (
          <Contact key={this.state.id + '_contact_' + index}
            name={[contact.first_name, contact.last_name].join(' ')}
            phone={contact.phone}
            email={contact.email}
          />
        );
      }.bind(this));

      return (
        <div>
          <div className="header">
            <div className="cover" style={{backgroundImage: 'url(' + this.state.event.cover + ')'}}></div>
            <div className="address">
              <div><span>{[
                this.state.home.address.street,
                this.state.home.address.city,
                this.state.home.address.postcode,
                this.state.home.address.country
                ].join(' ')}</span></div>
            </div>
            <div className="contact">
              <div><label>Contact Info</label></div>
              {contacts}
            </div>
            <div className="actions">
              <a href="#" onClick={this._onAction}>{this._actions[this.state.status]}</a>
            </div>
          </div>
          <div className="taps">
            <a href="#" className="active" onClick={this._showEvent}>Event</a>
            <a href="#" onClick={this._showNote} >Notes</a>
          </div>
          <div className="events" data-target-tap="event"><Event event={this.state.event} /></div>
          <div className="notes" data-target-tap="notes" style={{display: 'none'}}><Notes notes={this.state.notes} /></div>
        </div>
      );
    }
  });

  return {

    init: function (container) {
      _container = container;
      _component = React.renderComponent(
        Incident(null),
        _container
      );
    }
  };
});
