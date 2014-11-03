/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Note = React.createClass({displayName: 'Note',

    render: function () {

      return (
        React.DOM.div({className: "note"}, 
          React.DOM.span({className: "username"}, this.props.username), 
          React.DOM.span({className: "timestamp"}, this.props.timestamp), 
          React.DOM.span({className: "content"}, this.props.content)
        )
      );
    }
  });

  return Note;
});
