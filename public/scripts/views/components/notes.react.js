/** @jsx React.DOM */
define([
  'dispatcher',
  'actions',

  'incident.store',

  'note.component',

], function (dispatcher, actions, store, Note) {
  'use strict';

  var Notes = React.createClass({displayName: 'Notes',

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
          Note({key: note.id, username: note.created_by, timestamp: moment(note.created_at).format('YYYY-MM-DD HH:mm:ss'), content: note.note})
        );
      });

      return (
        React.DOM.div(null, 
          React.DOM.div({className: "create"}, 
            React.DOM.label(null, "Create a Note"), 
            React.DOM.textarea({rows: "4", cols: "50"}), 
            React.DOM.div(null, React.DOM.a({href: "", onClick: this._onClick}, "Create"))
          ), 
          React.DOM.div(null, notes)
        )
      );
    }
  });

  return Notes;
});
