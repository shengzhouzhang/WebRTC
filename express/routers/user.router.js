
'use strict';

var _ = require('lodash'),
    express = require('express'),
    bcrypt = require('bcrypt'),
    token = require('../util/jwt.token').token,
    users = require('../../stores/user.store').store,
    logger = require('../../util/log/application.log').logger;

var authenticate = function (req, res) {

  var username = req.body.username,
      password = req.body.password;

  users.find(username, function (err, user) {
    if(!!err) { logger.error(err); res.status(500).json({}); return; }
    if(!user) { res.status(401).json({}); return; }

    bcrypt.compare(password, user.password, function(err, isMatch) {
      if(!!err || !isMatch) { res.status(401).json({}); return; }

      res.status(200)
      .json({
        username: user.username,
        access_token: token.create(user.username)
      });
    });
  });
};

var router = express.Router();

router.post('/authenticate', authenticate);

module.exports.router = router;
