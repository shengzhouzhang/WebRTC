define(['dispatcher', 'actions', 'user.store', 'timeline.store'], function (dispatcher, actions, store, timelineStore) {
  'use strict';

  var _xhr;

  var timeline = {

    fetchTimeline: function (options) {
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
        if(!!_xhr) { _xhr.abort(); }

        _xhr = $.ajax({
          type: 'GET',
          headers: {
            authorization: store.get().access_token,
          },
          url: '/incidents/timeline?' + params,
          success: function (data) { resolve(data); },
          error: reject
        });
      });

      return _promise.then(function (incidents) {
        _.each(incidents, function (incident) { incident.type = 'TIMELINE'; });

        dispatcher.dispatch(actions.STOP_LOADING);
        dispatcher.dispatch(actions.UPDATE_TIMELINE_STORE, {
          incidents: incidents,
          options: { remove: !options }
        });

        if(!!options) { return; }
        dispatcher.dispatch(actions.REQUEST_UNPDATES, {
          timestamp: _.max(timelineStore.get(), function (incident) { return incident.created_at; }).created_at
        });
      }, function (error) {
        console.log(error);
        if(!error) { return; }
        switch(error.statusText) {
          case 'timeout':
            dispatcher.dispatch(actions.REQUEST_TIMEOUT);
            break;
          case 'abort':
            break;
          default:
            dispatcher.dispatch(actions.CONNECTION_LOST);
            break;
        }
      });
    },

    fetchMyCases: function (options) {
      var _promise = new Promise(function (resolve, reject) {

        var params, incidents = timelineStore.get();

        dispatcher.dispatch(actions.START_LOADING);

        if(!!options) {
          params = $.param({
            max: !!incidents.length ? _.min(incidents, function (incident) { return incident.created_at }).created_at : undefined,
            min: undefined,
            count: 9,
            created_by: store.get().username
          });
        } else {
          params = $.param({
            count: 9,
            created_by: store.get().username
          });
        }

        console.log(params);

        if(!!_xhr) { _xhr.abort(); }

        _xhr = $.ajax({
          type: 'GET',
          headers: {
            authorization: store.get().access_token,
          },
          url: '/incidents/timeline?' + params,
          success: function (data) { resolve(data); },
          error: reject
        });
      });

      return _promise.then(function (incidents) {
        _.each(incidents, function (incident) { incident.type = 'MY_CASES'; });

        dispatcher.dispatch(actions.STOP_LOADING);
        dispatcher.dispatch(actions.UPDATE_TIMELINE_STORE, {
          incidents: incidents,
          options: { remove: !options }
        });
      }, function (error) {
        console.log(error);
        if(!error) { return; }
        switch(error.statusText) {
          case 'timeout':
            dispatcher.dispatch(actions.REQUEST_TIMEOUT);
            break;
          case 'abort':
            break;
          default:
            dispatcher.dispatch(actions.CONNECTION_LOST);
            break;
        }
      });
    },
  };

  dispatcher.register(actions.REQUEST_TIMELINE, timeline.fetchTimeline);
  dispatcher.register(actions.REQUEST_MYCASES, timeline.fetchMyCases);

  return timeline;
});
