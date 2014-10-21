
'use strict';

var util = require('util'),
    mongojs = require('mongojs'),
    logger = require('../log/application.log').logger,
    config = require('../../config/config.env.json'),
    env = require('../../global/process.env').env.getEnv(),
    uri = util.format(config[env].mongodb.uri, config[env].mongodb.username, config[env].mongodb.password),
    db = mongojs(uri, ['users', 'cbs', 'jobs', 'logs']);

logger.info('mongodb', uri);

module.exports.db = db;
