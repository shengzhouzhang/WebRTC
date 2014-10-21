
'use strict';

var logger = require('../util/log/application.log').logger;

process.on('uncaughtException', function(err, a, b) {
  if(!!err) { logger.error(err.message || err); }
});
