
'use strict';

var mongojs = require('mongojs'),
    Promise = require('Promise');

var call = function (options) {
  return new Promise(function (resolve, reject) {

    var incidents = mongojs(options.mongodb, ['incidents']).incidents;

    var start = Date.now(), end;

    incidents.find(options.query)
    .sort({ created_at: -1 })
    .limit(9, function (err, result) {
      end = Date.now();
      if(!!err) { reject(reject); return; }
      resolve({
        cost: (end - start) / 1000,
        data: result.length
      });
    });

    }.bind(this));
};

var from = 0, to = Date.now();

Promise.all([
  call({
    query: { created_at:  { $gt: from, $lt: to } },
    mongodb: 'mongodb://cammy:cammy@galaga.2.mongolayer.com:10011,galaga.3.mongolayer.com:10008/cammy-irc-production'
  }),
  call({
    query: { created_at:  { $gt: from, $lt: to } },
    mongodb: 'mongodb://cammy:cammy@dogen.mongohq.com:10086/cammy-irc-staging'
  })
]).then(function(result){

  console.log(result);
  process.exit();
}, function (err) {
  console.log(err);
});
