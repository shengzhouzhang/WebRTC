
'use strict';

require('../../../process/process.env');

var _ = require('lodash'),
moment = require('moment'),
store = require('../../../stores/incident.store').store,
cache = require('../../../stores/cache/incident.cache').cache;

store.find({
  created_at:  {
    $gt: moment().subtract(7, 'days').valueOf(),
    $lt: moment().valueOf()
  }
}).then(function (incidents) {
  console.log(incidents.length);

  var _promise = [];

  _.each(incidents, function (incident) {
    _promise.push(cache.update(incident));
  });

  Promise.all(_promise).then(function (result) {
    console.log('result', result);
    process.eixt();
  }, function (err) {
    console.log('err', err);
    process.eixt();
  })
});
