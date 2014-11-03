/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Note = React.createClass({

    render: function () {

      return (
        <div className="note">
          <span className="username">{this.props.username}</span>
          <span className="timestamp">{this.props.timestamp}</span>
          <span className="content">{this.props.content}</span>
        </div>
      );
    }
  });

  return Note;
});
