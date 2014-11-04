/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'incident.store',

  'note.component',

], function (dispatcher, actions, store, Note) {
  'use strict';

  var Notes = React.createClass({

    render: function () {

      var notes = _.map(this.props.notes, function (note) {

        return (
          <Note key={note.id} username={note.username} timestamp={note.timestamp} content={note.content} />
        );
      });

      return (
        <div>
          <div className="create">
            <label>Create a Note</label>
            <textarea rows="4" cols="50"></textarea>
            <div><a href="" >Create</a></div>
          </div>
          <div>{notes}</div>
        </div>
      );
    }
  });

  return Notes;
});
