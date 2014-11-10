
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    util = require('../../util/incident.util').util,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  var id = req.params.id;

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    res.status(200).json(result[0]);
  }, res.status(500).json.bind(undefined));
};

var update = function (incident, cb) {
  if(!cb) { throw new Error ('missing cb'); }

  dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENT, incident).then(
    cb.bind(undefined, null),
    cb.bind(undefined)
  );
};

var open = function (req, res) {

  var id = req.params.id;

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    util.open(result[0], function (err, incident) {
      if(!!err) { res.status(400).json({ error: err.message }); return; }

      update(incident, function (err, result) {
        if(!!err) { res.status(500).json({ error: err.message }); return; }
        res.status(200).json(incident);
      });
    });
  }, res.status(500).json.bind(res, undefined));
};

var close = function (req, res) {

  var id = req.params.id;

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    util.close(result[0], function (err, incident) {
      if(!!err) { res.status(400).json({ error: err.message }); return; }

      update(incident, function (err, result) {
        if(!!err) { res.status(500).json({ error: err.message }); return; }
        res.status(200).json(incident);
      });
    });
  }, res.status(500).json.bind(res, undefined));
};

module.exports.routes = {
  details: details,
  open: open,
  close: close
};
