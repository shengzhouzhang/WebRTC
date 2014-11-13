
'use strict';

var mongojs = require('mongojs'),
    logger = require('../log/application.log').logger;

var db = mongojs(process.env.MONGODB_URI, ['users', 'incidents']);

module.exports.db = db;
