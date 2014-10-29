
'use strict';

var moment = require('moment'),
    token = require('../../express/util/jwt.token').token,
    logger = require('../../util/log/application.log').logger;

console.log(token.create('steven@cammy.com'));

module.exports.token = token;
