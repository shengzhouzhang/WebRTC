
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    store = require('../../../stores/incident.store').store,
    logger = require('../../../util/log/application.log').logger;

var create = function (req, res) {

  var incident = req.incident;

  incident.id = uuid.v1();
  incident.created_at = moment().valueOf();

  store.create(req.incident, function (err, result) {
    if(!!err) { res.status(500).json(); return; }
    res.status(201).json({
      id: incident.id,
      created_at: incident.created_at
    });
  });
};

var _isValid = function (req, res, next) {

  var incident = req.incident;

  if(!!incident && !!incident.home_alarm_id && !!incident.event) { next(); return; }
  res.status(400).json({ error: 'invalid incident data' });
};

module.exports.routes = {
  create: create
};
