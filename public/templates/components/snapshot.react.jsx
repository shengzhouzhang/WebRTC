/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var Snapshot = React.createClass({

    _onClick: function (event) {
      event.preventDefault();
    },

    render: function () {

      return (
        <div className="snapshot">
          <img src={this.props.url} />
        </div>
      );
    }
  });

  return Snapshot;
});
