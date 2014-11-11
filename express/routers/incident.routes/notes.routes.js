
'use strict';

var _ = require('lodash'),
    uuid = require('node-uuid'),
    moment = require('moment'),
    express = require('express'),
    util = require('../../util/incident.util').util,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var add = function (req, res) {

  var id = req.params.id,
      note = req.body.note,
      username = req.username;

  if(!note || !username) { res.status(400).json({ error: 'missing note content'}); return; }

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }
    if(!result[0].notes) { result[0].notes = []; }

    result[0].notes.push({
      id: uuid.v1(),
      note: note,
      created_at: moment().valueOf(),
      created_by: username
    });

    result[0].notes = _.sortBy(result[0].notes, function (note) { return -note.created_at; });

    dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENT, result[0]).then(
      function () { res.status(200).json(result[0]); },
      function () { res.status(500).json(); }
    );

  }, function () { res.status(500).json(); });
};

module.exports.routes = {
  notes: {
    add: add
  }
};
