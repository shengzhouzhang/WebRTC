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
      }).then(function () {
        $('.notes textarea').val('');
      });
    },

    componentDidMount: function () {
      this._scrollToBottom();
    },

    componentDidUpdate: function () {
      this._scrollToBottom();
    },

    _scrollToBottom: function () {
      setTimeout(function () {
        $('.notes-window').scrollTop($('.notes-window').height());
      }, 100);
    },

    render: function () {

      var data = _.sortBy(this.props.notes, function (note) {
        return note.created_at;
      });

      var notes = _.map(data, function (note) {

        return (
          <Note key={note.id} username={note.created_by} timestamp={moment(note.created_at).format('YYYY-MM-DD HH:mm:ss')} content={note.note} />
        );
      });

      return (
        <div>
          <div className="notes-window">
            <div className="notes-wrap">
              {notes}
            </div>
          </div>
          <div className="create">
            <textarea rows="4" cols="50"></textarea>
            <div><a href="" onClick={this._onClick} >Add Note</a></div>
          </div>
        </div>
      );
    }
  });

  return Notes;
});
