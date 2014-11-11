define(['dispatcher', 'actions', 'user.store'], function (dispatcher, actions, store) {
  'use strict';

  var notes = {

    add: function (options) {
      if(!options || !options.id || !options.note) throw new Error ('missing incident id');

      var _promise = new Promise(function (resolve, reject) {

        $.ajax({
          type: 'POST',
          headers: {
            authorization: store.get().access_token,
          },
          data: JSON.stringify(options.note),
          url: '/incidents/' + options.id + '/notes',
          success: function (data) { resolve(data); }
        });
      });

      return _promise.then(function (data) {
        dispatcher.dispatch(actions.UPDATE_MESSAGE, { message: 'note added', type: 'success' });
        dispatcher.dispatch(actions.UPDATE_INCIDENT_STORE, data);
        return data;
      });
    },
  };

  dispatcher.register(actions.ADD_NOTE, notes.add);

  return notes;
});
