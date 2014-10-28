
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

var _hasAuthorized = function (req, res, next) {
  if(req.header['Authorization'] ===  process.env.CAMMY_ACCESS_TOKEN) { next(); }
};

var _hasAuthenticated = function (req, res, next) {

  var access_token = req.body.access_token,
      token = this.decode(access_token);

  if (!token || token.isExpired(token.timestamp)) {
    res.status(401).json({ error: 'token is invalid or expired' });
  }

  req.username = token.username;
  next();
};

var _isValid = function (req, res, next) {

  var incident = req.body.incident;

  if(!incident || !incident.home_alarm_id || !incident.event) {
    res.status(400).json({ error: 'invalid incident data' });
    return;
  }

  req.incident = incident;
  next();
};

router.post('/', [_hasAuthorized, _isValid], routes.create);
router.get('/timeline', [_hasAuthenticated], routes.timeline);
router.get('/{id}', [_hasAuthenticated], routes.details);

module.exports.router = router;
