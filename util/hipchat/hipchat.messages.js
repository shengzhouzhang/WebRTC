
'use strict';

var util = require('util'),
    config = require('../../config/config.json').hipchat,
    request = require('request'),
    env = require('../../global/process.env').env,
    logger = require('../log/application.log').logger;


var sendMessage = function (num, cb) {
  if(!env.isProduction()) { cb(new Error ('not on production')); return; }

  var options = {
        url: util.format(config.url, num),
        method: config.method,
      };

  request(options, function (err, response, body) {
    if(!!err) { logger.error('hipchat', err); }
    if(!!cb) { cb(err, response); }
  });
};

module.exports.hc = {
  sendMessage: sendMessage
};
