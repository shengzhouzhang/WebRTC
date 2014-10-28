
'use strict';

var _ = require('lodash'),
    express = require('express'),
    routes = _.extend(
      require('./incident.routes/cammy.routes').routes,
      require('./incident.routes/timeline.routes').routes,
      require('./incident.routes/details.routes').routes
    ),
    token = require('../util/jwt.token').token,
    logger = require('../../util/log/application.log').logger;

var router = express.Router();

var _isCammy = function (req, res, next) {

  next();
};

var _isValidUser = function (req, res, next) {

  var access_token = req.body.access_token,
      token = this.decode(access_token);

  if (!token || token.isExpired(token.timestamp)) {
    res.status(401).json({ error: 'token is invalid or expired' });
  }

  req.username = token.username;
  next();
};

var _isValidPost = function () {

};

router.post('/', [_isCammy], routes.create);
router.get('/timeline', [_isValidUser], routes.timeline);
router.get('/{id}', [_isValidUser], routes.details);

module.exports.router = router;
