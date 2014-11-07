
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    uuid = require('node-uuid'),
    express = require('express'),
    routes = _.extend(
      require('./incident.routes/cammy.routes').routes,
      require('./incident.routes/timeline.routes').routes,
      require('./incident.routes/details.routes').routes
    ),
    jwt = require('../util/jwt.token').token,
    status = require('../../static/incident.status').status,
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

  if(!incident.home ||
     !incident.home.id ||
     !incident.home.address ||
     !incident.home.address.city ||
     !incident.home.address.country ||
     !incident.home.address.postcode ||
     !incident.home.address.street) {

    res.status(400).json({ error: 'invalid home data' });
    return;
  }

  if(!incident.event ||
     !incident.event.id ||
     !incident.event.snapshots ||
     !incident.event.snapshots.length ||
     !!_.find(incident.event.snapshots, function (snapshot) {

    return !snapshot.id ||
           !snapshot.url ||
           !snapshot.timestamp ||
           isNaN(new Date(snapshot.timestamp).getTime());

  })) {
    res.status(400).json({ error: 'invalid event data' });
    return;
  }

  if(!incident.contact ||
     !incident.contact.length ||
     !!_.find(incident.contact, function (contact) {

    return !contact.first_name ||
           !contact.last_name ||
           !contact.phone ||
           !contact.email ||
           !contact.address ||
           !contact.address.city ||
           !contact.address.country ||
           !contact.address.postcode ||
           !contact.address.street
  })) {
    res.status(400).json({ error: 'invalid contact data' });
    return;
  }

  req.incident = {

    id: uuid.v1(),
    created_at: moment().valueOf(),
    status: status.OPEN,

    home: {
      id: incident.home.id,
      address: {
        street: incident.home.street,
        city: incident.home.city,
        country: incident.home.country,
        postcode: incident.home.postcode
      }
    },

    event: {
      id: incident.event.id,
      start: _.min(incident.event.snapshots, 'timestamp').timestamp,
      end: _.max(incident.event.snapshots, 'timestamp').timestamp,
      cover: _.first(incident.event.snapshots).url,
      snapshots: _.map(incident.event.snapshots, function (snapshot) {

        return {
          id: snapshot.id,
          url: snapshot.url,
          timestamp: snapshot.timestamp
        };
      })
    },

    contact: _.map(incident.contact, function (contact) {

      return {
        first_name: contact.first_name,
        last_name: contact.last_name,
        owner: contact.owner,
        phone: contact.phone,
        email: contact.email,
        address: {
          street: contact.address.street,
          city: contact.address.city,
          country: contact.address.country,
          postcode: contact.address.postcode
        }
      };
    })
  };

  next();
};

router.post('/', [_hasAuthorized, _parse], routes.create);
router.get('/timeline', [_hasAuthenticated], routes.timeline);
router.get('/:id', [_hasAuthenticated], routes.details);

module.exports.router = router;
