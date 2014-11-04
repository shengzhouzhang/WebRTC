/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var Snapshot = React.createClass({displayName: 'Snapshot',

    _onClick: function (event) {
      event.preventDefault();
    },

    render: function () {

      return (
        React.DOM.div({className: "snapshot"}, 
          React.DOM.img({src: this.props.url})
        )
      );
    }
  });

  return Snapshot;
});
