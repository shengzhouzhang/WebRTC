define(['dispatcher', 'actions', 'user.store', 'timeline.store'], function (dispatcher, actions, store, timelineStore) {
  'use strict';

  var timeline = {

    request: function (options) {

      var _promise = new Promise(function (resolve, reject) {

        var params;

        if(!!options) {
          var oldest = _.min(timelineStore.get(), function (incident) { return incident.created_at });
          params = $.param({ max: !!oldest ? oldest.created_at : '+inf', min: '-inf', count: 9 });
        } else {
          var latest = _.max(timelineStore.get(), function (incident) { return incident.created_at });
          params = $.param({ max: '+inf', min: !!latest ? latest.created_at : '-inf', count: 9 });
        }

        console.log(params);

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
