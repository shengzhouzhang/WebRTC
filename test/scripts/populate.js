
'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');

var input = path.join(__dirname, '..', '..', 'public', 'json', 'test-case-09.json'),
    output = path.join(__dirname, 'test.sh'),
    command = 'curl -H "Content-Type: application/json" -H "Authorization: bXlVc2VybmFtZTpteVBhc3N3b3Jk" -d \'%s\' http://localhost:3000/incidents';

fs.readFile(input, function (err, data) {
  if(!!err) { console.log(err); return; }

  var data = JSON.parse(data),
      json = {
        home: {
          id: 'home_alarm_id',
          address: {
            street: "483 George Street",
            city: "Sydney",
            postcode: "2000",
            country: "Australia"
          }
        },
        contacts: [
          {
            first_name: "Steven",
            last_name: "Zhang",
            phone: "1234567890",
            email: 'steven@cammy.com',
            owner: true
          },
          {
            first_name: "Steven",
            last_name: "Zhang",
            phone: "1234567890",
            email: 'steven@cammy.com'
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

  fs.writeFile(output, util.format(command, JSON.stringify(json)), function(err) {
    if(!!err) { console.log(err); }
    process.exit();
  });
});
