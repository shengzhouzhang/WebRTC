
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    store = require('../../stores/incident.store').store,
    logger = require('../../util/log/application.log').logger;

var request = function (req, res) {

  store.query({}, function (err, incidents) {
    if(!!err) { res.status(500).json({}); return; }
    if(!incidents || !incidents.length) { res.status(204).json(); return; }

    res.status(200).json(incidents);
  });
};

var add = function (req, res) {

  var incident = req.incident;

  incident.recevied_at = moment().valueOf();

  store.add(req.incident, function (err, result) {
    if(!!err) { res.status(500).json(); return; }
    res.status(201).json();
  });
};

var validate = function (req, res, next) {

  var incident = req.incident;

  if(!!incident && !!incident.id) { next(); return; }
  res.status(400).json({ error: 'invalid incident data' });
};


var router = express.Router();

router.get('/request', request);
router.post('/add', validate, add);

module.exports.router = router;
