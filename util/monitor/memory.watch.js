
'use strict';

var memwatch = require('memwatch'),
    logger = require('../log/application.log').logger;


memwatch.on('stats', function(info) {
  logger.info('gc', info);
});

memwatch.on('leak', function(info) {
  logger.error(info);
});

module.exports.memwatch = memwatch;
