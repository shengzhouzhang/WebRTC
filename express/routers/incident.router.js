
'use strict';

var _ = require('lodash'),
    express = require('express'),
    routes = _.extend(
      require('./incident.routes/cammy.routes').routes,
      require('./incident.routes/timeline.routes').routes,
      require('./incident.routes/details.routes').routes
    ),
    jwt = require('../util/jwt.token').token,
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

var _isValid = function (req, res, next) {

  var incident = req.body;

  if(!incident || !incident.home_alarm_id || !incident.event) {
    res.status(400).json({ error: 'missing home alarm id or event' });
    return;
  }

  if(!incident.event.id || !incident.event.snapshots || !incident.event.snapshots.length) {
    res.status(400).json({ error: 'invalid event data' });
    return;
  }

  if(!!_.find(incident.event.snapshots, function (snapshot) {

    return !snapshot.id ||
           !snapshot.url ||
           !snapshot.timestamp ||
           isNaN(new Date(snapshot.timestamp).getTime());

  })) {
    res.status(400).json({ error: 'invalid snapshot data' });
    return;
  }

  if(!incident.address || !incident.contact || !incident.contact.length) {
    res.status(400).json({ error: 'missing address or contact' });
    return;
  }

  if(!!_.find(incident.contact, function (contact) {
    return !contact.name || !contact.phone;
  })) {
    res.status(400).json({ error: 'invalid contact data' });
    return;
  }

  req.incident = incident;
  next();
};

router.post('/', [_hasAuthorized, _isValid], routes.create);
router.get('/timeline', [_hasAuthenticated], routes.timeline);
router.get('/:id', [_hasAuthenticated], routes.details);

module.exports.router = router;
