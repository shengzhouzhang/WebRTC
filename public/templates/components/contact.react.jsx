/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({

    render: function () {

      return (
        <div>
          <span className={!!this.props.name ? "name" : "hidden"}>{this.props.name}</span>
          <span className={!!this.props.phone ? "phone" : "hidden"}>
            <a href={'tel:' + this.props.phone}>{this.props.phone}</a>
          </span>
          <span className={!!this.props.email ? "email" : "hidden"}>{this.props.email}</span>
        </div>
      );
    }
  });

  return Contact;
});
