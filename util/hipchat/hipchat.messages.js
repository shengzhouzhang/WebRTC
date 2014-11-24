
'use strict';

var util = require('util'),
    request = require('request'),
    logger = require('../log/application.log').logger;


var uri = 'https://api.hipchat.com/v1/rooms/message?room_id=828046&color=red&from=IRC-Alert&message=<a href=\"http://app.imageintelligence.io/\">%s</a>&message_format=html&notify=1&auth_token=e22bdaa96c91ec7b2bb3df8434d4a6';

var sendMessage = function (msg, cb) {

  var options = {
        url: util.format(uri, msg || ''),
        method: 'POST',
      };

  console.log(options);

  request(options, function (err, response, body) {
    console.log(err, body);
    if(!!err) { logger.error('hipchat', err); }
    if(!!cb) { cb(err, response); }
  });
};

module.exports.hc = {
  sendMessage: sendMessage
};
