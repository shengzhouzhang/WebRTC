/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'snapshot.component'

], function (dispatcher, actions, Snapshot) {
  'use strict';

  var Event = React.createClass({displayName: 'Event',

    render: function () {

      var snapshots = _.map(this.props.event.snapshots, function (snapshot, index) {
        return (
          Snapshot({key: snapshot.id + index, url: snapshot.url})
        );
      });

      return (
        React.DOM.div({className: "event"}, 
          React.DOM.div({className: "event-attr"}, React.DOM.label(null, "In:"), React.DOM.span(null, moment(this.props.event.start).format('YYYY-MM-DD HH:mm:ss'))), 
          React.DOM.div({className: "event-attr"}, React.DOM.label(null, "Out:"), React.DOM.span(null, moment(this.props.event.end).format('YYYY-MM-DD HH:mm:ss'))), 
          React.DOM.div({className: "event-snapshots"}, snapshots)
        )
      );
    }
  });

  return Event;
});
