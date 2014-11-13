
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    status = require('../../../static/incident.status').status,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  var id = req.params.id,
      options = { id: id };

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, options).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    res.status(200).json(result[0]);
  }, res.status(500).json.bind(undefined));
};

var update = function (options, cb) {
  if(!cb) { throw new Error ('missing cb'); }

  options = {
    query: { id: options.id },
    update: { $set: { status: options.status } }
  };

  dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENT, options).then(
    cb.bind(undefined, null),
    cb.bind(undefined)
  );
};

var open = function (req, res) {

  var id = req.params.id;

  update({ id: id, status: status.OPEN }, function (err, result) {
    if(!!err) { res.status(500).json({ error: err.message || err }); return; }
    res.status(200).json(result);
  });
};

var close = function (req, res) {

  var id = req.params.id;

  update({ id: id, status: status.CLOSE }, function (err, result) {
    if(!!err) { res.status(500).json({ error: err.message || err }); return; }
    res.status(200).json(result);
  });
};

module.exports.routes = {
  details: details,
  open: open,
  close: close
};
