/** @jsx React.DOM */
define(['dispatcher', 'actions'],
  function (dispatcher, actions) {
  'use strict';

  var Border = React.createClass({

    render: function () {

      return (
        <div className='dateborder'>
          {moment(this.props.date).startOf('day').format('dddd MMMM DD, YYYY')}
        </div>
      );
    }
  });

  return Border;
});
