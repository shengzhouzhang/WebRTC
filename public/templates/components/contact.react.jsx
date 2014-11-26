/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({

    render: function () {

      return (
        <div>
          <span className={!!this.props.name && this.props.name.trim() ? "name" : "hidden"}>{this.props.name}</span>
          <span className={!!this.props.phone && this.props.phone.trim() ? "phone" : "hidden"}>
            <a href={'tel:' + this.props.phone}>{this.props.phone}</a>
          </span>
          <span className={!!this.props.email && this.props.email.trim() ? "email" : "hidden"}>
            <a href={'mailto:' + this.props.email}>{this.props.email}</a></span>
        </div>
      );
    }
  });

  return Contact;
});
