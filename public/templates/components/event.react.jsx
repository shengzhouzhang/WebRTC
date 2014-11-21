/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'snapshot.component'

], function (dispatcher, actions, Snapshot) {
  'use strict';

  var Event = React.createClass({

    render: function () {

      var snapshots = _.map(this.props.event.snapshots, function (snapshot, index) {
        return (
          <Snapshot key={snapshot.id + index} url={snapshot.url} />
        );
      });

      return (
        <div>
          <div className="event-snapshots">{snapshots}</div>
        </div>
      );
    }
  });

  return Event;
});
