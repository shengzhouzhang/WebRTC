/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'incident.store',

  'note.component',

], function (dispatcher, actions, store, Note) {
  'use strict';

  var Notes = React.createClass({

    _onClick: function (event) {
      event.preventDefault();
      dispatcher.dispatch(actions.ADD_NOTE, {
        id: this.props.incidentId,
        note: {
          note: $('.notes textarea').val()
        }
      });
    },

    render: function () {
      
      var notes = _.map(this.props.notes, function (note) {

        return (
          <Note key={note.id} username={note.created_by} timestamp={moment(note.created_at).format('YYYY-MM-DD HH:mm:ss')} content={note.note} />
        );
      });

      return (
        <div>
          <div className="create">
            <label>Create a Note</label>
            <textarea rows="4" cols="50"></textarea>
            <div><a href="" onClick={this._onClick} >Create</a></div>
          </div>
          <div>{notes}</div>
        </div>
      );
    }
  });

  return Notes;
});
