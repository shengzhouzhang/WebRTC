
'use strict';

var _ = require('lodash'),
    express = require('express'),
    routes = _.extend(
      require('./incident.routes/cammy.routes').routes,
      require('./incident.routes/timeline.routes').routes,
      require('./incident.routes/details.routes').routes
    ),
    jwt = require('../util/jwt.token').token,
    parser = require('../util/incident.util').util,
    logger = require('../../util/log/application.log').logger;

var router = express.Router();

var _hasAuthorized = function (req, res, next) {

  var access_token = !!req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.query.access_token;

  if(!!access_token && access_token.toLowerCase() ===  'bXlVc2VybmFtZTpteVBhc3N3b3Jk'.toLowerCase()) { next(); return; }
  res.status(401).json({ error: 'invalid access token' });
};

var _hasAuthenticated = function (req, res, next) {

  var access_token = req.headers['authorization'],
      token = jwt.decode(access_token);

  if (!token || jwt.isExpired(token.timestamp)) {
    res.status(401).json({ error: 'token is invalid or expired' });
    return;
  }

  req.username = token.username;
  next();
};

var _parse = function (req, res, next) {

  var incident = req.body;

  parser.parse(incident, function (err) {
    if(!!err) { res.status(400).json({ error: err.message || err }); return; }
    req.incident = incident;
    next();
  });
};

router.post('/', [_hasAuthorized, _parse], routes.create);
router.get('/timeline', [_hasAuthenticated], routes.timeline);
router.get('/:id', [_hasAuthenticated], routes.details);

module.exports.router = router;
