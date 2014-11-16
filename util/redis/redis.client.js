
'use strict';

var redis = require('redis'),
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {}),
    logger = require('../log/application.log').logger;

if(!!process.env.REDIS_PASSWORD) { client.auth(process.env.REDIS_PASSWORD); }
client.on('error', function (err) { logger.error('redis', err.stack); });

module.exports.client = client;
