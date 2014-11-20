define(['dispatcher', 'actions', 'user.store', 'timeline.store'], function (dispatcher, actions, store, timelineStore) {
  'use strict';

  var timeline = {

    request: function (options) {

      var _promise = new Promise(function (resolve, reject) {

        var params, incidents = timelineStore.get();

        dispatcher.dispatch(actions.START_LOADING);

        if(!!options) {
          params = $.param({
            max: !!incidents.length ? _.min(incidents, function (incident) { return incident.created_at }).created_at : undefined,
            min: undefined,
            count: 9
          });
        } else {
          params = $.param({
            count: 9
          });
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

      return _promise.then(function (incidents) {
        dispatcher.dispatch(actions.STOP_LOADING);
        dispatcher.dispatch(actions.UPDATE_TIMELINE_STORE, {
          incidents: incidents,
          options: { remove: !options }
        });

        if(!!options) { return; }
        dispatcher.dispatch(actions.REQUEST_UNPDATES, {
          timestamp: _.max(timelineStore.get(), function (incident) { return incident.created_at; }).created_at
        });
      });
    }
  };

  dispatcher.register(actions.REQUEST_TIMELINE, timeline.request);

  return timeline;
});
