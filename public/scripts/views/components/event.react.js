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
        React.DOM.div(null, 
          React.DOM.div({className: "event-snapshots"}, snapshots)
        )
      );
    }
  });

  return Event;
});
