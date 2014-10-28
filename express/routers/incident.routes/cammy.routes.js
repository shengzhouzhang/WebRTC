
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    uuid = require('node-uuid'),
    express = require('express'),
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var create = function (req, res) {

  var incident = req.incident;

  incident.id = uuid.v1();
  incident.created_at = moment().valueOf();

  dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENTS, incident).then(function () {

    res.status(201).json({ id: incident.id, created_at: incident.created_at });

    dispatcher.dispatch(dispatcher.actions.BROADCAST, {
      action: 'NEW_INCIDENT',
      incident: {
        id: incident.id,
        home_alarm_id: incident.home_alarm_id,
        created_at: incident.created_at
      }
    });

    logger.info('incident', incident.id);

  }, res.status(500).json.bind(res, undefined));
};

module.exports.routes = {
  create: create
};
