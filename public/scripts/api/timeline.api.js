define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var _parse = function (data) {

    return {
      id: data.response._id,
      snapshots: _.map(data.response.snapshot_keys, function (key) {
        var snapshot = data.response.snapshots[key];
        return {
          id: key,
          url: snapshot.prefix_url + snapshot.images.standard_res.key,
        }
      }),
      created_at: Date.now()
    };
  };

  var timeline = {

    request: function () {

      var _promises = [];

      for (var i = 1; i < 10; i++) {
        if (i === 4) { break; }

        _promises.push(new Promise(function (resolve, reject) {

          $.ajax({
            type: 'GET',
            url: '/json/test-case-0' + i + '.json?access_token=' + store.get().access_token,
            success: function (data) { resolve(_parse(data)); },
            error: function (xhr) { reject(xhr.status); }
          });
        }));
      }

      Promise.all(_promises).then(function (data, a) {
        dispatcher.dispatch(actions.UPDATE_TIMELINE_STORE, data);
      });
    }
  };

  dispatcher.register(actions.REQUEST_TIMELINE, timeline.request);

  return timeline;
});
