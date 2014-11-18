/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({displayName: 'Contact',

    render: function () {

      return (
        React.DOM.div(null, 
          React.DOM.span({className: "name"}, this.props.name), 
          React.DOM.span({className: "phone"}, 
            React.DOM.a({href: 'tel:' + this.props.phone}, this.props.phone)
          ), 
          React.DOM.span({className: "email"}, this.props.email)
        )
      );
    }
  });

  return Contact;
});
