define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var incident = {

    request: function (id) {
      if(!id) throw new Error ('missing incident id');

      $.ajax({
        type: 'GET',
        headers: {
          authorization: store.get().access_token,
        },
        url: '/incidents/' + id,
        success: dispatcher.dispatch.bind(undefined, actions.UPDATE_INCIDENT_STORE)
      });
    },

    open: function (id) {
      if(!id) throw new Error ('missing incident id');

      $.ajax({
        type: 'GET',
        headers: {
          authorization: store.get().access_token,
        },
        url: '/incidents/' + id + '/open',
        success: function (data) {
          dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'incident open'});
          dispatcher.dispatch(actions.UPDATE_INCIDENT_STORE, data);
        }
      });
    },

    close: function (id) {
      if(!id) throw new Error ('missing incident id');

      $.ajax({
        type: 'GET',
        headers: {
          authorization: store.get().access_token,
        },
        url: '/incidents/' + id + '/close',
        success: function (data) {
          dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'incident close'});
          dispatcher.dispatch(actions.UPDATE_INCIDENT_STORE, data);
        }
      });
    }
  };

  dispatcher.register(actions.REQUEST_INCIDENT, incident.request);
  dispatcher.register(actions.CLOSE_INCIDENT, incident.close);
  dispatcher.register(actions.OPEN_INCIDENT, incident.open);

  return incident;
});
