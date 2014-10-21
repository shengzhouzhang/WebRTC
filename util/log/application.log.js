
'use strict';

var winston = require('winston'),
    Logentries = require('winston-logentries-transport').Logentries;

winston.emitErrs = false;

var transports = [new (winston.transports.Console)()];

if(!!process.env.LOGENTRIES) {
  transports.push(new Logentries({
    levels: { debug: 0, info: 1, notice: 2, warning: 3, error: 4, crit: 5, alert: 6, emerg: 7 },
    token: process.env.LOGENTRIES
  }));
}

var logger = new (winston.Logger)({
  transports: transports,
  exitOnError: false
});

module.exports.logger = logger;
