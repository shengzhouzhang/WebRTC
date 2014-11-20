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

    updateStatus: function (incident) {
      if(!incident || !incident.id || !incident.status) throw new Error ('invalid incident');

      dispatcher.dispatch(actions.START_LOADING);

      $.ajax({
        type: 'PUT',
        headers: {
          authorization: store.get().access_token,
        },
        data: JSON.stringify(incident.status),
        url: '/incidents/' + incident.id + '/status',
        success: function (data) {
          console.log(data);
          dispatcher.dispatch(actions.STOP_LOADING);
          dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'status changed', type: 'success' });
          dispatcher.dispatch(actions.UPDATE_INCIDENT_STORE, data);
        }
      });
    }
  };

  dispatcher.register(actions.REQUEST_INCIDENT, incident.request);
  dispatcher.register(actions.UPDATE_STATUS, incident.updateStatus);

  return incident;
});
