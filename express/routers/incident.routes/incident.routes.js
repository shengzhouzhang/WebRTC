
'use strict';

var _ = require('lodash'),
    uuid = require('node-uuid'),
    moment = require('moment'),
    express = require('express'),
    status = require('../../../static/incident.status').status,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  var id = req.params.id,
      options = { id: id };

  logger.info('incident', id, req.username);

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, options).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    res.status(200).json(result[0]);
  }, res.status(500).json.bind(undefined));
};

var update = function (options, cb) {
  if(!cb) { throw new Error ('missing cb'); }

  options = {
    query: { id: options.id },
    update: {

      $set: {
        status: options.status
      },

      $push: {
        notes: {
          id: uuid.v1(),
          note: 'Set status to ' + options.status[0].replace('_', ' '),
          created_at: moment().valueOf(),
          created_by: options.username
        }
      }
    }
  };

  dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENT, options).then(
    cb.bind(undefined, null),
    cb.bind(undefined)
  );
};

var updateStatus = function (req, res) {

  var id = req.params.id,
      status = req.body;

  logger.info('status', id, status, req.username);

  if(!status || !_.isArray(status)) {
    res.status(400).json({ error: 'invalid status' });
    return;
  }

  update({ id: id, status: status, username: req.username}, function (err, incident) {
    if(!!err) { res.status(500).json({ error: err.stack || err }); return; }
    res.status(200).json(incident);
    dispatcher.dispatch(dispatcher.actions.STATUS_UPDATED, incident);
  });
};

module.exports.routes = {
  details: details,
  updateStatus: updateStatus
};
