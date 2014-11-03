/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'incident.store',

  'note.component',

], function (dispatcher, actions, store, Note) {
  'use strict';

  var Notes = React.createClass({displayName: 'Notes',

    render: function () {

      var notes = _.map(this.props.notes, function (note) {

        return (
          Note({key: note.id, username: note.username, timestamp: note.timestamp, content: note.content})
        );
      });

      return (
        React.DOM.div(null, notes)
      );
    }
  });

  return Notes;
});
