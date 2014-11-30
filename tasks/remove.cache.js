
'use strict';

require('../process/process.env');

var _ = require('lodash'),
    moment = require('moment'),
    status = require('../static/incident.store').status,
    cache = require('../stores/cache/incident.cache').cache,
    logger = require('../util/log/application.log').logger;

var timestamp = moment().subtract(status.CACHE_DAYS || 7, 'days').startOf('day');

logger.info('clearing cache before', timestamp.format('YYYY-MM-DD'));

cache.clear(timestamp.valueOf()).then(
  function (result) { logger.info('clear cache', result); process.exit(); },
  function (err) { process.exit(); }
);
