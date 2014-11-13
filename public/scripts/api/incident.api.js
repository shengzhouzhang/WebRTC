define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var incident = {

    request: function (id) {
      if(!id) throw new Error ('missing incident id');

      var _promise = new Promise(function (resolve, reject) {

        dispatcher.dispatch(actions.START_LOADING);

        $.ajax({
          type: 'GET',
          headers: {
            authorization: store.get().access_token,
          },
          url: '/incidents/' + id,
          success: function (data) { resolve(data); }
        });
      });

      return _promise.then(function (data) {
        dispatcher.dispatch(actions.STOP_LOADING);
        dispatcher.dispatch(actions.UPDATE_INCIDENT_STORE, data);
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
          dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'incident open', type: 'success' });
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
          dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'incident close', type: 'success' });
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
