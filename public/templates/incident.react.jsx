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
      $('div[data-target-tap=notes]').removeClass('shown');
      $('div[data-target-tap=event]').addClass('shown');
    },

    _showNote: function (event) {
      event.preventDefault();
      $('div.taps a').removeClass('active');
      $(event.target).addClass('active');
      $('div[data-target-tap=event]').removeClass('shown');
      $('div[data-target-tap=notes]').addClass('shown');
    },

    _onAction: function (event) {
      event.preventDefault();

      dispatcher.dispatch(actions.UPDATE_STATUS, {
        id: this.state.id,
        status: [event.target.value]
      });
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

      var action = 'action ' + this.state.action || 'CONTACT_OWNERS';

      var status =_.map(this.state.status, function (status) {
        return (<span className={status}></span>)
      });

      return (
        <div>
          <div className="header">
            <div className="address">
              <div><span>{[
                this.state.home.address.street,
                this.state.home.address.city,
                this.state.home.address.postcode,
                this.state.home.address.country
                ].join(' ')}</span></div>
            </div>
            <div className="contact">
              {contacts}
            </div>
            <div className={action}></div>
            <div className="actions">
              <button className={!!_.contains(this.state.status, 'CALLING_OWNER') ? 'disabled' : '' } onClick={this._onAction} value="CALLING_OWNER">Calling Owner</button>
              <button className={!!_.contains(this.state.status, 'CALLED_OWNER') ? 'disabled' : '' } onClick={this._onAction} value="CALLED_OWNER">Called Owner</button>
              <button className={!!_.contains(this.state.status, 'CALLING_POLICE') ? 'disabled' : '' } onClick={this._onAction} value="CALLING_POLICE">Calling Police</button>
              <button className={!!_.contains(this.state.status, 'CALLED_POLICE') ? 'disabled' : '' } onClick={this._onAction} value="CALLED_POLICE">Called Police</button>
            </div>
          </div>
          <div className="taps">
            <a href="#" className="active" onClick={this._showEvent}>Event</a>
            <a href="#" onClick={this._showNote} >Notes</a>
          </div>
          <div className="event" data-target-tap="event"><Event event={this.state.event} /></div>
          <div className="notes" data-target-tap="notes"><Notes incidentId={this.state.id} notes={this.state.notes} /></div>
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
    },

    render: function () {
      $(_container).addClass('shown');
      $(_container).find('.taps a')[0].click();
    }
  };
});
