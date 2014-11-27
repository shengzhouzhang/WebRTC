
'use strict';

var request = require('request'),
    Promise = require('Promise');

var call = function (options) {
  return new Promise(function (resolve, reject) {

    var start = Date.now(), end;

    request(options, function (err, response, body) {
      end = Date.now();
      if(!!err) { reject(err); }
      resolve({
        cost: (end - start) / 1000,
        data: JSON.parse(body).length
      });
    });
  });
};


Promise.all([
  call({
    url: 'http://irc.cammy.com/incidents/timeline?count=9',
    method: 'GET',
    headers: {
      'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0ZXZlbkBjYW1teS5jb20iLCJ0aW1lc3RhbXAiOjE0MTcwNDAyMjEzNTd9.pk8sklrpSjGmmwYizTWtRGKdTXcfrkcXRkRo5mqT9iw'
    }
  }),
  call({
    url: 'http://cammy-irc-staging.herokuapp.com/incidents/timeline?count=9',
    method: 'GET',
    headers: {
      'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0ZXZlbkBjYW1teS5jb20iLCJ0aW1lc3RhbXAiOjE0MTcwNDAyMjEzNTd9.pk8sklrpSjGmmwYizTWtRGKdTXcfrkcXRkRo5mqT9iw'
    }
  }),
]).then(function(result){

  console.log(result);
  process.exit();
});
