/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({displayName: 'Contact',

    render: function () {

      return (
        React.DOM.div(null, 
          React.DOM.span({className: !!this.props.name ? "name" : "hidden"}, this.props.name), 
          React.DOM.span({className: !!this.props.phone ? "phone" : "hidden"}, 
            React.DOM.a({href: 'tel:' + this.props.phone}, this.props.phone)
          ), 
          React.DOM.span({className: !!this.props.email ? "email" : "hidden"}, this.props.email)
        )
      );
    }
  });

  return Contact;
});
