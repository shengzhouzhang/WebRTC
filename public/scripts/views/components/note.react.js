/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Note = React.createClass({displayName: 'Note',

    render: function () {

      return (
        React.DOM.div({className: "note"}, 
          React.DOM.span({className: "username"}, this.props.username), 
          React.DOM.span({className: "timestamp"}, 
            React.DOM.span({className: "date"}, moment(this.props.timestamp).format('Do MMM YYYY')), 
            React.DOM.span({className: "time"}, moment(this.props.timestamp).format('hh:mmA'))
          ), 
          React.DOM.span({className: "content"}, this.props.content)
        )
      );
    }
  });

  return Note;
});
