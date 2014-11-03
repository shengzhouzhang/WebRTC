/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Contact = React.createClass({displayName: 'Contact',

    render: function () {

      return (
        React.DOM.div({className: "contact"}, 
          React.DOM.span({className: "name"}, this.props.name), 
          React.DOM.span({className: "phone"}, 
            React.DOM.a({href: 'tel:' + this.props.phone}, this.props.phone)
          )
        )
      );
    }
  });

  return Contact;
});
