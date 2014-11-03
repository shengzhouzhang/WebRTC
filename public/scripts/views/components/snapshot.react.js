/** @jsx React.DOM */
define(['dispatcher', 'actions'],
       function (dispatcher, actions) {
  'use strict';

  var Snapshot = React.createClass({displayName: 'Snapshot',

    render: function () {

      return (
        React.DOM.div({className: "snapshot"}, 
          React.DOM.a({href: "#", 'data-snapshot-id': this.props.key}, 
            React.DOM.img({src: this.props.url})
          )
        )
      );
    }
  });

  return Snapshot;
});
