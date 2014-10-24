define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var _parse = function (data) {

    return {
      id: data.response._id,
      images: _.map(data.response.snapshot_keys, function (key) {
        var snapshot = data.response.snapshots[key];
        return {
          id: key,
          url: snapshot.prefix_url + snapshot.images.standard_res.key,
        }
      })
    };
  };

  var incident = {

    request: function () {

      $.ajax({
        type: 'GET',
        url: '/json/test-case-06.json?access_token=' + store.get().access_token,
        success: function (data) {
          dispatcher.dispatch(actions.UPDATE_incident_STORE, _parse(data));
        }
      });
    }
  };

  dispatcher.register(actions.REQUEST_incident, incident.request);

  return incident;
});
