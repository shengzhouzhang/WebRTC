
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    events = require('../../../dispatcher/events').events,
    store = require('../../../stores/incident.store').store,
    logger = require('../../../util/log/application.log').logger;

var create = function (req, res) {

  var incident = req.incident;

  incident.id = uuid.v1();
  incident.created_at = moment().valueOf();

  store.create(req.incident, function (err, result) {
    if(!!err) { res.status(500).json(); return; }

    res.status(201).json({ id: incident.id, created_at: incident.created_at });

    events.fireEvent(events.types.BROADCAST, {
      action: 'INCIDENTS_UPDATE',
      incident: {
        id: incident.id,
        home_alarm_id: incident.home_alarm_id,
        created_at: incident.created_at
      }
    });
  });
};

module.exports.routes = {
  create: create
};
