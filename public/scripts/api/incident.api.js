define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var incident = {

    request: function (id) {
      if(!id) throw new Error ('missing home alarm id');

      $.ajax({
        type: 'GET',
        headers: {
          authorization: store.get().access_token,
        },
        url: '/incidents/' + id,
        success: dispatcher.dispatch.bind(undefined, actions.UPDATE_INCIDENT_STORE)
      });
    }
  };

  dispatcher.register(actions.REQUEST_INCIDENT, incident.request);

  return incident;
});
