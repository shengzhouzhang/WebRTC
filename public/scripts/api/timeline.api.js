define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var timeline = {

    request: function () {

      var _promise = new Promise(function (resolve, reject) {

        $.ajax({
          type: 'GET',
          headers: {
            authorization: store.get().access_token,
          },
          url: '/incidents/timeline',
          success: function (data) { resolve(data); }
        });
      });

      return _promise.then(function (data) {
        dispatcher.dispatch(actions.UPDATE_TIMELINE_STORE, data);
      });
    }
  };

  dispatcher.register(actions.REQUEST_TIMELINE, timeline.request);

  return timeline;
});
