/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({displayName: 'Contact',

    render: function () {

      return (
        React.DOM.div(null, 
          React.DOM.span({className: !!this.props.name && this.props.name.trim() ? "name" : "hidden"}, this.props.name), 
          React.DOM.span({className: !!this.props.phone && this.props.phone.trim() ? "phone" : "hidden"}, 
            React.DOM.a({href: 'tel:' + this.props.phone}, this.props.phone)
          ), 
          React.DOM.span({className: !!this.props.email && this.props.email.trim() ? "email" : "hidden"}, this.props.email)
        )
      );
    }
  });

  return Contact;
});
