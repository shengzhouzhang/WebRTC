/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({

    render: function () {

      return (
        <div>
          <span className="name">{this.props.name}</span>
          <span className="phone">
            <a href={'tel:' + this.props.phone}>{this.props.phone}</a>
          </span>
        </div>
      );
    }
  });

  return Contact;
});
