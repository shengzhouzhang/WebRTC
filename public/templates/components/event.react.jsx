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
        <div className="event">
          <div className="event-attr"><label>In:</label><span>{moment(this.props.event.start).format('YYYY-MM-DD HH:mm:ss')}</span></div>
          <div className="event-attr"><label>Out:</label><span>{moment(this.props.event.end).format('YYYY-MM-DD HH:mm:ss')}</span></div>
          <div className="event-snapshots">{snapshots}</div>
        </div>
      );
    }
  });

  return Event;
});
