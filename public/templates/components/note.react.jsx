/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Note = React.createClass({

    render: function () {

      return (
        <div className="note">
          <span className="username">{this.props.username}</span>
          <span className="timestamp">
            <span className="date">{moment(this.props.timestamp).format('Do MMM YYYY')}</span>
            <span className="time">{moment(this.props.timestamp).format('hh:mmA')}</span>
          </span>
          <span className="content">{this.props.content}</span>
        </div>
      );
    }
  });

  return Note;
});
