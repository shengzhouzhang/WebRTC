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

    render: function () {
      if(!this.state || !this.state.event) { return (<div></div>); }

      var contacts = _.map(this.state.contact, function (contact, index) {
        return (
          <Contact key={this.state.id + '_contact_' + index} name={contact.name} phone={contact.phone} />
        );
      }.bind(this));

      return (
        <div>
          <div className="header">
            <div className="cover" style={{backgroundImage: 'url(' + this.state.event.cover + ')'}}></div>
            <div className="address">
              <div><span>200 Broadway Av NSW 2112 Australia</span></div>
            </div>
            <div className="contact">
              <div><label>Contact Info</label></div>
              {contacts}
            </div>
            <div className="actions">
              <a href="#">Close</a>
            </div>
          </div>
          <div className="events"><Event event={this.state.event} /></div>
          <div className="notes"><Notes notes={this.state.notes} /></div>
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
