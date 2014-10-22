
'use strict';

var _ = require('lodash'),
    express = require('express'),
    logger = require('../../util/log/application.log').logger;

var authenticate = function (req, res) {

  res.header('Access-Control-Allow-Origin', '*')
  .status(401)
  .json({});
};

var router = express.Router();

router.post('/authenticate', authenticate);

module.exports.router = router;
