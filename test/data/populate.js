
'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

var input = path.join(__dirname, '..', '..', 'public', 'json', 'test-case-07.json'),
    output = path.join(__dirname, 'test.json');

fs.readFile(input, function (err, data) {
  if(!!err) { console.log(err); return; }

  var data = JSON.parse(data),
      json = {
        home_alarm_id: 'home alarm id',
        address: 'The Home Alarm Location',
        contact: [
          {
            name: "Steven Zhang",
            phone: "12345678",
            relationship: "owner"
          },
          {
            name: "Steven Zhang 2",
            phone: "87654321",
            relationship: "owner"
          }
        ],
        event: {
          id: data.response._id,
          snapshots: _.map(data.response.snapshot_keys, function (key) {
            var snapshot = data.response.snapshots[key];
            return {
              id: key,
              url: snapshot.prefix_url + snapshot.images.standard_res.key,
              timestamp: key
            }
          })
        }
      };

  json.event.snapshots[3].motion = 'persion';

  console.log(JSON.stringify(json, null, 2));

  fs.writeFile(output, JSON.stringify(json), function(err) {
    if(!!err) { console.log(err); }
    process.exit();
  });
});
