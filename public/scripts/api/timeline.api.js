define(['dispatcher', 'actions', 'user.store', 'timeline.store'], function (dispatcher, actions, store, timelineStore) {
  'use strict';

  var timeline = {

    request: function (options) {

      var _promise = new Promise(function (resolve, reject) {

        var latest = timelineStore.get()[0],
            params = $.param({ max: '+inf', min: !!latest ? latest.created_at : '-inf', count: 30 });

        $.ajax({
          type: 'GET',
          headers: {
            authorization: store.get().access_token,
          },
          url: '/incidents/timeline?' + params,
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
