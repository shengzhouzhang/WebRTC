
'use strict';

var _ = require('lodash'),
    express = require('express'),
    util = require('../../util/incident.util').util,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var create = function (req, res) {

  var data = req.incident;
  var incident = util.create(data);

  logger.info('create', incident);

  dispatcher.dispatch(dispatcher.actions.ADD_INCIDENT, incident).then(function () {

    res.status(201).json({ id: incident.id, created_at: incident.created_at });

    dispatcher.dispatch(dispatcher.actions.NEW_INCIDENT, {
      id: incident.id,
      action: incident.action,
      created_at: incident.created_at
    });

    logger.info('incident', incident.id);

  }, res.status(500).json.bind(res, undefined));
};

module.exports.routes = {
  create: create
};
