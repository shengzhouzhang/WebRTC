
'use strict';

var _ = require('lodash'),
    express = require('express'),
    routes = _.extend(
      require('./incident.routes/cammy.routes').routes,
      require('./incident.routes/incidents.routes').routes,
      require('./incident.routes/incident.routes').routes,
      require('./incident.routes/notes.routes').routes
    ),
    jwt = require('../util/jwt.token').token,
    parser = require('../util/incident.util').util,
    logger = require('../../util/log/application.log').logger;

var router = express.Router();

var _headers = function (req, res, next) {

  res.header('Access-Control-Allow-Origin' , '*')
  .header('Cache-Control' , 'no-cache, no-store, must-revalidate')
  .header('Pragma' , 'no-cache')
  .header('Expires' , 0);

  next();
};

var _authorize = function (req, res, next) {

  var access_token = req.headers['authorization'] || req.query.access_token;

  if(!!access_token && access_token.toLowerCase() ===  'bXlVc2VybmFtZTpteVBhc3N3b3Jk'.toLowerCase()) { next(); return; }

  logger.error('cammy', 'invalid access token');
  res.status(401).json({ error: 'invalid access token' });
};

var _authenticate = function (req, res, next) {

  var access_token = req.headers['authorization'],
      token = jwt.decode(access_token);

  if (!token || jwt.isExpired(token.timestamp)) {
    logger.error('user', 'token is invalid or expired');
    res.status(401).json({ error: 'token is invalid or expired' });
    return;
  }

  req.username = token.username;
  next();
};

var _validate = function (req, res, next) {

  var incident = req.body;

  try {

    parser.parse(incident, function (err) {

      if(!!err) {

        logger.error('validate', err.stack || err);
        res.status(400).json({ error: err.message || err });
        return;
      }

      req.incident = incident;
      next();
    });

  } catch (err) {

    logger.error('cammy', err.stack || err);
    res.status(500).json();
  }
};

router.post('/', [_authorize, _validate, _headers], routes.create);
router.get('/timeline', [_authenticate, _headers], routes.timeline);
router.get('/:id', [_authenticate, _headers], routes.details);
router.put('/:id/status', [_authenticate, _headers], routes.updateStatus);
router.post('/:id/notes', [_authenticate, _headers], routes.notes.add);

module.exports.router = router;
