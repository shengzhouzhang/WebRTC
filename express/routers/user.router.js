
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

  logger.info('authenticate', username);

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

var create = function (req, res) {

  var access_token = req.query.access_token,
  user = req.body;

  if(!access_token || access_token !== '542222e11fe800ef1332a6a6') {
    res.status(401).json({error: 'invalid access token'});
    return;
  }

  users.add(user, function (err, result) {
    if(!!err || !result) {
      logger.error('create user', err.stack, result);
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
    logger.info('create user', result);
  });
};

var _headers = function (req, res, next) {

  res.header('Access-Control-Allow-Origin' , '*')
  .header('Cache-Control' , 'no-cache, no-store, must-revalidate')
  .header('Pragma' , 'no-cache')
  .header('Expires' , 0);

  next();
};

var router = express.Router();

router.post('/authenticate', [_headers], authenticate);
router.post('/', [_headers], create);

module.exports.router = router;
