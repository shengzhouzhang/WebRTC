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
        React.DOM.div(null, 
          React.DOM.div({className: "create"}, 
            React.DOM.label(null, "Create a Note"), 
            React.DOM.textarea({rows: "4", cols: "50"}), 
            React.DOM.div(null, React.DOM.a({href: ""}, "Create"))
          ), 
          React.DOM.div(null, notes)
        )
      );
    }
  });

  return Notes;
});
