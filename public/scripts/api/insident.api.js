define(['dispatcher', 'actions'], function (dispatcher, actions) {
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

  var Insident = {

    request: function () {

      $.ajax({
        type: 'GET',
        url: '/json/test-case-06.json',
        contentType: 'application/json',
        success: function (data) {
          dispatcher.dispatch(actions.UPDATE_INSIDENT_STORE, _parse(data));
        }
      });
    }
  };

  dispatcher.register(actions.REQUEST_INSIDENT, Insident.request.bind(Insident));

  return Insident;
});
